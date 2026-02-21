---
created: 2026-02-16T19:36:44-05:00
modified: 2026-02-16T19:37:10-05:00
title: Platform Selection
---

## Overview

This document outlines our **platform selection process** for rebuilding the [ChicoryLane conservation reserve](http://chicorylane.com/) website. The project involves a full rewrite of an existing site while extending it with an **AI-powered chatbot** backed by a **RAG (Retrieval-Augmented Generation)** pipeline and agentic capabilities.

A key constraint shaping all technology decisions is our client's background: he is primarily experienced with **PHP, SQL, and HTML/CSS**. Our goal is to modernize the stack without creating a system he cannot maintain or understand. Where possible, we have selected technologies that are either familiar to him or conceptually close to what he already knows.

---

## Client Constraints

The client's existing familiarity with **PHP, SQL, and HTML/CSS** is the dominant constraint on this project. Specifically:

- We cannot introduce a backend language he has no exposure to without significant maintainability risk.
- Frontend tooling that requires knowledge outside of HTML should also be avoided where possible.
- Any system we build should be quite comprehensible to the client so he can make edits, content updates, or hand it off to a future developer without needing to re-architect everything.

These constraints ruled out a lot of otherwise compelling options and are noted explicitly below where relevant.

---

## Platform Components

### Programming Language(s)

The project will use **PHP** as the primary server-side language and **JavaScript** minimally on the frontend. **Python** will also be used specifically for the AI/RAG services.

---

### Frontend

#### Selected: HTMX

[HTMX](https://htmx.org/) is a lightweight library that allows HTML elements to make HTTP requests and swap content dynamically, without writing additional JavaScript. It is simply a modern extension of HTML.

**Pros:**
- Minimal JavaScript - interactivity is handled in HTML attributes, which is a lot more legible to the client.
- Server-driven rendering fits well with a PHP backend.
- Very lightweight library that does not add a lot of overhead like most node-based frameworks.
- Ideal for sites that just want to display and update data such as this one, nothing complex with client state is needed.

**Cons:**
- Not suitable for highly interactive, stateful applications. This application fortunately is not.
- Smaller ecosystem than React or Vue.
- Less commonly known, external developers picking this up in the future may have to familiarize themselves with the framework's conventions.

**Why we chose it:** HTMX strikes the best balance between the interactivity we need and the simplicity the client can maintain. Its HTML-centric model is the closest thing to "just writing HTML" while still supporting dynamic updates. It pairs cleanly with the backend we have chosen as well.


---


#### Considered: Site Builders (WordPress / Webflow)

Platforms like [WordPress](https://wordpress.org/) and [Webflow](https://webflow.com/) allow rapid site creation with little to no custom code.

**Pros:**
- Fast to create and ship an initial site.
- Non-technical users can manage content without developer involvement.
- WordPress in particular is PHP-based, which aligns with the client's background.

**Cons:**
- Very limited control over custom logic - integrating an entire RAG pipeline and agentic AI system would require a lot of fighting against the platform's intended functionality.
- Vendor lock-in makes migration a lot more difficult later.
- The node/graph document structure of our current project does not map cleanly onto a website builder.

**Why we passed:** The AI/chatbot component and custom data architecture make this project too custom for a site builder. We need full control over routing, data flow, and API integration.

---

#### Considered: Next.js / React

[React](https://react.dev/) and [Next.js](https://nextjs.org/) are the most dominant frameworks for modern web frontends, with a massive ecosystem and strong community support.

**Pros:**
- Some of the best tooling for complex, interactive UIs.
- Very easy to find developers who know React.
- Next.js provides server-side rendering and API routes in a unified framework, reducing some backend complexity.
- Strong support for real-time features and rich client-side interactivity.

**Cons:**
- Completely outside the client's knowledge. A React codebase would be very unmaintainable to someone who knows only HTML and PHP.
- Overkill for a content-and-data site that does not require complex client-side state.

**Why we passed:** The tooling burden and departure from the client's mental model made React/Next.js a poor fit, despite its technical strengths.


---

### Backend

#### Selected: Laravel (PHP)

[Laravel](https://laravel.com/) is a modern PHP framework that provides routing, ORM (Eloquent), templating (Blade), authentication, and more.

**Pros:**
- Easiest to Migrate, large portions of the current site are already written in PHP.
- PHP is the one backend language the client already knows, meaning the server-side logic is at least approachable to him even if some of the Laravel abstractions add a layer of learning.
- Laravel's Blade templating pairs very well with HTMX.
- Extensive documentation, a large community, and long-term stability.
- Built-in support for queues and background jobs, which can be important for async AI pipeline tasks.

**Cons:**
- Laravel itself will have a slight learning curve beyond raw PHP.
- Handling the RAG/AI components natively in PHP would be difficult — this is addressed by offloading those tasks to a Python microservice (see below).

**Why we chose it:** The combination of existing code, client familiarity with the language, and Laravel's production-grade tooling made this the clear choice.

---

#### Supplementary: Python Microservice (AI/RAG)

While PHP handles the main application, the **AI and RAG pipeline** is implemented as a separate Python microservice. The Laravel backend communicates with this microservice via internal HTTP API calls. This keeps concerns cleanly separated: PHP handles web logic, Python handles AI logic.

**Pros:**
- Access to the full Python AI/ML ecosystem.
- The microservice can be developed, tested, and scaled independently of the main application.
- Allows much easier use of most APIs that are only well-supported in Python.

**Cons:**
- Adds complexity with two runtimes being deployed and running.
- The client will not be very capable of maintaining the Python layer without learning.

**Why we included it:** The RAG pipeline requires Python tooling. Isolating it as a microservice keeps the rest of the codebase in PHP while giving us full access to AI libraries.

---

#### Considered: Node.js / Express / Next.js API Routes

JavaScript on the server via Node.js, Express, or Next.js API routes.

**Pros:**
- Unified language across frontend and backend if React/Next.js were also chosen.
- Very large ecosystem.

**Cons:**
- Completely foreign to the client, who has no JavaScript backend experience.
- No existing codebase in JS to build from.

**Why we passed:** The client constraint alone eliminates this option. Beyond that, PHP/Laravel is a more coherent choice given the existing code and content management needs.

---

### Database

#### Relational Database

The relational database stores all structured application data: plant and species records, ecological attributes, user accounts, content metadata, and site configuration. Laravel's Eloquent ORM provides a clean abstraction layer above whichever SQL engine we select, so the day-to-day development experience is largely the same regardless of the choice. The decision here is primarily about fit for scale, client familiarity, and hosting overhead.

##### Selected: MySQL

[MySQL](https://www.mysql.com/) is the world's most widely deployed open-source relational database, and has been the default choice for PHP-based web applications for decades.

**Pros:**
-  The client has existing experience with SQL. The concepts are already familiar to him.
- Excellent native integration with PHP and Laravel — Eloquent ORM and the Laravel documentation defaults to MySQL in the majority of its examples.
- MySQL is well-suited for web and transactional applications — exactly the workload of a site like ChicoryLane's.
- Straightforward to host on any VPS environment, including what the client currently uses.

**Cons:**
- MySQL is less extensible than PostgreSQL and offers a more limited set of built-in data types and index types.
- Oracle's ownership since 2010 has raised concerns in the open-source community about long-term direction, which is why the MariaDB fork exists as a drop-in alternative.

**Why we chose it:** MySQL is the natural choice given the client's existing SQL familiarity, it has great integration with PHP and Laravel There is no feature gap between MySQL and PostgreSQL that matters at this project's scale, and keeping the database familiar to the client preserves his ability to inspect and manage data directly if needed.

---

##### Considered: PostgreSQL

[PostgreSQL](https://www.postgresql.org/) is the most feature-rich open-source relational database available and has surpassed MySQL in developer preference surveys for several consecutive years.

**Pros:**
- PostgreSQL is preferred for data-intensive, analytical, or high-integrity systems that demand advanced SQL features.
- Supports advanced index types, partial indexes, and expression indexes not available in MySQL.
- The `pgvector` extension would allow vector embeddings to be stored directly in PostgreSQL, potentially consolidating the relational and vector stores into a single system.

**Cons:**
- PostgreSQL offers a rich feature set ideal for complex, large-scale applications — but that complexity is unnecessary overhead for this project's scope.
- PostgreSQL has a steeper learning curve, especially for the client, who would be less likely to recognize PostgreSQL if he ever needed to inspect or modify the database directly.
- Slightly more configuration overhead on typical shared hosting environments compared to MySQL.

**Why we passed:** PostgreSQL's strengths are real but address problems we don't have. The client constraint is decisive, MySQL is what he knows, and it handles this project's workload comfortably.

---

##### Considered: MongoDB

[MongoDB](https://www.mongodb.com/) is the dominant document-oriented NoSQL database, storing data as flexible JSON-like documents rather than rows and columns.

**Pros:**
- Schema flexibility is useful during early-stage development when data models are still evolving.
- Handles unstructured or semi-structured content naturally (e.g., storing mixed-media node content as documents).
- Horizontal scaling is simpler than with most relational databases.

**Cons:**
- MongoDB is **not relational** — it has no concept of foreign keys or JOIN operations.
- Completely outside the client's knowledge. A document store with a JSON query syntax is a fundamentally different mental model from the SQL he already knows.
- Laravel's Eloquent ORM is built for relational databases.

**Why we passed:** The relational nature of our data makes a relational database the obviously correct choice. MongoDB would require us to manually reconstruct relationships that MySQL enforces for free. The client constraint seals it.

---

#### Graph / Vector Database (GraphRAG Chatbot)

The chatbot component uses **GraphRAG** rather than just vector RAG. GraphRAG goes further: it extracts entities and relationships from source documents and builds a **knowledge graph**, then queries that graph during retrieval. This allows the system to answer questions that require reasoning across connected facts rather than just returning the most semantically similar text chunks.

##### Selected: Neo4j

[Neo4j](https://neo4j.com/) is the most mature and widely adopted graph database in the world, with native support for the property graph model, the Cypher query language, and built-in vector indexing.

**Pros:**
- Neo4j is specifically made with GraphRAG in mind. There is a lot of reference material and tooling for exactly our use case.
- Neo4j supports native knowledge graph functionality **and** built-in vector search capabilities, allowing the system to leverage vector search for semantic matching while utilizing Neo4j's graph engine to traverse and query complex relationships.
- Open-source Community Edition is available for self-hosting at no cost.
- Neo4j offers a mature platform with a large community and proven track record, alongside extensive documentation.

**Cons:**
- Neo4j Community Edition has feature limitations compared to Enterprise Edition. For our scale this is not a concern.
- Cypher is a new query language for majority of the team. It is expressive and approachable, but it is an additional learning investment.
- Java-based runtime.

**Why we chose it:** Neo4j is the standard for GraphRAG implementations. The community tooling and native combination of graph traversal and vector search make it the most practical choice. There is no need to stitch together a separate vector store alongside a graph store — Neo4j handles both.

---

##### Considered: Qdrant

[Qdrant](https://qdrant.tech/) is an open-source, high-performance vector database written in Rust.

**Pros:**
- Extremely fast vector search with a well-optimized implementation.
- Rust-based architecture gives it an excellent performance-to-resource ratio.
- Easy to self-host via Docker; strong Python client.
- Already in use with the currently integrated chatbot.

**Cons:**
- Qdrant is a **pure vector database**. It has no graph data model, no traversal query language, and no concept of nodes and relationships.
- GraphRAG requires querying a structured knowledge graph. Qdrant cannot provide this on its own, and pairing it with a separate graph database adds operational complexity.

**Why we passed:** Qdrant was sufficient for the previous RAG chatbot. The upgrade to GraphRAG requires graph-native storage that Qdrant fundamentally cannot provide.

---

##### Considered: ChromaDB

[ChromaDB](https://www.trychroma.com/) is a lightweight, Python-native, open-source vector database popular for prototyping and small-scale RAG applications.

**Pros:**
- Simplest possible setup, runs as a local server with zero infrastructure overhead.
- Excellent for rapid prototyping.

**Cons:**
- Pure vector store with no graph capabilities.
- Not designed for production scale; performance degrades on larger datasets.
- No entity relationship modeling, no graph traversal.

**Why we passed:** ChromaDB is a prototyping tool appropriate for normal RAG. It is architecturally incompatible with GraphRAG.

---

### Deployment

Deployment covers how and where the application is hosted, how the server is configured, and how updates are pushed. This decision carries significant client constraint weight — the client already has infrastructure in place and has no background in cloud platforms or container orchestration. Any deployment strategy that requires him to interact with the hosting environment must be approachable without deep knowledge.

#### Selected: Apache HTTP Server (Existing Deployment)

[Apache HTTP Server](https://httpd.apache.org/) is the existing hosting environment for the ChicoryLane site. Apache is one of the oldest and most widely deployed web servers in the world.

The plan is to continue hosting on the client's current Apache server, configuring it to serve the Laravel application

**Pros:**
- **No migration cost.** The client already owns and manages this server.
- The client understands his current hosting environment. If something goes wrong, he can SSH in, check logs, and contact his hosting provider with familiarity.
- Laravel's official documentation includes explicit instructions for Apache deployment, so setup is well-guided.
- The Python microservice can be run as a background process on the same server, keeping the architecture self-contained without needing a second host.
- Hosting costs remain whatever they already are, zero additional spend on infrastructure.

**Cons:**
- Apache on a single server is not horizontally scalable. If traffic grew dramatically, serving everything from one place would become a bottleneck. This is not a concern for a conservation reserve website.
- Deploying updates requires SSH access and running CLI commands manually, or setting up a basic deployment script. There is no super easy deployment button as there would be with a PaaS.
- Unlike containerized environments, the server's software stack (PHP version, Python version, system libraries) is global and shared, which means dependency conflicts are possible if the server hosts multiple projects.

**Why we chose it:** Keeping the existing Apache server is the only deployment strategy that imposes zero new knowledge requirements on the client and zero new infrastructure cost. Running Laravel on Apache is a standard, supported pattern, and the server's capacity is well beyond what a conservation reserve website will ever demand.

---

#### Considered: Cloud PaaS (Heroku)

Platform-as-a-Service providers like [Heroku](https://www.heroku.com/) abstract away server management entirely.

**Pros:**
- Zero server administration.
- Push-to-deploy workflows are developer-friendly.
- Managed add-ons (databases, Redis, etc.) can be provisioned in minutes.
- Built-in logging, metrics, and autoscaling dashboards.

**Cons:**
- Monthly costs that scale with usage.
- The client has no familiarity with any of these platforms. If something breaks he cannot fix it easily.
- Running the Python microservice alongside the Laravel app on a PaaS requires either a multi-service deployment or hosting the microservice separately, splitting the infrastructure.
- Migrating the existing domain, DNS, and any existing data from the current host is an additional risk with no corresponding benefit for this project's scale.

**Why we passed:** The cost-benefit ratio is poor. We would be paying money and introducing platform-specific knowledge requirements to replace infrastructure that already exists and already works.

---

#### Considered: Docker / Docker Compose

[Docker](https://www.docker.com/) and Docker Compose allow the entire application stack to be defined as a set of containerized services, making the environment reproducible and portable across machines.

**Pros:**
- Every developer runs an identical environment.
- Simplifies onboarding for new team members.
- The Python microservice, Laravel app, MySQL database, and Neo4j instance can all be declared in a single .yml.
- Makes possible future migrations much easier, since the containerized stack is portable.
- Industry standard for modern application deployment; strong tooling ecosystem.

**Cons:**
- **High client knowledge overhead.** Docker introduces an entirely new conceptual layer that the client has no exposure to. If a container goes down or needs updating, the client would have no idea what to do.
- Debugging issues inside a container is harder than debugging directly on the host, particularly for a client who is used to simply editing files on the server.

**Why we passed:** Docker would benefit our team's workflow but would make the production environment significantly harder for the client. The primary purpose of deployment is to run the site reliably, and the existing Apache setup already does that.