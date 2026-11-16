# From Open Links to Autonomous Agents: Building the Machine-Native Web

*Research from parallel.ai*

## Executive Summary

The open web's DNA is re-emerging as "machine-native" standards. Tim Berners-Lee's 1989–1993 design and CERN's 1993 public-domain release created universal, royalty-free interoperability. Today, the web is transitioning into an AI-first phase where autonomous software agents are becoming the primary consumers of data and services.

### Key Strategic Actions

- **Adopt Pragmatic Semantics:** The Semantic Web's quiet success is the SEO layer agents now depend on. Standardize on schema.org, DCAT, and PROV in JSON-LD, validate with SHACL, and hide raw RDF behind GraphQL or typed REST APIs to balance interoperability with developer velocity.
- **Pivot to Agent Optimization (GEO):** AI-first economics are compressing the click web, with zero-click searches rising to 69% and CTRs falling up to 47%. Value is shifting to licensing and provenance. Deploy complete schema.org markup, C2PA Content Credentials, and machine-readable SLAs so agents can trust, cite, and transact.
- **Implement Cryptographic Trust:** Trust will be the new routing layer. Strong agent identity (OIDC + DIDs), proof-of-possession (mTLS/DPoP), and verifiable claims (VCs) are required. Implement DID/VC support and signed action receipts this year.
- **Publish Capability/Intent Manifests (CIM):** APIs need intent, risk, and cost semantics. Publish a CIM at a well-known URI for each service, marking unsafe actions and requiring Human-in-the-Loop (HITL) gating for high-risk operations.
- **Treat Agents as Untrusted Code:** Safety is an execution property. Run tools out-of-process behind a gateway, externalize authorization to Open Policy Agent (OPA), and enforce least privilege using microVMs or WASM isolates.
- **Prepare for Machine-to-Machine Markets:** Five markets (Data, Agents, Models/Tools, Compute, Trust) will transact via usage and outcomes. Productize your data and services with DCAT catalogs and support machine-native pricing.

---

## Context and Thesis

The web's next S-curve is machine-native, agent-driven. The open web's interoperability and the Semantic Web's machine-readability are converging into an AI-first "agentic web." This paradigm shifts interfaces, infrastructure, and markets from human clicks to autonomous transactions.

### From CERN to schema.org to LLM agents

The web's evolution spans from Tim Berners-Lee's 1989 proposal for a distributed hypertext system to the 1993 public domain release that unlocked global scale. The 2011 launch of schema.org introduced pragmatic semantics, and we are now entering the 2023+ agentic shift. Agents, powered by Large Language Models (LLMs), are becoming the primary users. Services must expose machine-native semantics and trust to remain relevant.

### Interfaces evolve from human HTML to CIM-annotated APIs

Interfaces are evolving from human-readable HTML to APIs annotated with Capability/Intent Manifests (CIM). Identity and provenance are hardening cryptographically, and economics are migrating from traffic-based advertising to licensing and outcome-based models.

---

## CERN's 1993 Public Domain Release Catalyzed Global Scale

Decentralized, royalty-free standards (HTTP/HTML/URIs) and W3C/IETF governance catalyzed universal adoption and interoperability.

### Royalty-free standards unlocked global participation

CERN's 1993 decision to place web technologies in the public domain eliminated royalties, ensuring the web could grow as an open, universal standard. This prevented fragmentation and commercial capture, fostering explosive growth propelled by browsers like Mosaic and Navigator. We must reapply this royalty-free, open governance model to emerging agent standards.

### Standards alignment prevented forks

The W3C (founded 1994) and WHATWG (founded 2004) aligned in a 2019 MoU on a single stream for HTML and DOM, leveraging shared Web Platform Tests. This reduced forks and accelerated interoperability. Replicating this alignment for agent protocols is critical to avoid fragmentation.

### Foundational stack and evolvability

The simplicity and separation of concerns in HTTP/1.0, HTML 2.0, and CSS1 kept barriers to entry low. This minimalist, text-first model ensured the evolvability of the stack — a vital lesson for designing agent APIs today.

