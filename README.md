# Excelidraw

Real-time collaborative whiteboard app built as a TypeScript monorepo with a Next.js frontend, an Express HTTP API, and a WebSocket collaboration backend.

## Overview

This project is a collaborative drawing app inspired by Excalidraw. It allows multiple users to join a shared room and interact with a canvas in real time.

The repository is organized as a Turborepo workspace with separate apps for the frontend and backend services, plus shared packages for common logic and Prisma database access.

## Tech Stack

- Frontend: Next.js, React, TypeScript, Zustand
- HTTP backend: Node.js, Express, TypeScript
- WS backend: Node.js, ws, TypeScript
- Database: PostgreSQL + Prisma ORM
- Monorepo: pnpm workspaces + Turborepo
- Containerization: Docker + Docker Compose

## Repository Structure

```text
Excelidraw/
├── apps/
│   ├── excelidraw-frontend/   # Next.js client app
│   ├── http-backend/          # Express API service
│   └── ws-backend/             # WebSocket collaboration service
├── packages/
│   ├── backend-common/        # Shared auth/config helpers
│   ├── common/                # Shared schemas/types
│   ├── db/                    # Prisma schema + generated client
│   ├── eslint-config/         # Shared lint config
│   ├── typescript-config/     # Shared TS config
│   └── ...
├── docker-compose.yml         # Local multi-service compose stack
├── package.json               # Root scripts and workspace config
├── pnpm-workspace.yaml        # pnpm workspace definition
├── turbo.json                 # Turbo build orchestration
├── .env.docker                # Docker environment values
├── .dockerignore              # Docker build exclusions
├── README.md
└── pnpm-lock.yaml
```

## Services

### Frontend
- App: `apps/excelidraw-frontend`
- Port: `3000`
- Purpose: Drawing UI, room access, canvas interactions

### HTTP Backend
- App: `apps/http-backend`
- Port: `3001`
- Purpose: REST API, auth, room/session endpoints

### WebSocket Backend
- App: `apps/ws-backend`
- Port: `8080`
- Purpose: Real-time collaboration events and sync

## Prerequisites

- Node.js 18+
- pnpm 9+
- Docker + Docker Compose (optional for containerized startup)

## Local Setup

Use Setup script:

```bash
pnpm run setup
```

Start the app locally with the workspace script:

```bash
pnpm dev
```

Or run each service individually:

```bash
pnpm start:http
pnpm start:ws
pnpm start:web
```

## Docker Setup

The project includes a compose stack for all three services.

1. Ensure your environment file exists and contains the required values, including the database URL and app URLs.
2. Start the stack:

```bash
docker compose up --build
```

This starts:
- `excelidraw-frontend` on `http://localhost:3000`
- `http-backend` on `http://localhost:3001`
- `ws-backend` on `ws://localhost:8080`


## Root Scripts

```bash
pnpm run build
pnpm run dev
pnpm run lint
pnpm run check-types
pnpm run generate
pnpm run start
```

## Notes

- The project uses a monorepo setup, so shared code is compiled via workspace packages.
- Prisma schema and migrations live under `packages/db` and should be managed there.
- The Docker setup is intentionally organized as a normal monorepo workflow rather than copying stale build artifacts.

## Contributing

Contributions are welcome. If you want to help, you can:

- improve collaboration behavior
- refine drawing tools and UI
- add tests and validation
- improve deployment and documentation

## License

This project is currently under active development and is intended for collaborative learning and feature development.
