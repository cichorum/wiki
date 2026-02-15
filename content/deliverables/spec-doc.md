---
created: 2026-02-06T19:00:52-05:00
modified: 2026-02-15T17:26:30-05:00
title: Specifications Document
---

___

## User Stories

### As a Visitor of the Website,
**I want to clearly understand what the Chicory Lane Conservation Group is, what it does, the events it hosts, and how to access its educational materials.**
- I want to quickly locate specific information on the website without unnecessary searching.
- I want content to be organized logically and presented in a clear, easy to follow manner.
- I want important information (mission, programs, events, resources) to be immediately visible and well explained.

### As an Ecologist or Conservation Professional,
**I want to quickly find and access documents, research materials, and reference resources.**
- I want resources to be stored in well-defined, intuitive locations across the site.
- I want the ability to download documents and datasets with minimal time-wasted.
- I want access to an AI-powered chatbot that can answer questions about site content and reference materials available in the database.

### As the Website Administrator,
**I want the site to be well-structured and scalable to support future growth.**
- I want to add and update pages efficiently without extensive technical overhead.
- I want the codebase to be clear, well-organized, and approachable for future maintainers.
- I want the chatbot integration to be modular and configurable, allowing for straightforward updates to its data sources, model, and behavior.

___

## Requirements

### Functional

#### Definite:
- **The AI Chatbot must use a system prompt and identity, Cichorum, for efficient user-communication.**
- **The chatbot must be able to access all information on the website.**
- **Conversations with the chatbot must be stored in a single session.**.
- **The chatbot must have access to the databases in-use by the website.**
- **The application must allow users to download documents from the database.**
- **The chatbot must be able to export conversations to other formats (e.g., pdf).**
- **The chatbot must have access to the Chicory Lane databases.**
- **The website must include user authentication.**

#### Perhaps:
- **The chatbot should be available on each page of the website in the toolbar.**
- **The chatbot should be restricted from communicating outside of website context.**

#### Improbable:
- **Lorem ipsum**
    - **The chatbot might include voice interaction.**
	- **The chatbot might include AI image reading.**
---
### Non-Functional

#### Definite:
- **Website should be maintainable for the client.**
- **The aesthetics and functionality of the user-interface will be improved.**
- **The existing features of the website must be preserved.**

#### Perhaps:
- **Chatbot should load responses in a reasonable time.**
- **The chatbot should have visibility in terms of tool/function calls and relevant data.**

#### Improbable:
- **Lorem ipsum**
    - dolor sit amet.

---
### Interfaces

- **Web Application (Website)**
	- Conversational Chatbot Interface
		- Citations/References
	- Administrative Interface
		- Data Ingestion/Document Uploads
		- Connector/Adapter Controls
		- Indexing/Re-Indexing
		- Retrieval Monitoring?
		- Cost Tracking
	- Exploration of Reserve Database
- **API Interface**
	- Connections to Internal DBs
	- Connection to LLM Provider API
	- Retrieval System
	- Connection to Agent/Observability Platform