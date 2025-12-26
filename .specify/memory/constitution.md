# Phase II: Full-Stack Web Evolution Todo App Constitution
<!-- SYNC IMPACT REPORT
Version change: 1.1.0 → 2.0.0
Added sections: Architectural Layering, Detailed JWT Protocol, PHR Schema & Metadata, Standardized API Envelopes, User Isolation (ISOLATION INVARIANT), Monorepo CLI Conventions, Compliance Gates
Modified sections: II. Monorepo Architecture, IV. Security-First Approach, V. API Design & Data Contracts, Data Isolation Law
Removed sections: None
Templates requiring updates:
  - .specify/templates/plan-template.md ✅ reviewed
  - .specify/templates/spec-template.md ✅ reviewed
  - .specify/templates/tasks-template.md ✅ reviewed
  - .claude/commands/sp.constitution.md ✅ reviewed
Follow-up TODOs: None
-->

## Core Principles

### I. Spec-Driven Development (SDD)
All development must follow Spec-Driven Development methodology; No manual code edits allowed without corresponding spec updates in /specs/ first; Strict workflow: /sp.specify → /sp.plan → /sp.tasks → /sp.implement

### II. Monorepo Architecture
Project structure follows monorepo pattern with /frontend (Next.js 16+, TS, Tailwind), /backend (FastAPI, Python 3.13+, SQLModel), /specs organized by features/api/database/ui; Layered CLAUDE.md files for localized coding patterns. The root 'CLAUDE.md' provides project-wide instructions and coordinates with '@frontend/CLAUDE.md' and '@backend/CLAUDE.md' which contain technology-specific guidelines. Each CLAUDE.md file operates at its respective layer: root for overall project orchestration, frontend for client-side patterns, and backend for server-side architecture.

### III. Tech Stack & Persistence Standards
Backend ORM: SQLModel for all schema definitions and queries; Database: Neon Serverless PostgreSQL for production-grade persistence; Deployment: Dockerized environment using docker-compose.yml for local orchestration

### IV. Security-First Approach
All endpoints must implement proper authentication and authorization; User data isolation required (endpoints prefixed with /api/{user_id}/); Secure session management using Better Auth; Input validation and sanitization mandatory. THE JWT HANDSHAKE: The Better Auth JWT Plugin protocol requires that the Frontend MUST extract the JWT token from the authentication response and include it in the 'Authorization: Bearer {token}' header for all authenticated requests. The Backend MUST verify the JWT token using a shared secret environment variable (AUTH_SECRET) and reject any requests with invalid or missing tokens.

DETAILED JWT PROTOCOL:
- JWT Header Format: 'Authorization: Bearer <jwt_token>'
- Token Refresh Strategy: Implement automatic token refresh 5 minutes before expiration using refresh tokens
- Error Handling:
  - '401 Unauthorized': Invalid or expired token, requires re-authentication
  - '403 Forbidden': Valid token but insufficient permissions or data isolation breach
- Backend middleware MUST validate token signature, expiration, and user permissions before processing requests

### V. API Design & Data Contracts
All endpoints must be prefixed with /api/{user_id}/; Required operations: CRUD (GET, POST, GET {id}, PUT, DELETE) and PATCH for completion status; Return standardized JSON responses using Pydantic schemas; Auto-generated OpenAPI docs via FastAPI

STANDARDIZED API ENVELOPES: ALL API responses MUST follow these exact JSON structures:

Success Response Format:
```
{
  "status": "success",
  "data": {},
  "meta": {
    "timestamp": "ISO_8601_timestamp",
    "request_id": "unique_request_identifier"
  }
}
```

Error Response Format:
```
{
  "status": "error",
  "error": {
    "code": "ERROR_CODE_STRING",
    "message": "human_readable_error_message",
    "details": []
  },
  "meta": {
    "timestamp": "ISO_8601_timestamp",
    "request_id": "unique_request_identifier"
  }
}
```

### VI. Enhanced Requirements & Quality
User interface must be responsive and accessible; Complete authentication UI with Signup/Signin flows using Better Auth components/client; Global exception handlers in FastAPI (HTTP 401 for Auth, 404 for missing tasks); Error handling with graceful degradation

## Security Requirements

Authentication required for all endpoints; User data isolation by user_id; Session management with secure cookies; Rate limiting to prevent abuse; Input validation and sanitization; SQL injection prevention via ORM; XSS protection with proper headers

## PHR (Prompt History Record) Architecture