| Technology | Standard | Role in Open Web |
|---|---|---|
| URIs/URLs | RFC 1630, 1738, 3986 | Universal, extensible naming scheme for resources and links |
| HTML | RFC 1866 (HTML 2.0) | Platform-independent document format with structure and anchors |
| HTTP | RFC 1945 (HTTP/1.0) | Stateless, application-level protocol for hypermedia transfer |
| CSS | W3C Recommendation (1996) | Separated presentation from document structure |

> **Takeaway:** The foundational web stack succeeded due to its simplicity, modularity, and open governance. Agentic infrastructure must adopt these same principles.

---

## Schema.org and JSON-LD Quietly Built the Machine-Readable Web

Full OWL-scale reasoning under-delivered on the open web, but schema.org and JSON-LD created a de facto machine layer that agents now exploit.

### 2001 Vision: Rules, proof, and trust for autonomous agents

The 2001 Semantic Web vision articulated an extension of the web where information carries well-defined meaning, enabling software agents to discover, integrate, and reason over distributed data. The stack included RDF for graph data, OWL for ontologies, and SPARQL for querying.

### Pragmatic adoption via schema.org and JSON-LD

Widespread adoption came via pragmatic semantics. The 2011 launch of schema.org by major search engines provided a single, flexible vocabulary. JSON-LD (2014–2016) offered a developer-friendly serialization compatible with RDF. This ecosystem created a machine-readable layer across millions of sites. Organizations should publish JSON-LD with contexts, validate with SHACL, and align with schema.org, DCAT, and PROV.

### Overcoming complexity and performance barriers

The full Semantic Web vision faced barriers: ontology engineering complexity, uneven developer tooling compared to JSON-first stacks, and performance limits of large-scale reasoning. Many teams defaulted to JSON APIs. The pragmatic path forward is to use RDF internally for knowledge graphs while exposing GraphQL or typed REST externally for developer ergonomics.

---

## Solid and Data Sovereignty — Pods for User-Controlled Data

Solid is viable in regulated ecosystems today; success hinges on simplifying policy UX and delegated roles for agents.

### Architecture and control via Pods and ACP

Solid extends the web with Personal Data Stores (Pods) controlled by the user. It decouples apps from data. Access Control Policies (ACP) provide an expressive, policy-based model that matches on agents, clients, and issuers, enabling fine-grained, least-privilege patterns and defense against cross-app data leakage.

### Pilots demonstrate viability in controlled domains

Implementations like Inrupt Enterprise Solid Server (ESS) and Community Solid Server (CSS) are powering pilots. The Government of Flanders uses Solid for citizen data vaults, and the BBC aggregates user data across platforms into user-controlled Pods. Organizations should start Solid deployments in controlled domains and standardize delegated agent roles.

---

## Agentic Web Architecture — Reliable Agents Need Modular, Governed Stacks

Agents combine LLM planning with external tools, guarded by deterministic policies, memory, retrieval, and full observability.

### Core components of a reliable agent

A modern agent architecture requires modular components: Perception/IO, Planning/Reasoning (LLM-driven), Tool Invocation (via RPC), Memory/State (episodic and semantic), Retrieval (hybrid search), Policy/Safety (external guardrails), and Observability (structured traces via OpenTelemetry).

### Frameworks shaping the agentic stack

Several frameworks are shaping this landscape. OpenAI Assistants provide managed tool calling; Anthropic's Model Context Protocol (MCP) offers an open JSON-RPC standard for connecting LLMs to external servers; Microsoft AutoGen facilitates multi-agent group chats; and LangGraph provides low-level, stateful orchestration. Organizations should standardize on MCP-style out-of-process tools.

### Neuro-symbolic integration for reliability

Neuro-symbolic integration combines LLM reasoning with verifiable knowledge graphs. GraphRAG extracts knowledge graphs from corpora, allowing agents to reason over both local text and global graph relationships. Validating LLM outputs with SHACL/OWL curbs hallucinations.

---

## Agentic Data & Knowledge Layer — Canonical, Queryable, Provable

JSON-LD with global @ids, shared vocabularies, and SHACL validation bridges developer ergonomics and graph interoperability.

### Canonical schemas and provenance-by-default

Agents require canonical entity schemas using HTTP(S) IRIs as primary identifiers (@id). Data should be published as JSON-LD, reusing vocabularies like schema.org, DCAT, and PROV. Schemas must include embedded provenance (e.g., `prov:wasGeneratedBy`) to ensure data lineage.

### Query interfaces for agent planning

