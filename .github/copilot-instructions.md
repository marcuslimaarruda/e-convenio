# Copilot Instructions for e-convenio

## Overview
This project is a web-based conversion of MPConvenio, split into two main components:
- **backend/**: Node.js (Express) API, connects to SQL Server via `mssql`.
- **frontend/**: React SPA, communicates with backend via HTTP (using `axios`).
Both are containerized with Docker and orchestrated via `docker-compose.yml`.

## Architecture & Data Flow
- **Frontend** (`frontend/src/`):
  - Uses React Router for navigation (`App.js`, `MenuPrincipal.js`).
  - Main features are split into components: `Cadastros`, `Manutencao`, `Transferencia`, `Relatorios`.
  - `Empresas.js` demonstrates CRUD via REST calls to backend (`axios`).
- **Backend** (`backend/src/`):
  - Express routes organized by domain (e.g., `routes/cadastros/empresasRoutes.js`).
  - Controllers (e.g., `empresasController.js`) handle SQL Server queries.
  - API runs on port 3000 (mapped to 3001 in Docker).

## Developer Workflows
- **Build & Run (local):**
  - Backend: `npm install && npm start` in `backend/`
  - Frontend: `npm install && npm start` in `frontend/`
- **Tests:**
  - Backend: `npm test` (Jest)
  - Frontend: `npm test` (Jest + React Testing Library)
- **Docker Compose:**
  - `docker-compose up --build` (runs both services)
- **CI/CD:**
  - See `.github/workflows/deploy.yml` for build, test, and deploy steps.

## Project-Specific Patterns & Conventions
- **Backend:**
  - SQL Server config is hardcoded in controllers (see `empresasController.js`).
  - Error handling returns status 500 with error message.
  - Route files import only the needed controller methods.
- **Frontend:**
  - All API calls use `axios` (see `Empresas.js`).
  - State managed via React hooks (`useState`, `useEffect`).
  - UI is simple, no CSS frameworks.
  - Navigation via React Router v6 (`Routes`, `Route`).
- **Testing:**
  - Frontend tests use `@testing-library/react` (see `App.test.js`).
  - Jest config (`jest.config.js`) uses `babel-jest` and allows `axios` in transforms.

## Integration Points
- **Frontend <-> Backend:**
  - API base URL is hardcoded as `http://localhost:3000` in frontend components.
  - Ensure backend is running and accessible at this address for local development.
- **Database:**
  - SQL Server connection details are in backend controllers. Update as needed for your environment.

## External Dependencies
- **Backend:** `express`, `mssql`, `jest`, `supertest`
- **Frontend:** `react`, `react-dom`, `react-router-dom`, `axios`, `@testing-library/react`, `babel-jest`

## Example: Adding a New Feature
- **Backend:**
  - Add a controller in `src/controllers/[domain]/`
  - Add a route in `src/routes/[domain]/`
  - Register route in main Express app (if not already)
- **Frontend:**
  - Add a component in `src/components/[Feature]/`
  - Add route in `App.js` and/or parent component
  - Use `axios` for API calls

## Troubleshooting
- **Jest + axios import error:**
  - Ensure `transformIgnorePatterns` in `jest.config.js` includes `axios` as an exception.
- **Docker networking:**
  - Frontend expects backend at `localhost:3000`. In Docker, ensure correct port mapping and network configuration.

---
For questions about architecture, workflows, or conventions, see this file and the referenced key files. Update this document as patterns evolve.