All Prompt History Records must follow strict directory routing: history/prompts/constitution/ for constitution-related prompts, history/prompts/<feature-name>/ for feature-specific prompts, and history/prompts/general/ for general prompts. This ensures proper organization and traceability of all development decisions and changes.

PHR SCHEMA & METADATA: Every PHR file MUST include exact YAML frontmatter with these required fields:
```
---
id: <sequential_number>
title: <descriptive_title>
stage: <stage_type>
date: <YYYY-MM-DD>
surface: agent
model: <model_name>
feature: <feature_name_or_none>
branch: <current_branch>
user: <username>
command: <command_used>
labels: [<comma_separated_labels>]
links:
  spec: <url_or_null>
  ticket: <url_or_null>
  adr: <url_or_null>
  pr: <url_or_null>
files:
 - <list_of_modified_files>
tests:
 - <list_of_tests_run_or_none>
---
```

## Data Isolation Law

DATA ISOLATION LAW: Any SQLModel query missing a '.where(TableName.user_id == authenticated_user_id)' filter is a critical security failure. All database queries that access user-specific data MUST include proper user_id filtering to prevent unauthorized data access between users. This applies to SELECT, UPDATE, and DELETE operations on any table containing user-specific information.

USER ISOLATION (THE 'ISOLATION INVARIANT'):
- SQLModel models MUST use a 'UserMixin' class or explicit 'user_id: uuid.UUID' field on every table that stores user-specific data
- The 'user_id' field MUST be globally unique (UUID format) and indexed for performance
- All SQLModel tables containing user-specific data MUST inherit from UserMixin or explicitly declare user_id field
- Foreign key relationships to user_id MUST maintain referential integrity
```
class UserMixin(SQLModel):
    user_id: uuid.UUID = Field(default_factory=uuid.uuid4, nullable=False, description="Globally unique user identifier")
```

## Clean Architecture & Tech Clarifications

CLEAN ARCHITECTURE: The Backend MUST use a 'Service Pattern' (e.g., crud.py, services/*.py) to separate API routes from Database logic. API endpoints should not contain direct database operations; all database interactions must be encapsulated in service layer functions.

DRIZZLE CLARIFICATION: If Drizzle ORM is used, it is ONLY for the Frontend/TypeScript layers and MUST NOT be used in Python backend code. SQLModel remains the exclusive ORM for Python-based backend services and database operations.

## Architectural Layering

ARCHITECTURAL LAYERING: The application follows a strict three-layer architecture with defined interactions:
- Root Layer: Project orchestration, shared configurations, and cross-cutting concerns
- Frontend Layer: Presentation logic, UI components, and client-side state management
- Backend Layer: Business logic, data access, and API services

The Backend MUST implement the Controller-Service-Repository pattern:
- Controllers: Handle HTTP requests/responses, input validation, and authentication checks
- Services: Implement business logic and coordinate between multiple repositories
- Repositories: Handle direct database operations and data persistence

## Monorepo CLI Conventions

MONOREPO CLI CONVENTIONS: Package manager usage MUST follow these strict rules:
- Backend folder (/backend): Use 'uv' as the exclusive package manager for Python dependencies
- Frontend folder (/frontend): Use 'pnpm' as the preferred package manager for JavaScript/TypeScript dependencies
- Root folder: Use appropriate package manager for root-level operations only
- Forbid mixing package managers within the same project layer (no npm in backend, no uv in frontend)
- All developers MUST use the same package manager per layer to ensure consistency
- Lock files (.lock) MUST be committed to version control for reproducible builds

## Development Workflow

Strict SDD methodology: specs first, then plan, tasks, implementation; Code reviews required for all changes; Automated testing at unit/integration levels; Continuous integration with automated checks; Branch naming conventions following feature/bugfix/hotfix prefixes

## Compliance Gates

COMPLIANCE GATES: A 'Definition of Done' (DoD) MUST be satisfied for every task before completion:
- Spec match: Implementation must fully satisfy the feature specification requirements
- Test coverage: Code coverage MUST exceed 80% for all new/modified code
- PHR created: Prompt History Record MUST be created for all significant changes
- No linting errors: All code must pass linting and formatting checks with no errors
- Security validation: All user data access must follow isolation requirements
- Performance validation: API endpoints must respond within 500ms p95 latency

## Governance

Constitution supersedes all other practices; Amendments require documentation and approval; All PRs must verify compliance with these principles; Version control with semantic versioning; Regular compliance reviews scheduled quarterly

**Version**: 2.0.0 | **Ratified**: 2025-12-18 | **Last Amended**: 2025-12-18
