---
title: Documentation Plan
---
## Users & Needs

### Public visitor (low–medium) 

These users need to understand the purpose of the site, be able to move through the interface easily, and use the map feature. Since public visitors are likely just browsing, they will primarily need simple guidance rather than long written instructions.

### Signed-in user (medium)

These users will need help understanding account basics like account creation and login, as well as understanding how to use the dashboard and view data. They will need a short user guide and in-app help on important pages.

### In-app admin (medium–high) 

These users need to manage data, understand permissions and roles, and follow the correct conventions. Since they are working directly with system data, they need more detailed documentation with workflow-based instructions. 

### System admin (high) 

These users are responsible for deploying, configuring, and maintaining the system. They need in-depth documentation on setup, services, Docker requirements, troubleshooting, security, and admin account setup. 

### Engineer (high)

These users need to understand the codebase, system architecture, and how to extend the software. They need technical documentation explaining Laravel and HTMX patterns, and how to extend routes, features, and tests. 

---
## Documentation Set

### User Guide

The User Guide will be for public visitors and signed-in users. It will include a site overview, navigation help, map usage, account flows like login and account creation, and a dashboard overview. It will be short and task-focused so users can efficiently find what they need. This will present all essential information clearly and concisely.

### Admin Guide

The Admin Guide will be for in-app admins. It will cover roles and permissions, record creation and management, data conventions, and common errors with fixes. This will include more detailed guidance than the User Guide, considering admins will perform higher-stakes actions regarding the site.

### System Admin Guide

The System Admin Guide will be for system admins. It will explain system requirements, Docker, services, setup and deployment, maintenance details, and admin account setup. Its depth will be another step up from the Admin Guide, as system admins are responsible for more.

### Technical Guide

The Technical Guide will be for engineers and future developers. It will describe the architecture of the application, in particular Laravel and HTMX patterns, code structure, and details on extending the system through new routes, features, and tests. This will be the most in-depth and specific guide, as engineers will require extensive detail on the codebase.

### Agent Guide

The Agent Guide will be for engineers and future developers. It will describe how agent behavior fits into the system, how agent-specific conventions and dependencies are organized, and how to safely maintain and extend that area of the project. This guide will serve as a focused technical reference for agents in use without overloading the broader Technical Guide.

---
## Delivery Methods

### Primary: In-repo Markdown

Our main documentation will be stored in the repository as Markdown files, including the README and separate guides for users, admins, and engineers. This will keep the documentation version-controlled and easy to update alongside the project.

### Secondary: In-app help

We will also include help directly in the application in the form of tooltips, form hints, short explanations on pages, and clear validation or error messages. This is especially useful for public and signed-in users.

### Other methods

If needed, we may include the following resources for whatever users may need:

- A troubleshooting/FAQ page
- Example configuration files (e.g., .env)

---
## Why This is Appropriate

This documentation plan is designed around the fact that different users have varying needs. Public users need quick and simple help, while admins and engineers need more detailed guides on their specific responsibilities. By splitting the documentation into role-based sections and combining repo documentation with in-app help, the final documentation system will give each user an adequate level of support without forcing the same manual on all users.