Agents need expressive, predictable query interfaces. SPARQL offers unparalleled expressivity for internal graph data. Externally, GraphQL prevents over-fetching, and typed REST/gRPC APIs provide predictable interactions constrained by JSON Schema.

### Hybrid retrieval binds text to entities

Robust retrieval combines symbolic (lexical/BM25) and semantic (vector/ANN) search, reranked via Reciprocal Rank Fusion (RRF). Crucially, embeddings for document chunks must be stored with stable external IDs pointing to the canonical entity's @id in the knowledge graph, enabling bi-directional linking.

---

## Agent Identity & Trust Layer — From OAuth to DIDs/VCs + PoP

Combine federated identity (OIDC) with decentralized verifiability (DIDs/VCs), fine-grained capabilities, and rapid revocation.

### Identity and authentication mechanisms

Classic OAuth 2.0 and OIDC remain foundational, but bearer tokens must be hardened using Proof-of-Possession (PoP) mechanisms like mTLS or DPoP. Decentralized Identifiers (DIDs) and Verifiable Credentials (VCs) allow agents to present tamper-evident, high-assurance claims across domains.

### Delegation models beyond coarse scopes

Traditional OAuth scopes are too coarse for agents. Capability-Based Security grants specific, delegable permissions via tokens. Macaroons (lightweight bearer tokens with caveats) and UCANs (User-Controlled Authorization Networks) enable verifiable chains of delegated authority, enforcing least privilege.

### Provenance, transparency, and revocation

Cryptographic provenance is essential. C2PA embeds signed manifests into media, acting as a nutritional label for content. W3C PROV models detailed data lineage. All agent actions must be logged with signed receipts and cross-referenced with provenance graphs. Revocation must be near real-time, utilizing short-lived tokens and mechanisms like StatusList2021 for VCs.

---

## Execution & Orchestration — Isolate, Restrict, Meter, Observe

Treat agents and tools as untrusted workloads with strong isolation, explicit policies, and tight resource governance.

### Sandboxing choices and trade-offs

Safely executing agent-generated code requires strong isolation. Firecracker microVMs provide hardware-enforced isolation with sub-300ms boot times. gVisor offers hardened container isolation. WebAssembly (WASM) provides a memory-safe, capability-based sandbox by default.

### Capability restriction via OPA and SPIFFE

Agent capabilities must be restricted through explicit, externalized policies. SPIFFE issues short-lived, verifiable identities to workloads. Open Policy Agent (OPA) enforces fine-grained, attribute-based access control (ABAC) decisions at critical choke points, such as Envoy proxies.

### Tool execution and resource management

Tools should be executed as out-of-process microservices behind an API gateway. Gateways implement rate limiting and resource quotas on a per-agent basis. Kubernetes primitives enforce compute limits. Persistent memory requires per-tenant isolation for both long-term graph databases and short-term vector stores.

---

## Interfaces Agents Need — Contracts with Intent, Costs, and Discovery

Pair low-level API specs with high-level capability/intent manifests and robust natural language-to-operation pipelines.

### Service contracts and semantic annotations

OpenAPI 3.1.x is essential for HTTP APIs, using JSON Schema for data models. AsyncAPI handles message-driven architectures. OData distinguishes between safe functions and unsafe actions. Semantic annotations via JSON-LD and schema.org enrich these contracts with meaning.

### Capability/Intent Manifest (CIM)

API specs lack high-level semantics. A Capability/Intent Manifest (CIM) published at a well-known URI acts as a summary layer. It defines identity, capabilities with sideEffect flags (none, idempotent, unsafe), authentication scopes, SLAs, cost models, and events.

### NL-to-operation pipeline with safety gates

Translating natural language to API calls requires a multi-stage pipeline:

1. **Retrieval & Planning:** Fetch the CIM and schemas.
2. **Generation:** LLM generates the call, constrained by JSON Schema.
3. **Validation & Safety:** Validate against schemas and OPA policies. High-risk actions require Human-in-the-Loop (HITL) confirmation.
4. **Execution:** Execute using idempotency keys and log the entire process.

### Discovery via DCAT catalogs

Agents need federated discovery. Services should register as `dcat:DataService` entries in DCAT catalogs, linking to the CIM and OpenAPI contracts. OpenID Connect Discovery handles authentication endpoints.

