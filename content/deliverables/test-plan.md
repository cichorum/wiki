---
created: 2026-04-12T19:45:09-04:00
modified: 2026-04-13T17:02:12-04:00
title: Testing Plan
---
## Overview
### User Groups
- **Visitor:** A public-facing user with no login who views mission information, events, educational materials, and general site content.
- **Ecologist / Conservation Professional:** A user focused on locating research documents, database-backed content, downloadable files, and chatbot responses grounded in site and reserve information.
- **Website Administrator:** An authenticated user responsible for maintaining pages, managing documents, checking chatbot configuration, and preserving long-term maintainability.
### Acceptance Testing
Formal acceptance testing would be performed by representatives of all the [[#User Groups|main end-user categories]].

- Who would test
	- 2–3 public-facing users acting as Visitors
	- 2 ecologists or conservation-oriented users
	- 1 client representative
	- 1–2 project team members acting as administrators
	- instructor or external evaluator, if applicable
- When they would test
	- after feature-complete milestone
	- after bug-fix/regression cycle
	- once again on the final release candidate deployed in a production-like environment
- What they would validate
	- preserved website functionality
	- improved organization and visibility of information
	- successful document download workflows
	- correct chatbot identity and context restriction
	- correct access to site/database content
	- maintainability of admin features
	- correctness of citations and exported conversation
### Ideal Testing Environments
The system would ideally be tested in three environments:
- **Local development:** Used by individual developers for unit and early integration testing.
- **Shared staging:** A production-like environment with seeded data, realistic configuration, and external-service test keys.
- **Production-like Acceptance Environment:** A stable deployment that mirrors the client’s Apache-based hosting arrangement as closely as possible. The platform selection document indicates the intended deployment model is Apache hosting with Laravel, plus a Python microservice, MySQL, and Neo4j.
## Part 1: Ideal Test Plan (Unlimited Time/Resources)
If time and resources were unlimited, the team would perform comprehensive automated and manual testing across all layers of the system, including repeated regression cycles throughout development and before deployment, primarily implementing the following comprehensive testing strategy to ensure maximum reliability and scalability.
### 1. Unit Testing
Our Unit testing would be heavily automated and run continuously during development. The goal would be near-complete coverage of business logic and high coverage of controllers, services, and retrieval logic.

- **100% Code Coverage**: Every method in our App Controllers, Models, and core business logic would have associated unit tests. This includes the core website/laravel backend, the python AI/RAG microservice, and all related database logic.
	- Website/Laravel Backend
		- route authorization logic
		- authentication and session behavior
		- page rendering logic
		- document metadata handling
		- download permission rules
		- admin content update logic
		- connector and adapter configuration logic
		- indexing trigger logic
		- export generation logic for chatbot conversations
		- validation rules for all forms and API inputs
	- Python AI & RAG
		- prompt construction for Cichorum identity
		- retrieval pipeline behavior
		- context filtering to ensure chatbot stays within website/domain scope
		- citation/reference formatting
		- conversation session persistence rules
		- graph/vector query orchestration
		- export formatting
		- error handling for LLM provider failures, missing documents, bad embeddings, or empty retrieval results
	- Database-Related Logic
		- CRUD operations for content
		- Database Adapters
		- Repository Methods
		- Graph lookup utilities
		- relational/graph synchronization points
		- handling of null, missing, duplicate, and malformed data
- **Edge Case Analysis**: Exhaustive testing of boundary conditions for all input validation in all methods.
- **Mocking**: Complete isolation of database and external services using [Mockery](https://github.com/mockery/mockery) to test business logic in purity.

### 2. Integration & System Testing
- **Full Integration Testing:** Verifying that components work together correctly. Integration tests would use realistic seeded data that includes public pages, ecological records, uploaded files, events, admin accounts, and chatbot conversations. Including, but not limited to:
	- Laravel routes correctly calling database services
	- Laravel correctly calling the Python microservice over internal HTTP
	- chatbot retrieval successfully combining website content and database content
	- authentication protecting admin-only features
	- conversation export generating the correct downloadable file
	- uploads triggering indexing or re-indexing
	- connector/adapter settings affecting retrieval as expected
	- citations matching the retrieved documents
	- failed external API calls being handled gracefully
- **End-to-End (E2E) Flows**: System testing would validate full end-to-end behavior through the browser. We would do automated flows using [Laravel Dusk](https://laravel.com/docs/13.x/dusk) or [Cypress](https://www.cypress.io/), covering:
	- a Visitor loads the home page, finds mission/programs/events, and opens educational materials
	- an Ecologist searches for a document, downloads it, and asks the chatbot a question about that content
	- an Administrator logs in, uploads new content, triggers indexing, and verifies it appears in chatbot retrieval
	- a user starts a chatbot session, asks several questions, receives grounded answers with citations, and exports the conversation as PDF
	- a user attempts an invalid action and receives a safe, helpful error message instead of a crash
- **Error and Edge-Case Testing**: Ideal testing would include extensive negative and edge-case coverage.
	- missing file in database but visible in UI
	- broken database connection
	- Neo4j unavailable while MySQL remains available
	- LLM API timeout
	- malformed uploaded document
	- empty search results
	- duplicate ecological records
	- invalid login
	- expired session
	- unauthorized admin route access
	- extremely large conversation export
	- unsupported export format request
	- chatbot asked questions outside Chicory Lane context
	- document citation source deleted after indexing
- Database persistence checks for all migration-defined tables.
- **API Testing**: Automated contract testing for all defined routes.
  
### 3. Performance & Reliability
- **Load Testing**: Using [JMeter](https://jmeter.apache.org/) or [k6](https://k6.io/) to simulate 1,000+ concurrent users to identify bottlenecks in the backend stack, anywhere from content serving, to database/graph database queries. This would include:
	- chatbot response latency under low, medium, and peak load
	- concurrent document downloads
	- concurrent user sessions
	- long-running chatbot conversations
	- repeated export generation
	- indexing jobs on large document batches
	- recovery from temporary network or provider outages
	- restart/recovery testing for Apache, Laravel app, and Python microservice
	- memory and CPU monitoring under sustained use
- **Stress Testing**: Determining the breaking point of the system under extreme data loads.
- **Reliability**: Long-running soak tests to identify memory leaks in the core Laravel application.

### 4. Acceptance & Specialized Testing
- **User Acceptance Testing (UAT)**: A beta period with domain experts to validate that the taxon and observation data models meet scientific requirements.
- **Cross-Browser/Device Testing**: Automated testing across Chrome, Firefox, Safari, and mobile viewports.
- **Security Audit**: Professional penetration testing and automated vulnerability scanning for the [OWASP Top 10](https://owasp.org/Top10/2025/).

---

## Part 2: Concrete Execution Plan (The Guide)
**For this project, we will prioritize automated unit testing at the service and logic level, plus focused integration and end-to-end system testing for the most important user-facing workflows.**

This section defines exactly what is tested and how to verify it. Our main priorities include:
1. authentication and protected admin access
2. rendering of major public-facing pages
3. document download flow
4. chatbot session storage
5. chatbot access to website/database-backed content
6. chatbot identity and prompt behavior for Cichorum
7. conversation export to PDF
8. admin upload/update workflow
9. retrieval pipeline integration between web app, databases, and AI service
10. error handling for common failures
> Voice interaction and AI image-reading features will not be tested because those are currently improbable and not part of committed scope.

### 1. Test Environment & Specifications
Tests must be executed in the following environment to ensure consistency:
- **OS**: macOS (Darwin) or Linux (Ubuntu 22.04 LTS).
- **PHP**: v8.2+
- **Database**: MySQL 8.0+ (Relational), Neo4j 5.x (Graph).
- **Framework**: Laravel 11.x
- **Tooling**: PHPUnit 10+


#### Developer Local Environment
Used for unit tests and early integration checks.
- macOS 15.x or Ubuntu 24.04 LTS
- Apache 2.4.x or Laravel local server during development
- PHP 8.3.x
- Laravel 12.x
- PHPUnit 11.x
- Python 3.12.x
- pytest 8.x
- MySQL 8.0.x
- Neo4j 5.x
- Composer 2.x
- Chrome stable
- Firefox stable
#### Shared Staging / Demo Environment
Used for integration, system, and acceptance-style testing.
- Linux server
- Apache HTTP Server 2.4.x
- PHP 8.3.x
- Laravel 12.x
- Python 3.12.x
- MySQL 8.0.x
- Neo4j 5.x
- Chrome stable
- Firefox stable
- Safari stable for one final browser pass on macOS
### 2. Automated Unit & Feature Tests
Automated tests are located in the `/tests` directory.
#### Laravel / PHP - Automated Unit Tests
Tool: PHPUnit   
- authentication helper logic
- access control checks for admin-only routes
- document service methods
- export request validation
- page/content retrieval service methods
- upload validation logic
- database repository methods for content and metadata
- route/controller logic where unit-level isolation is reasonable
#### Python Microservice - Automated Unit Tests
Tool: pytest  
What will be tested:
- Cichorum prompt builder
- conversation session storage behavior
- retrieval query construction
- citation formatting
- context filter that prevents answers outside Chicory Lane data
- export formatting helpers
- error handling for empty retrieval, bad provider responses, and missing documents
#### Integration and System Tests
Tools: PHPUnit integration tests, pytest integration tests, seeded databases
We will test:
- Laravel calling the Python microservice successfully
- chatbot retrieval from both website content and Chicory Lane databases
- admin upload/update triggering expected downstream behavior
- document metadata and download link consistency
- conversation export flow from stored messages to produced file
- login/session behavior across protected routes
### Manual System Testing
The following manual tests are required:
- **Scenario A: Visitor information access**
	- Open the home page
	- Verify mission, programs, events, and resources are visible
	- Navigate to at least two informational pages
	- Confirm layout and links function correctly
	- Expected result: content is visible, understandable, and reachable without errors
- **Scenario B: Ecologist document workflow**
	- Locate a document or resource
	- Open or download the file
	- Ask the chatbot a question related to the document
	- Verify the answer references site/database-backed information
	- Expected result: the document is downloadable and chatbot answer is grounded in available content
- **Scenario C: Chatbot session and export**
	- Start one chatbot session
	- Ask multiple related questions
	- Verify messages remain in one session
	- Export the conversation as PDF
	- Open the exported file
	- Expected result: the full conversation is preserved and exported correctly
- **Scenario D: Administrator workflow**
	- Log in with admin account
	- Access protected area
	- upload or update a resource
	- verify the item appears in the correct administrative view
	- if indexing is available, trigger it and verify success response
	- Expected result: admin actions succeed and the system remains stable
- **Scenario E: Unauthorized access**
	- Attempt to access admin route without login
	- Attempt invalid login
	- Expected result: access denied appropriately and no sensitive data is shown
#### Manual Test Oracles
For each manual test, the following will be documented:
- input data used
- account used
- page or endpoint tested
- expected output
- actual output
- pass/fail result

Examples of manual test data:
- valid admin credentials
- invalid credentials
- sample public-facing documents
- sample ecological database entries
- chatbot questions about mission, events, documents, and reserve data
- malformed upload file
- missing or removed download target
## Conclusion
### Who Will Test, and When
- **During development**
	- *Team:* run PHPUnit and pytest suites whenever code is added or changed
	- *Team:* perform manual checks on the feature they implemented before merging
- **Before feature freeze**
	- *Team:* execute integration and system test scenarios A–E
	- At least one teammate not responsible for the feature: rerun the scenario
- **Before final submission/demo**
	- *Team:* Since outside testers are unavailable, team members will test as our user types, but the roles and dates will still be documented.

### Tools Used
The following tools will be used in the actual test plan:
- PHPUnit for automated PHP/Laravel unit and integration testing
- pytest for automated Python microservice testing
- Seeded MySQL and Neo4j test data for realistic integration checks
- Browser-based manual testing in Chrome, Firefox, and Safari
- Optional Laravel Dusk for browser automation if time permits
- Git-based regression workflow so tests stay with the source code
- PDF viewer for export verification


### Test Deliverables
To make the tests runnable by another engineer or instructor, we will include:
- PHPUnit test files in the Laravel project
- pytest test files in the Python microservice
- setup instructions for test databases
- seed data or fixtures
- list of required environment variables
- commands to run all automated tests
- manual test cases with expected results
- any sample upload files or example chatbot prompts used during testing