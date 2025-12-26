# Phase II: Full-Stack Todo Application

This is a multi-user web application built as part of the Panaversity Hackathon II. It transforms a CLI app into a modern, full-stack web application with authentication and real-time task management.

## 🏗️ Architecture

The application follows a modern full-stack architecture:

- **Frontend**: Next.js 15+ with App Router, TypeScript, and Tailwind CSS
- **Backend**: FastAPI with Python 3.13+ and SQLModel for database operations
- **Database**: Neon Serverless PostgreSQL for production-grade persistence
- **Authentication**: Better Auth with JWT plugin for secure user management
- **Deployment**: Dockerized environment using docker-compose for local development

## 🛠️ Tech Stack

### Frontend Technologies
- **Next.js 15+**: React framework with App Router for modern web development
- **TypeScript**: Type-safe JavaScript for improved development experience
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Better Auth**: Modern authentication solution with JWT support
- **Axios**: HTTP client for API communication with standardized envelope support

### Backend Technologies
- **FastAPI**: High-performance Python web framework with automatic API documentation
- **SQLModel**: SQL database modeling and querying with SQLAlchemy and Pydantic
- **Pydantic**: Data validation and settings management using Python type hints
- **Neon**: Serverless PostgreSQL for scalable database operations

## 🔄 Spec-Driven Development (SDD) Workflow

This project follows the Spec-Driven Development methodology:

1. **Specification**: Requirements are defined in `/specs/` directory
2. **Planning**: Architecture and implementation plans are generated using `/sp.plan`
3. **Task Generation**: Actionable tasks are created using `/sp.tasks`
4. **Implementation**: Features are implemented following `/sp.implement`
5. **Documentation**: All changes are recorded as Prompt History Records (PHRs)

The workflow ensures that all development is driven by specifications and follows a consistent, traceable process.

## 📁 Project Structure