---

## Five Interconnected Markets Rebundle Around Machine-to-Machine Transactions

Five interconnected markets will transact via usage and outcomes, requiring machine-readable billing and auditable provenance.

| Market | Suppliers | Platforms / Channels | Consumers |
|---|---|---|---|
| Data | Publishers, Enterprises, Public Stewards | AWS Data Exchange, Snowflake Marketplace | Agents, LLM Apps |
| Agents | Agent Authors, Tool Developers | OpenAI GPT Store, Quora Poe | End-users, Other Agents |
| Models/Tools | Foundation Model Providers, Plugin Authors | Hugging Face, AWS Bedrock, Zapier | Agents, Developers |
| Compute/Inference | Hyperscalers (AWS, Azure), Specialized GPU Clouds (CoreWeave) | Cloud Brokers | Model Providers, Agent Platforms |
| Trust/Compliance | IdPs, VC Issuers, Auditors | OIDC/DID Issuers, UMA, C2PA | All Markets |

> **Takeaway:** Value exchange in the agentic web triggers cascaded, metered events across these five markets, requiring automated revenue splits.

### Value flows, pricing, and SLAs

Pricing models include subscriptions, usage-based fees (per token/call), outcome-based pricing (per task completed), and app-store revenue shares. SLAs covering data freshness and model latency command premium pricing. Standardized billing signals like FinOps FOCUS are required at scale.

### Reputation and interoperability prerequisites

Trust requires cryptographic provenance (W3C PROV, C2PA), third-party audits, and publisher identity verification. Interoperability relies on portable identity (OIDC, DIDs), standardized discovery (DCAT), and portable entitlements (UMA).

---

## Socioeconomic & Regulatory Impact — Prepare for Compressed Funnels and New Duties

CTRs are declining and zero-click searches are growing, pushing revenue into the AI layer. EU AI Act and privacy laws mandate strict oversight.

### Economic shifts and GEO strategy

AI agents are disrupting the click-based economy. Organic search traffic to top tech publications dropped 58% since 2024, and zero-click searches rose to 69%. Monetization is shifting to the AI layer via ads in AI Overviews and paid data licensing deals (e.g., OpenAI and News Corp). Businesses must pivot to GenAI Engine Optimization (GEO) using structured data and C2PA provenance.

### Workforce and emerging roles

Generative AI increases productivity (e.g., +14% in customer support) but exposes 40% of global employment to substitution risk. New roles are emerging: AgentOps (governing agent teams), Knowledge Stewards (curating RAG corpora), and Trust and Provenance Brokers (verifying content origins).

### Regulatory landscape and antitrust scrutiny

The EU AI Act (effective August 2026) imposes risk management, logging, and human oversight on high-risk AI systems. GDPR and CCPA require Data Protection Impact Assessments (DPIAs) and opt-outs for automated decisions. Antitrust regulators are scrutinizing OS-level assistants and foundation models as new digital chokepoints.

---

## Security & Privacy Threat Model — Defend Against Systemic LLM-Era Risks

Prompt injection, tool misuse, and data exfiltration require deterministic, model-external controls and continuous red-teaming.

### Primary threats

Key threats include Prompt Injection (OWASP LLM01), where untrusted content overrides policies; Tool Misuse leading to Remote Code Execution; Data Exfiltration of sensitive PII; Model Hijacking via poisoned data; and Sybil attacks polluting knowledge bases.

### Mitigation controls

Defense-in-depth requires deterministic controls external to the LLM:

- **Isolation:** MicroVMs (Firecracker) or WASM
- **Least Privilege:** Ephemeral, scoped credentials and HITL for unsafe ops
- **Policy Guards:** OPA for auditable enforcement
- **Provenance:** W3C PROV and C2PA for content authenticity
- **Filtering:** Strict schema validation and Data Loss Prevention (DLP)

### Privacy-preserving techniques

Implement strict data minimization and context scoping. For high-risk scenarios, consider Differential Privacy (DP), Federated Learning, or Multi-Party Computation (TEE/MPC), acknowledging trade-offs in latency and cost.

### Incident response and auditing

Maintain structured, immutable logs of agent decisions, prompts, and tool calls to support forensic replay. Implement detection rules, rate-limiting, and a "kill switch" to rapidly disable rogue agents.

---

