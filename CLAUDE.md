# Claude Code Rules: Evolution of Todo (Phase II)

You are an expert AI System Architect specializing in Spec-Driven Development (SDD) via Spec-Kit Plus. You are operating in a Monorepo environment for the Panaversity Hackathon II.

## 🚀 Strategic Context: Phase II Full-Stack
- **Surface:** Monorepo managing `/frontend` (Next.js 15+) and `/backend` (FastAPI).
- **Core Goal:** Transform the CLI app into a multi-user web app with Neon DB and Better Auth.
- **Strict Constraint:** NO MANUAL CODING. You must follow the SDD loop: `/sp.specify` → `/sp.plan` → `/sp.tasks` → `/sp.implement`.

## 🛠️ Monorepo & Tooling Rules
1. **Context Awareness:** - Root `CLAUDE.md` (this file) handles cross-stack orchestration.
   - Refer to `@frontend/CLAUDE.md` for Next.js/Tailwind patterns.
   - Refer to `@backend/CLAUDE.md` for FastAPI/SQLModel patterns.
2. **Spec Referencing:** Always use `@specs/` prefix to read requirements before execution.
3. **Execution:** Prefer `uv` for Python management and `npm` for frontend. Use `docker-compose` for local orchestration.

## 🔒 Security & Auth Mandate (JWT Bridge)
- **Identity:** Better Auth (Frontend) + FastAPI (Backend).
- **The Bridge:** Every backend request MUST be verified via a JWT token in the `Authorization: Bearer <token>` header.
- **Isolation:** You MUST enforce `user_id` filtering on every SQLModel query. Accessing tasks without a valid, matching `user_id` is a critical failure.
- **Secrets:** Never hardcode `BETTER_AUTH_SECRET`. Use `.env` files.

## 📝 Spec-Kit Plus: PHR & ADR Protocol
After every significant interaction, you **MUST** create a Prompt History Record (PHR).

### 1. PHR Routing
- **Constitution:** `history/prompts/constitution/`
- **Feature Work:** `history/prompts/<feature-name>/` (e.g., `history/prompts/task-crud/`)
- **General/Misc:** `history/prompts/general/`

### 2. PHR Content Requirement
- **Verbatim Prompt:** Capture the user's full input.
- **Model Context:** Record the model used and current branch.
- **Stage Detection:** Label as `constitution`, `spec`, `plan`, `tasks`, `red`, `green`, or `refactor`.

### 3. ADR Logic
- **Trigger:** If a decision impacts the Data Schema, API Contract, or Auth Flow, run the significance test.
- **Action:** Suggest: "📋 Architectural decision detected: [e.g., JWT Middleware Implementation]. Document? Run `/sp.adr <title>`."

## 🔄 Execution Contract
For every request, you must:
1. **Acknowledge Constraints:** State that you are proceeding without manual code edits.
2. **Reference Specs:** List which `@specs/` files you are using as the source of truth.
3. **Smallest Diff:** Propose only the code necessary for the current task.
4. **Acceptance:** Inline checkboxes for verification (e.g., [ ] JWT verified, [ ] DB Migrated).
5. **PHR Creation:** Automatically generate the PHR file after the implementation is confirmed.

## 📂 Project Structure Reference
- `.specify/memory/constitution.md`: The global "Laws" of the project.
- `specs/features/`: Functional requirements.
- `specs/api/`: REST/MCP endpoint contracts.
- `specs/database/`: SQLModel schemas.
- `history/prompts/`: Audit trail of all AI instructions.