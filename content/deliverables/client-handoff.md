---
created: 2026-05-01T23:53:45-04:00
modified: 2026-05-01T23:54:55-04:00
title: Client Hand-off Document
---
# Client Hand-off Document

Note: This document explains how we will deliver a working system into a client-controlled environment and ensure the client can keep it running.

## 1) What the System is

- A server-rendered web application built with Laravel (PHP), Blade templates, and HTMX.
- Data stored in MySQL.
- Deployed as a web app on a VPS via Coolify.

The client will own the infrastructure and the deployment configuration on their VPS.

## 2) Where it Will Live and Who Owns it

- Hosting: Client-controlled VPS (LXC container) already provisioned.
- Deployment platform: Coolify, running on that VPS.
- Ownership: Client owns the VPS, Coolify instance, and the deployed app.

## 3) Delivery Path (the Plan We Will execute)

1. Finish uploading the full codebase and confirm a clean deploy in Coolify.
2. Verify the application is reachable via the client’s domain or VPS URL.
3. Confirm database migrations, seed data, and environment variables are correct.
4. Provide the client with:
   - Coolify access and a walkthrough of the project settings
   - Basic maintenance steps (redeploys, updates, backups)
5. Schedule a final hand-off session with the client to validate everything together.

## 4) Client Setup Steps (non-technical friendly)

These are the steps the client can follow to get the system running in their environment:

1. Access the VPS and the Coolify dashboard using the proper credentials.
2. Open the project in Coolify and confirm:
   - The repository is connected
   - The build/deploy pipeline is green
   - Environment variables are set
3. Trigger a redeploy in Coolify to confirm it is working end-to-end.
4. Open the live URL and verify:
   - Home page loads
   - Login works
   - Dashboard loads

If any step fails, contact John at Centre of the Web.

## 5) How the Client Can Update the Main Codebase

- Primary path: make updates to the uploaded project or a connected repository.
- Then, in Coolify:
  - Open the project
  - Click redeploy (or wait for auto-deploy if enabled)

If the client does not want to use Git directly, we can set up a personal development environment.

## 6) How to Access Coolify

- Coolify is accessible on the client’s VPS.
- The client will be able to access the dashboard on the web, requiring a login.

## 7) Ongoing Costs

Expected ongoing costs are typical for a VPS-hosted Laravel app:

- VPS hosting (monthly)
- Domain name renewal (annual)
- Chatbot API key

The client has already been using this VPS and domain for a long time and the only new costs are found in the chatbot.

## 8) Risks and Open Items to Discuss with the Client

- Confirm who is responsible for system backups and how often they run.
- Confirm whether the client wants staging + production environments.

We should discuss these items with the client before final delivery.

## 9) Hand-off Appointment

We will schedule a final hand-off session with the client to:

- Walk through the Coolify dashboard
- Trigger a deploy together
- Confirm the client can access the app and data

This ensures the client leaves with a fully working system they control.