## Lessons from Decentralized Ecosystems — Borrow Patterns, Avoid Pitfalls

Use WebFinger for discovery and CIDs for integrity; keep control loops off-chain.

### Applicable patterns for discovery and portability

WebFinger (`acct:user@domain`) provides user-friendly discovery resolving to agent manifests. Content-Addressed Identifiers (IPFS CIDs) ensure artifact integrity, while mutable pointers (IPNS/DNSLink) handle updates. Matrix's cross-signing models multi-device trust.

### Non-transferable constraints

On-chain smart contracts are too slow and expensive for high-frequency agent decision loops. ActivityPub's server-bound identity creates migration friction. Matrix's state synchronization DAG is too heavy for global blackboards. IPFS latency requires pinning services and hardened gateways.

### Recommended architectural blueprint

Assign agents canonical HTTPS URIs returning JSON-LD manifests. Use WebFinger for discovery. Adopt ActivityPub's inbox/outbox for asynchronous messaging and Matrix rooms for scoped real-time coordination. Store immutable artifacts on IPFS with mutable pointers. Keep high-frequency loops off-chain, reserving blockchains for settlement and anchoring.

| System | Goal | Architecture | Incentive Model |
|---|---|---|---|
| ActivityPub | Decentralized social networking | C2S and S2S federation via inbox/outbox | Social/trust-based; instance operators bear costs |
| Matrix | Federated real-time communication | Homeservers syncing DAGs of events; E2EE | Utility-driven; non-profit governance |
| IPFS | Content-addressed P2P storage | CIDs, libp2p DHT, IPLD Merkle-DAGs | Voluntary caching or paid pinning (Filecoin) |
| Web3 (Ethereum) | Global programmable settlement | PoS blockchain, smart contracts, ENS | Cryptoeconomic; users pay gas fees |

> **Takeaway:** Agentic architecture should blend ActivityPub's messaging simplicity, IPFS's artifact integrity, and Web3's settlement layer, avoiding heavy on-chain compute.

---

## End-to-End Case Study — Verifiable Agent Workflow for Steel Import

A VC-based workflow demonstrates auditable multi-party automation and reveals critical standards gaps.

### Data and identity model

In a US Customs (CBP) steel import demo, an agent orchestrates data exchange between buyers, producers, and government agencies. It uses JSON-LD contexts (`credentials/v2` and `traceability/v1`) and schema.org vocabularies. VCs are stored in separate named graphs to maintain strict provenance and prevent data co-mingling.

### API and interaction flow

The agent discovers endpoints via `did:web` and authenticates using OAuth2. It receives VCs (Purchase Orders, Mill Test Reports), queries its internal graph via SPARQL to select required credentials, generates a Verifiable Presentation (VP), and submits it to CBP. Credential status is tracked via StatusList2021.

### Gaps and priorities

The case study highlights P0 gaps: competing standards for VP negotiation (W3C VP Request vs. Presentation Exchange), the need for fine-grained agent authorization beyond basic OAuth2 (requiring GNAP or UMA), and the lack of standardized offline JSON-LD context management.

---

## Roadmap 2026–2030 — Standards, Pilots, and KPIs for Scale

Solve provenance at scale, safe delegation, and A2A interoperability to achieve broad adoption by 2029–2030.

### Open technical problems

Critical challenges include end-to-end provenance at scale, safe delegation with machine-verifiable constraints, agent identity attestation, multi-agent interoperability protocols, and standardized evaluation benchmarks.

### Standardization priorities

- **W3C:** Initiate a "PROV-Agentic" profile and an "Agent Capability Delegation" (ACD) profile.
- **IETF:** Charter an "Agent-to-Agent Interoperability" (A2A) Working Group and utilize SCITT for transparent logs.
- **DIF/OIDF:** Launch a "Trusted AI Agents" WG for DID/VC profiles and align OpenID4VC for consent flows.

### Phased milestones

- **Phase 0 (2026):** Foundations, alignment, and chartering new working groups.
- **Phase 1 (2027):** v1 drafts for A2A and ACD profiles; runtime attestations.
- **Phase 2 (2028):** Regulated sectoral pilots; major frameworks implement A2A.
- **Phase 3 (2029–2030):** Broad adoption; A2A/ACD reach REC status; widespread operator controls.

### KPIs and telemetry

