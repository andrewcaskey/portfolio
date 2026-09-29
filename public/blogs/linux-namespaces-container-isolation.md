# Linux Namespaces: The Building Blocks of Container Isolation

**Date:** May 31, 2026 · **Category:** Containers · **Series:** Docker Deep Dive (Part 2)

> **Reference:** [Demystifying Container Isolation: Namespaces and Control Groups Explained](https://towardsdev.com/demystifying-container-isolation-namespaces-and-control-groups-explained-632b293f007e)

---

In part 1 we watched `docker run` pass through `dockerd → containerd → runc` and end with a `clone()` syscall. The flags on that `clone()` call are what make a container a container. They're called **namespaces**, and they're a Linux kernel feature with nothing Docker-specific about them.

---

## What Is a Namespace?

A Linux namespace wraps a global system resource and presents each process (or group of processes) with its own isolated view of that resource. From inside the namespace, you see a complete world. From outside, you see nothing — or a different complete world.

The concept is simple: take something the kernel normally shares across all processes (the process table, the network stack, the filesystem hierarchy) and make it per-namespace instead of global.

You can inspect namespaces directly:

```bash
# List all namespaces on the host
lsns

# See the namespaces a specific process belongs to
ls -la /proc/<pid>/ns/
```

Each entry in `/proc/<pid>/ns/` is a symlink pointing to a namespace inode. Two processes in the same namespace point to the same inode.

---

## The Seven Namespace Types

| Type | `clone()` flag | What it isolates | Docker creates by default? |
|---|---|---|---|
| PID | `CLONE_NEWPID` | Process ID number space | Yes |
| NET | `CLONE_NEWNET` | Network interfaces, routes, ports | Yes |
| MNT | `CLONE_NEWNS` | Mount points, filesystem view | Yes |
| UTS | `CLONE_NEWUTS` | Hostname, NIS domain name | Yes |
| IPC | `CLONE_NEWIPC` | System V IPC, POSIX message queues | Yes |
| USER | `CLONE_NEWUSER` | UID/GID mappings | No (opt-in) |
| TIME | `CLONE_NEWTIME` | Boot and monotonic clocks | No |

---

### PID Namespace — Process Isolation

In a new PID namespace, the first process created gets PID 1. It sees a completely separate process tree. Processes outside the namespace are invisible. Signals from parent PID namespaces can still cross the boundary (`SIGKILL` always works from the host), but the container process has no knowledge of the host's PID space.

```bash
# On the host, find the host PID of nginx in a container:
docker inspect --format '{{.State.Pid}}' my-nginx
# e.g., 18432

# That PID 18432 on the host is PID 1 inside the container.
# Check:
cat /proc/18432/status | grep NSpid
# NSpid: 18432  1
```

The two-column output shows host PID and namespace PID. The container process thinks it's PID 1.

---

### NET Namespace — Network Isolation

Each container gets its own network stack: loopback interface, ethernet interface (`eth0`), routing table, iptables rules, and port number space. Two containers can both bind to port 8080 because their port spaces don't overlap.

Docker connects the container's `eth0` to a virtual ethernet pair (`veth`) bridged to `docker0` on the host. From inside the container, you see only `lo` and `eth0`. From the host, you see `docker0` and a `vethXXXXXX` per container.

```bash
# Inside a container
ip link show   # lo and eth0 only

# On the host
ip link show   # lo, eth0, docker0, veth<hash>, ...
```

Port publishing (`-p 8080:80`) works by adding an iptables DNAT rule on the host that rewrites packets before they enter the container's NET namespace.

---

### MNT Namespace — Filesystem Isolation

The MNT namespace controls what the process sees when it looks at the filesystem. Docker creates a new MNT namespace and then calls `pivot_root()` (an older version used `chroot`) to swap the container's root directory to the merged image layers.

After `pivot_root()`, `/` inside the container is the image's rootfs. The host's `/` is inaccessible unless explicitly bind-mounted.

```bash
# On the host, see the container's mounts
cat /proc/18432/mounts

# Or inspect via nsenter:
nsenter --target 18432 --mount -- findmnt
```

Volumes are just bind mounts added to the MNT namespace: `mount --bind /host/path /container/path`.

---

### UTS Namespace — Hostname Isolation

UTS (Unix Time-sharing System) namespaces isolate the hostname and NIS domain name. That's it. Docker uses `--hostname` to set the hostname inside the container's UTS namespace without touching the host's hostname.

```bash
docker run --hostname my-service alpine hostname
# my-service

hostname  # on the host, unchanged
```

---

### IPC Namespace — Inter-Process Communication Isolation

IPC namespaces isolate System V IPC primitives (semaphores, message queues, shared memory segments) and POSIX message queues. Processes in different IPC namespaces can't communicate via these mechanisms.

In practice this matters for multi-process applications that use shared memory — they need to be in the same IPC namespace, which is why `docker run --ipc=container:<name>` exists.

---

### USER Namespace — UID/GID Isolation

USER namespaces are the most powerful and the most complex. They let you map UIDs inside the container to different UIDs on the host. The common use case: the container's root (UID 0) maps to an unprivileged user on the host (e.g., UID 100000). The process thinks it's root; the host disagrees.

Docker doesn't enable USER namespaces by default because they interact with many kernel subsystems in subtle ways. Rootless Docker (`dockerd` running as a non-root user) uses them extensively.

```bash
# With rootless Docker or --userns-remap, inspect the mapping:
cat /proc/18432/uid_map
# 0  100000  65536
# Container UID 0 → host UID 100000, for 65536 UIDs
```

---

### TIME Namespace — Clock Isolation (Linux 5.6+)

TIME namespaces, added in Linux 5.6, allow each namespace to have its own offsets for the boot-time and monotonic clocks. The wall clock (CLOCK_REALTIME) is shared — you can't give a container a different wall time without affecting the host.

Docker doesn't currently create TIME namespaces. The feature is available in `unshare` and directly via `clone()` if you need per-container clock offsets (useful for testing time-dependent code or simulation).

---

## Observing Namespace Membership

Two processes in the same namespace point to the same namespace inode. You can verify this directly:

```bash
# Start a container
docker run -d --name demo nginx

# Get host PID
PID=$(docker inspect --format '{{.State.Pid}}' demo)

# Compare host process and container process namespaces
ls -la /proc/1/ns/        # init (host namespaces)
ls -la /proc/$PID/ns/     # nginx container namespaces
```

The inodes will differ for `pid`, `net`, `mnt`, `uts`, `ipc`. They'll match for `user` (unless rootless) and `time`.

---

## Hands-On: Creating Namespaces Without Docker

`unshare` is the userspace tool for creating new namespaces. This shows exactly what Docker does, minus the orchestration:

```bash
# Create a new PID + MNT namespace and start a shell
sudo unshare --pid --fork --mount-proc /bin/bash

# Inside: you're PID 1, and you see only your process
ps aux
# PID   USER     COMMAND
#   1   root     /bin/bash
#   2   root     ps aux

# Exit returns you to the host
exit
```

Breaking down the flags:

- `--pid` — new PID namespace
- `--fork` — required for PID namespaces; unshare forks so the child can be PID 1
- `--mount-proc` — remounts `/proc` in the new MNT namespace so `ps` works correctly

Add `--net` and you get network isolation too. Add `--user` and `--map-root-user` and you can do this without `sudo`.

To enter an existing namespace (what `docker exec` does internally):

```bash
sudo nsenter --target $PID --pid --net --mount -- /bin/bash
# You're now inside the container's namespaces, from the host
```

---

## Where Namespaces End

Namespaces control **visibility**. A process in a new PID namespace can't see the host's processes. A process in a new NET namespace can't see the host's network interfaces. Isolation from the perspective of what you can observe.

What namespaces don't control: **resource consumption**. A container with a new PID namespace can still fork-bomb the host. A container with a new NET namespace can still saturate the host's physical NIC. Visibility isolation and resource isolation are separate problems.

The second half of container isolation — resource limits — is handled by **control groups (cgroups)**. That's part 3.
