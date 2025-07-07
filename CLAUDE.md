# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

HighWater Protocol is a digital asset intelligence platform for wealth advisors, built as a modern monorepo with a React/Next.js frontend and Express.js backend API. The platform has undergone a comprehensive architectural transformation from a tightly coupled HTML-rendering system to a modern, scalable JSON API architecture.

## Architecture

### Monorepo Structure
- **packages/api**: Express.js backend API with Prisma ORM
- **packages/web**: Next.js frontend application with React components
- **packages/types**: Shared TypeScript type definitions across packages
- **Root**: Turborepo configuration and workspace management

### Key Technologies
- **Backend**: Express.js, Prisma ORM, SQLite database, Auth0 authentication
- **Frontend**: Next.js 15, React 19, TailwindCSS 4.x, Recharts for data visualization
- **Build System**: Turborepo with pnpm workspaces
- **Testing**: Jest for unit/integration tests, Playwright for E2E tests

## Development Commands

### Root Level Commands
```bash
# Start development servers for all packages
pnpm dev

# Build all packages
pnpm build

# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run test coverage
pnpm test:coverage

# Type checking across all packages
pnpm type-check
```

### API Package (packages/api)
```bash
# Development server with auto-reload
pnpm dev

# Build TypeScript to JavaScript
pnpm build

# Start production server
pnpm start

# Run unit and integration tests
pnpm test

# Run integration tests only
pnpm test:integration

# Type checking
pnpm type-check
```

### Web Package (packages/web)
```bash
# Development server with Turbopack
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run Jest tests
pnpm test

# Run E2E tests with Playwright
pnpm test:e2e

# Type checking
pnpm type-check
```

## Database & Migrations

The API uses Prisma ORM with SQLite for development. Database schema is defined in `packages/api/prisma/schema.prisma`.

### Database Commands
```bash
# Generate Prisma client (run from packages/api)
npx prisma generate

# Run database migrations
npx prisma migrate dev

# View database in Prisma Studio
npx prisma studio

# Reset database
npx prisma migrate reset
```

## API Architecture

### API Structure
- **Base URL**: `/api/v1/`
- **Routes**: 
  - `/api/v1/clients` - Client management
  - `/api/v1/portfolios` - Portfolio management
  - `/api/v1/assets` - Asset information
  - `/api/v1/risk` - Risk assessment
  - `/api/v1/compliance` - Compliance tracking

### Authentication
Uses Auth0 for authentication with JWT tokens. Auth middleware is in `packages/api/src/auth/authMiddleware.ts`.

### Data Layer
- **DAL**: Data Access Layer in `packages/api/src/dal/`
- **Controllers**: Request handlers in `packages/api/src/controllers/`
- **Services**: Business logic in `packages/api/src/services/`

## Frontend Architecture

### App Structure
- **App Router**: Next.js 13+ app directory structure
- **Pages**: 
  - `/dashboard` - Main dashboard
  - `/clients` - Client management
  - `/portfolios` - Portfolio management
  - `/insights` - AI-powered insights
  - `/settings` - User settings

### Components
- **Reusable Components**: Located in `packages/web/src/components/`
- **Contexts**: Auth and other contexts in `packages/web/src/contexts/`
- **Hooks**: Custom hooks in `packages/web/src/hooks/`
- **API Client**: Centralized API service in `packages/web/src/data/api.ts`

### Styling
- **TailwindCSS**: Utility-first CSS framework
- **Configuration**: `packages/web/tailwind.config.js`
- **Global Styles**: `packages/web/src/app/globals.css`

## Testing Strategy

### Unit Tests
- **API**: Controllers, services, and DAL functions
- **Frontend**: React components using React Testing Library
- **Types**: Type definitions and interfaces

### Integration Tests
- **API**: End-to-end API workflows
- **Frontend**: Component integration with API

### E2E Tests
- **Playwright**: Full user journey testing
- **Configuration**: `packages/web/playwright.config.ts`

## Performance Monitoring

The platform includes built-in performance monitoring:
- **PerformanceMonitor**: React component for client-side monitoring
- **API Caching**: Response caching with TTL
- **Performance Testing**: Dedicated performance test suites

## Key Conventions

### Code Style
- **TypeScript**: Strict type checking enabled
- **ESLint**: Code linting (configuration in individual packages)
- **Prettier**: Code formatting

### API Conventions
- **REST**: RESTful API design
- **JSON**: All responses in JSON format
- **Error Handling**: Standardized error responses
- **Logging**: Winston logger for structured logging

### Component Conventions
- **Functional Components**: Use function components with hooks
- **TypeScript**: All components are typed
- **Props Interface**: Define props interfaces for all components
- **Testing**: Each component should have corresponding test file

## Environment Variables

### API Environment Variables
- `DATABASE_URL`: SQLite database connection string
- `AUTH0_DOMAIN`: Auth0 domain for authentication
- `AUTH0_CLIENT_ID`: Auth0 client ID
- `AUTH0_CLIENT_SECRET`: Auth0 client secret

### Web Environment Variables
- `NEXT_PUBLIC_API_URL`: API base URL for frontend
- `AUTH0_SECRET`: Auth0 secret for Next.js Auth0 integration
- `AUTH0_BASE_URL`: Base URL for Auth0 callbacks

## Migration Notes

The codebase has been migrated from legacy HTML-rendering endpoints to modern JSON APIs. Legacy endpoints are deprecated and marked for removal. When working with the API, always use the `/api/v1/` endpoints rather than any legacy HTML endpoints.