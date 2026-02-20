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

The project will use **PHP** as the primary server-side language and **JavaScript** minimally on the frontend. **Python** will also be used specifically just for the AI/RAG services.

---

### Frontend

#### Selected: HTMX

[HTMX](https://htmx.org/) is a lightweight library that allows HTML elements to make HTTP requests and swap content dynamically, without writing JavaScript. It is simply a modern extension of HTML.

**Pros:**
- Minimal JavaScript - interactivity is handlex in HTML attributes, which is a lot more legible to the client.
- Server-driven rendering fits well with a PHP backend.
- Very lightweight library that does not add a lot of overhead like most node-based frameworks.
- Ideal for sites that just want to display and update data such as this one, nothing complex with client state is needed.

**Cons:**
- Not suitable for highly interactive, stateful applications. This application fortunately is not.
- Smaller ecosystem than React or Vue.
- Less commonly known, external developers picking this up in the future may have to learn the ins and outs of the framework first.

**Why we chose it:** HTMX strikes the best balance between the interactivity we need and the simplicity the client can maintain. Its HTML-centric model is the closest thing to "just writing HTML" while still supporting dynamic updates. It pairs cleanly with the backend we have chosen as well.


---


#### Considered: Site Builders (WordPress / Webflow)

Platforms like [WordPress](https://wordpress.org/) and [Webflow](https://webflow.com/) allow rapid site creation with little to no custom code.

**Pros:**
- Fast to create and ship an initial site.
- Non-technical users can manage content without developer involvement.
- WordPress in particular is PHP-based, which aligns with the client's background.

**Cons:**
- Very limited control over custom logic - integration an entire RAG pipeline and agentic AI system would require a lot of fighting against the platform's intended functionality.
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
- PHP is the one backend language the client already knows, meaning the server-side logic is at least approachable to him even if some of the Laravel abstractions add a layer of learning.'
- Laravel's Blade templating pairs very well with HTMX.
- Extensive documentation, a large community, and long-term stability.
- Built-in support for queues and background jobs, which can be important for async AI pipeline tasks.

**Cons:**
- Laravel itself will have a slight learning curve beyond raw PHP.
- Handling the RAG/AI components natively in PHP would be difficult — this is addressed by offloading those tasks to a Python microservices (see below).

**Why we chose it:** The combination of existing code, client familiarity with the language, and Laravel's production-grade tooling made this the clear choice.

---

#### Supplementary: Python Microservice (AI/RAG)

While PHP handles the main application, the **AI and RAG pipeline** is implemented as a separate Python microservice. The Laravel backend communicates with this microservice via internal HTTP API calls. This keeps concerns cleanly separated: PHP handles web logic, Python handles AI logic.

**Pros:**
- Access to the full Python AI/ML ecosystem.
- The microservice can be developed, tested, and scaled independently of the main application.
- Allows much easier use of most API's that are only well-supported in Python.

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

#### Persistent/Relational Database

**TO BE COMPLETED:**
*I don't really know what the client currently has and what we want to do about this???*


#### Vector Database (RAG / Chatbot)

The chatbot component relies on a **Retrieval-Augmented Generation (RAG)** architecture. When a user asks a question, the system retrieves semantically relevant chunks of content from the reserve's knowledge base, this includes the website text, ecologicial data, and uploaded documents, and passes them as contenxt to the language model before generating a response. This requires a **vector database**.


**TO BE COMPLETED:**

*Currently using [Qdrant](https://qdrant.tech/) ?*

*gotta find pros and cons and alternatives?*


---

### Deployment

**TO BE COMPLETED:**
*I don't really know what the client currently has and what we want to do about this???*