Track implementation conformance, Agent DID penetration, daily C2PA provenance volume, and EAT attestation usage. Monitor safety via red-team success rates and Mean Time to Quarantine (MTTQ).

| Milestone | Optimistic | Base | Conservative |
|---|---|---|---|
| A2A WG Charter (IETF) | Q3 2026 | Q4 2026 | Q2 2027 |
| W3C ACD Profile First Draft | Q1 2027 | Q2 2027 | Q4 2027 |
| A2A Interop Profile v1 Drafts | Q2 2027 | Q3 2027 | Q1 2028 |
| Launch of Major Sectoral Pilots | Q4 2027 | Q2 2028 | Q1 2029 |
| A2A Profile Reaches Proposed Standard | Q4 2028 | Q2 2029 | Q2 2030 |
| W3C ACD Profile Reaches REC Status | Q2 2029 | Q4 2029 | 2031 |
| Broad Adoption (>50% of platforms) | Q4 2029 | Q4 2030 | 2031+ |

> **Takeaway:** Achieving the base scenario requires immediate investment in IETF and W3C working groups to prevent fragmented, proprietary agent silos.

---

## Implementation Playbook — 12-Month Execution Plan

A phased, low-regret plan de-risks adoption while unlocking near-term GEO revenue and compliance readiness.

### Quarter-by-quarter actions

- **Q1:** Inventory existing services. Add JSON-LD and schema.org markup to public data. Author initial Capability/Intent Manifests (CIMs) and set up a DCAT catalog.
- **Q2:** Stand up dual memory architecture (RDF graph + vector DB). Implement GraphRAG. Deploy OPA policies and SPIFFE workload identities for internal tools.
- **Q3:** Add DID/VC issuance and verification capabilities. Implement C2PA for generated content. Enforce PoP tokens (mTLS/DPoP) and integrate metering with FinOps FOCUS.
- **Q4:** Enforce HITL gating for unsafe operations. Open-source internal conformance tests and execute a regulated pilot workflow.

### Platform choices and reference stack

- **Gateways & Policy:** Envoy + Open Policy Agent (OPA)
- **Isolation:** Firecracker/Kata Containers or gVisor
- **Memory:** RDF triple store paired with a Vector DB
- **Orchestration:** LangGraph or AutoGen integrated with MCP for out-of-process tools

### Risk register and mitigations

- **Prompt Injection:** Mitigate via strict input/output filtering and out-of-process tool isolation.
- **Over-privilege:** Mitigate via OPA ABAC policies and ephemeral, scoped credentials.
- **Ontology Creep:** Mitigate by strictly reusing schema.org and DCAT rather than inventing custom vocabularies.
- **Regulatory Drift:** Mitigate by instrumenting full OpenTelemetry traces and PROV logs to adapt to upcoming EU AI Act audit requirements.

---

## References

1. [JSON-LD 1.1 — W3C](https://www.w3.org/TR/json-ld11/)
2. [From Secure Agentic AI to Secure Agentic Web — arXiv](https://arxiv.org/pdf/2603.01564)
3. [SPARQL 1.1 Overview — W3C](https://www.w3.org/TR/sparql11-overview/)
4. [Introducing the Model Context Protocol — Anthropic](https://www.anthropic.com/news/model-context-protocol)
5. [Function Calling — OpenAI API](https://developers.openai.com/api/docs/guides/function-calling/)
6. [Data Catalog Vocabulary (DCAT) Version 3 — W3C](https://www.w3.org/TR/vocab-dcat-3/)
7. [Traffic to top tech publications has plummeted since 2024 — Nieman Lab](https://www.niemanlab.org/2026/03/traffic-to-top-tech-publications-has-plummeted-since-2024-new-analysis-shows/)
8. [News Corp and OpenAI Sign Landmark Multi-Year Global Partnership](https://investors.newscorp.com/news-releases/news-release-details/news-corp-and-openai-sign-landmark-multi-year-global-partnership)
9. [What is C2PA? — C2PA Viewer](https://c2paviewer.com/articles/what-is-c2pa)
10. [LLM01: Prompt Injection — OWASP](https://genai.owasp.org/llmrisk/llm01-prompt-injection/)
11. [AI Agent Protocol — W3C Community Group](https://www.w3.org/groups/cg/agentprotocol)
