# The Hidden Dangers of AI Agents on the Open Web

**Date:** May 23, 2026 · **Category:** AI

> **Reference:** Deng, Z., Gui, J., & Zhang, W. (2026). *From Secure Agentic AI to Secure Agentic Web: Challenges, Threats, and Future Directions.* arXiv:2603.01564. [https://arxiv.org/abs/2603.01564](https://arxiv.org/abs/2603.01564)

AI agents — LLMs that can plan, browse, call APIs, and take real-world action — are moving fast from research demos into production systems. A recent survey from Shanghai Jiao Tong University maps the full threat landscape these agents face, and the picture is more complex than most engineers realize.

---

## The Core Problem: Autonomy Expands the Attack Surface

A traditional LLM can generate harmful *text*. An agentic LLM can actually *do* harmful things — send emails, execute purchases, modify files, call internal APIs. The attack surface shifts from what the model says to what the model does.

The paper organizes threats around the components of a typical agent architecture:

| Attack Surface | Threat | Example |
|---|---|---|
| User input | Prompt injection / jailbreak | Override system prompt via user message |
| Web content | Environment (indirect) injection | Hidden instructions in a webpage the agent reads |
| Memory | Memory poisoning | Write malicious data into long-term context |
| Tools / APIs | Toolchain abuse | Compose innocent tools into a dangerous chain |
| Model weights | Model tampering | Backdoors activated by trigger tokens |
| Agent-to-agent | Propagation attacks | One compromised agent poisons a whole workflow |

---

## Why the "Agentic Web" Makes This Worse

A single agent operating in isolation is concerning. A network of agents delegating tasks to each other across organizational boundaries is a fundamentally different threat model.

The paper introduces the concept of the **Agentic Web** — a future internet where autonomous agents interact with web services and each other on your behalf. Three properties make security dramatically harder:

**1. Threats become networked.** A prompt injection in one webpage can propagate through delegation chains, affecting every downstream agent that acts on the original agent's output.

**2. Trust becomes programmable.** Human users have implicit identity and intent. Machine-to-machine interactions need explicit identity, authorization, and provenance — and mismatches between trust signals and authorization boundaries are a recurring failure mode.

**3. The attack surface shifts to protocols.** Frameworks like the Model Context Protocol (MCP) create tool ecosystems with third-party components. This introduces supply-chain-style risk: a malicious or compromised MCP server can steer any agent that connects to it.

---

## Defenses: Promising but Incomplete

The survey reviews a range of mitigations that map to each threat:

- **Prompt hardening** — structured delimiters, instruction hierarchy enforcement, input validation
- **Privilege control** — least-privilege tool access, scoped API credentials, per-task sandboxing
- **Runtime monitoring** — anomaly detection on action sequences, output filtering before tool execution
- **Continuous red-teaming** — automated adversarial testing frameworks that probe agent behavior at scale
- **Protocol-level security** — identity verification, delegation constraints, and cross-domain policy enforcement at the MCP / API layer

No single defense is sufficient. The paper argues that trustworthy agent ecosystems require all of these working together — and that evaluation frameworks need to keep pace with adaptive adversaries who can probe for weaknesses automatically.

---

## What This Means for Practitioners

If you're building systems that use AI agents — even internally — a few things are worth taking from this paper:

- **Treat every external input as untrusted.** Web content, API responses, and documents that agents read are attack surfaces. Sanitize and scope what agents can act on.
- **Audit your tool chains.** Composed tool calls can produce harmful outcomes even when each individual tool is benign. Review what action sequences are possible before deploying.
- **Don't over-trust peer agents.** In multi-agent systems, an upstream agent's output is user input to the downstream agent. Apply the same skepticism you'd apply to any untrusted source.
- **Build for provenance.** As agents take actions on your behalf, logging what was decided, why, and by which agent becomes essential for incident response.

The shift from LLMs that generate text to agents that take action is one of the most significant changes in production AI systems. The security model has to evolve with it.
