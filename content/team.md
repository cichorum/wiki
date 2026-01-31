---
created: 2026-01-29T19:12:28-05:00
modified: 2026-01-30T22:04:07-05:00
title: Meet The Team
---

<!--
HTML Team Grid Implemented Via:
  - Typescript Component: quartz/components/TeamMembersGrid.tsx
  - Import/Export: quartz/components/index.ts
  - ConditionalRender of Component.TeamMembersGrid: ~/quartz.layout.ts
-->
## Contacting The Team
> Apologies for the delay, we are currently in the process of getting a shared mailbox for the team. We will include the email here once we have it.

## The Client
**Name:** John B. Smith (UNC Computer Science, Professor Emeritus)
**Email:** jbs@cs.unc.edu
**Link:** [https://chicorylane.com/](https://chicorylane.com/)

## Team Rules
### Team Behaviors
- Members should communicate or notify each other of tardiness to, or absence from, meetings via text or the development discord
- Members should respond to emails within **48** hours, and any text-based communication within **12-24** hours, but sooner if possible
	- **No response** within this time will be viewed as an **abandonment** of assigned/relevant responsibilities, and will be arbitrated as such
- Timelines and completion feasibility will be reconsidered on a **weekly basis** to assure adherence to the project completion date
- For major technical decisions, if the **Technical Architect** is unavailable, the **Lead Developer** will take point
- For major feature & client decisions, if the **Product Manager** is unavailable, the  will take point.

### Coding Practices
- Members should do their best to write **inline documentation** in the form of comments when writing code, and should feel free to write separate markdown documents (and include them in the wiki/website) to explain design or system choices/considerations.
- When the stack is decided, formatting rules will be fully defined, along with tools to ensure that formatting.
	- This will be done with [pre-commit](https://pre-commit.com/) checks.
### Git Practices
- Branches should attempt to succinctly describe the purpose of the branch and the additions precent within it's commits.
	- Members should feel free to add prefixes such as `feat/` for features or `fix/` for bug fixes when appropriate for organizational purposes.
- Commits should be made as often as appropriate or necessary, especially whenever functionality changes, to ensure multiple easily accessible and revertible checkpoints.
- Branches cannot be merged into the `main` branch without review from at least one other team member. 
	- This will be enforced through branch protection rules on GitHub.
- CI/CD pipelines will ensure functionality of software as changes are made through a testing suite.
	- Failure to pass the checks administered by these pipelines will prevent merges from branches into main.