```
├── .claude/                 # Claude Code configuration and commands
│   ├── commands/            # Custom Claude commands
│   └── settings.local.json  # Local Claude settings
├── .specify/                # Spec-Kit Plus framework configuration
│   ├── memory/              # Project memory and constitution
│   ├── scripts/             # Automation scripts
│   └── templates/           # SDD templates
├── .git/                    # Git repository metadata
├── backend/                 # FastAPI backend application
│   ├── src/                 # Backend source code
│   │   ├── __init__.py      # Package initialization
│   │   ├── auth.py          # Authentication implementation
│   │   ├── database.py      # Database connection and setup
│   │   ├── models.py        # SQLModel database models
│   │   └── tasks.py         # Task management endpoints
│   ├── .env                 # Environment variables
│   ├── .gitignore           # Git ignore rules
│   ├── docker-compose.yml   # Docker orchestration
│   ├── Dockerfile           # Backend Docker configuration
│   ├── init_db.py           # Database initialization script
│   ├── main.py              # Main FastAPI application
│   ├── pyproject.toml       # Python project configuration
│   ├── requirements.txt     # Python dependencies
│   ├── test_db_connection.py # Database connection tests
│   └── uv.lock              # Dependency lock file
├── frontend/                # Next.js 15+ frontend application
│   ├── src/                 # Frontend source code
│   │   ├── app/             # App Router pages and layouts
│   │   │   ├── (auth)/      # Authentication route group
│   │   │   │   ├── layout.tsx # Auth layout wrapper
│   │   │   │   ├── signin/  # Sign in page
│   │   │   │   │   └── page.tsx
│   │   │   │   └── signup/  # Sign up page
│   │   │   │       └── page.tsx
│   │   │   ├── dashboard/   # Dashboard route
│   │   │   │   ├── layout.tsx # Dashboard layout
│   │   │   │   └── page.tsx # Dashboard page
│   │   │   ├── layout.tsx   # Root layout
│   │   │   └── page.tsx     # Home page
│   │   ├── components/      # Reusable UI components
│   │   │   ├── dashboard/   # Dashboard-specific components
│   │   │   │   ├── Sidebar.tsx
│   │   │   │   ├── StatsCards.tsx
│   │   │   │   └── Charts.tsx
│   │   │   ├── tasks/       # Task management components
│   │   │   │   ├── TaskFilters.tsx
│   │   │   │   ├── AddTaskForm.tsx
│   │   │   │   ├── TaskCard.tsx
│   │   │   │   └── TaskCard.test.tsx
│   │   │   └── ui/          # UI primitive components
│   │   │       └── skeleton.tsx
│   │   ├── hooks/           # Custom React hooks
│   │   │   ├── useApi.tsx   # API hook
│   │   │   ├── useToast.tsx # Toast notification hook
│   │   │   ├── useTasks.tsx # Task management hook
│   │   │   └── useAuth.tsx  # Authentication hook
│   │   ├── services/        # API clients and business logic
│   │   │   ├── tasks.ts     # Task API service
│   │   │   ├── auth.ts      # Authentication API service
│   │   │   ├── taskService.test.ts # Task service tests
│   │   │   └── taskService.ts # Task service implementation
│   │   ├── types/           # TypeScript type definitions
│   │   │   ├── api.ts       # API type definitions
│   │   │   ├── auth.ts      # Authentication types
│   │   │   └── tasks.ts     # Task type definitions
│   │   ├── styles/          # CSS styles
│   │   ├── lib/             # Utility libraries
│   │   └── middleware.ts    # Next.js middleware
│   ├── public/              # Static assets
│   ├── .env.local           # Local environment variables
│   ├── .next/               # Next.js build output (gitignored)
│   ├── eslint.config.js     # ESLint configuration
│   ├── jest.config.js       # Jest testing configuration
│   ├── next.config.js       # Next.js configuration
│   ├── package.json         # Frontend dependencies and scripts
│   ├── pnpm-lock.yaml       # Dependency lock file
│   ├── postcss.config.js    # PostCSS configuration
│   ├── tailwind.config.js   # Tailwind CSS configuration
│   └── tsconfig.json        # TypeScript configuration
├── specs/                   # Feature specifications and requirements
│   ├── 001-frontend-core/   # Initial frontend core specs
│   │   └── spec.md
│   ├── 002-frontend-core/   # Updated frontend core specs
│   │   ├── spec.md
│   │   ├── checklists/requirements.md
│   │   ├── data-model.md
│   │   ├── contracts/api-contracts.md
│   │   ├── quickstart.md
│   │   ├── tasks.md
│   │   ├── plan.md
│   │   └── research.md
│   ├── api/                 # API specifications
│   │   ├── backend-core.md
│   │   ├── backend-core/
│   │   │   ├── plan.md
│   │   │   ├── research.md
│   │   │   ├── data-model.md
│   │   │   ├── contracts/tasks-api.yaml
│   │   │   ├── quickstart.md
│   │   │   └── tasks.md
│   │   └── checklists/requirements.md
│   └── ui/                  # UI specifications
│       ├── frontend-core.md
│       └── checklists/requirements.md
├── history/                 # Prompt History Records (PHRs)
│   └── prompts/             # Development audit trail
│       ├── constitution/    # Project constitution PHRs
│       │   ├── 1-establish-project-constitution.constitution.prompt.md
│       │   ├── 2-expand-constitution-technical-requirements.constitution.prompt.md
│       │   └── 3-comprehensive-constitution-expansion.constitution.prompt.md
│       ├── backend-core/    # Backend core feature PHRs
│       │   ├── 1-create-backend-core-spec.spec.prompt.md
│       │   ├── 2-backend-core-implementation-plan.plan.prompt.md
│       │   ├── 3-backend-core-tasks-generated.tasks.prompt.md
│       │   └── 01-infra.green.prompt.md
│       ├── frontend-core/   # Frontend core feature PHRs
│       │   ├── 01-frontend-spec.spec.prompt.md
│       │   ├── phr-002-frontend-core-spec.md
│       │   ├── phr-003-frontend-core-plan.md
│       │   ├── phr-004-frontend-core-impl.md
│       │   ├── phr-005-auth-implementation.green.md
│       │   ├── phr-006-todo-crud-implementation.green.md
│       │   └── phr-007-polishing-validation.green.md
│       └── general/         # General purpose PHRs
│           ├── phase-2-completion.md
│           ├── phr-008-final-audit.green.md
│           ├── configure-environment-variables.md
│           └── PHR-0001-fix-backend-import-path-issues.md
├── tests/                   # Test files
│   └── unit/                # Unit tests
│       └── test_database.py # Database connection tests
├── .mcp.json                # MCP server configuration
├── CLAUDE.md                # Claude Code rules and project instructions
├── README.md                # Project documentation
└── nul                      # Placeholder file
```

