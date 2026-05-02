---
created: 2026-01-28T16:17:27-05:00
modified: 2026-02-12T11:41:47-05:00
title: Project Introduction
---
## Overview

> [!info]- Quick Summary
> A Laravel 12 web application and agentic GraphRAG microservice for the ChicoryLane ecological reserve, combining a public-facing nature site with an authenticated dashboard for managing ecological records and an intelligent AI query interface.  

Working with the [ChicoryLane ecological reserve's current website](http://chicorylane.com/), we built a brand new full-stack system for the ChicoryLane conservation reserve. The application serves a public site via server-rendered Blade templates and an authenticated dashboard for managing ecological data (taxa, observations, areas, media, services, and events). Navigation and dashboard interactions are progressively enhanced with HTMX, keeping the UI server-driven without becoming a SPA.

The core innovation is a GraphRAG microservice that implements an agentic knowledge base over a Neo4j graph. It ingests records from the database and all content from the website and exposes an intelligent query interface via a LangGraph agent. The agent selects from three specialized tools at runtime: SQL lookup, semantic vector search, and graph traversal to answer any questions about the reserve.

**Key components of what was delivered:**
- Laravel 12 app with MySQL as the primary data store, Blade + HTMX for the UI, and role-based access (user/admin) for dashboard features
- Neo4j knowledge graph populated from both structured database records and LLM-extracted entities from HTML content
- LangGraph agent backed by an OpenAI LLM
- GeoJSON/tile map layer served from public/ for spatial data about the reserve
- eBird API integration for bird observation data ingestion

![[team#Contacting The Team]]

## Initial Project Proposal
The original project proposal can be found [here](https://www.cs.unc.edu/~stotts/COMP523-s26/cliProps-s2026.html ) at **#6**. The provided specifications document is below.
![[Proposal Project Specs.pdf]]