# Microservices Movie App (Docker)

This repository contains three small Node.js services:
- `movies-service` (port 3002)
- `reviews-service` (port 3003)
- `users-service` (port 3001)

Each service has a Dockerfile. Use Docker Compose from the project root to build and run all services together.

Quick start (PowerShell / Windows):

```powershell
# From the project root (where docker-compose.yml is located)
# Build and start services in the foreground
docker compose up --build

# Or run in detached mode
docker compose up --build -d

# Stop and remove containers
docker compose down
```

Older Docker versions with the standalone `docker-compose` command can use:

```powershell
docker-compose up --build
```

Notes:
- Compose maps host ports 3001-3003 to the respective containers. If those ports are already in use on your machine, change the `ports` mappings in `docker-compose.yml`.
- The Dockerfiles expect the project root as the build context so the `COPY package.json ./` step works. Run compose from the repository root.

If you want, I can:
- Add healthchecks to each service and improve restart policies.
- Reduce image size further with multi-stage builds.