### 🏗️ Layout and Component Structure

The application follows Next.js 15+ App Router conventions with nested layouts:

- **Root Layout** (`frontend/src/app/layout.tsx`): Global layout applied to all pages
- **Auth Layout** (`frontend/src/app/(auth)/layout.tsx`): Layout for authentication pages
- **Dashboard Layout** (`frontend/src/app/dashboard/layout.tsx`): Layout for dashboard pages

The component structure is organized by functionality:
- **UI Components** (`frontend/src/components/ui/`): Reusable UI primitives
- **Task Components** (`frontend/src/components/tasks/`): Task management UI elements
- **Dashboard Components** (`frontend/src/components/dashboard/`): Dashboard-specific UI elements

The services layer handles API communication, while hooks manage state and business logic.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (for frontend development)
- Python 3.13+ (for backend development)
- Docker and Docker Compose (for local orchestration)
- pnpm package manager (for frontend dependencies)

### Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd <repository-name>
```

2. Install frontend dependencies:
```bash
cd frontend
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
# Update the values in .env.local as needed
```

4. Start the development servers:
```bash
# For frontend
cd frontend
pnpm dev
```

## 📋 Features

### User Authentication
- Secure login and signup with Better Auth
- JWT-based session management
- Protected routes and user isolation
- Automatic token refresh

### Task Management
- Create, read, update, and delete tasks
- Toggle task completion status
- Filter tasks (All, Active, Completed)
- Responsive design for mobile and desktop

### API Integration
- Standardized API envelope processing
- Graceful error handling with toast notifications
- Loading skeletons for all async operations
- Optimistic UI updates for instant feedback

## 🧪 Testing

The application includes comprehensive test coverage:
- Unit tests for service layers and hooks
- Component tests for UI elements
- Integration tests for API endpoints
- Target: 80%+ code coverage across all modules

## 🔒 Security Features

- JWT-based authentication with automatic refresh
- User data isolation with UUID-based user_id
- Input validation and sanitization
- Secure session management
- Protected API routes with proper authorization

## 📊 Performance

- 500ms p95 latency goal for UI interactions
- Loading skeletons for graceful degradation
- Optimistic UI updates for instant feedback
- Efficient API communication with standardized envelopes

## 🏗️ Development Process

This project was developed using the Agentic Dev Stack methodology:
- **Spec-Driven Development**: All features begin with detailed specifications
- **Automated Planning**: Implementation plans generated from specs
- **Task Orchestration**: Automated task breakdown and execution
- **Quality Assurance**: Comprehensive testing and validation
- **Audit Trail**: Complete documentation of all development decisions

## 🤝 Contributing

We welcome contributions to this project! Please follow the SDD workflow:
1. Create a specification in `/specs/`
2. Generate a plan using `/sp.plan`
3. Create tasks with `/sp.tasks`
4. Implement using `/sp.implement`
5. Document changes with PHRs

## 📄 License

This project is part of the Panaversity Hackathon II and is governed by the terms of the hackathon.