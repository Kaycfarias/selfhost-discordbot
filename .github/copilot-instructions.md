# Selfhost Discord Bot Dashboard - AI Agent Instructions

## Project Overview

This is a Next.js 15 dashboard for managing self-hosted Discord bots with real-time monitoring and terminal access. The architecture separates the dashboard frontend from a backend API that manages Docker containers running Discord bots.

## Key Architecture Components

### Dashboard Structure

- **Layout**: Uses `DashboardLayout` component with shadcn/ui sidebar pattern
- **Sidebar Navigation**: Dynamic bot list fetched from `/api/list-bots` endpoint via SWR
- **Real-time Components**: Terminal and metrics use WebSocket connections to backend API

### External API Integration

- **Backend API**: Communicates with separate API server via `NEXT_PUBLIC_API_HOST` environment variable
- **Bot Management**: `/api/list-bots` returns `{bots: [{containerName, botId}]}`
- **WebSocket Endpoints**:
  - `/api/ws-terminal?botId=X` for terminal access
  - `/api/ws-metrics?botId=X` for real-time resource monitoring

### Component Patterns

- **Client-Only Components**: Terminal uses dynamic imports and `isClient` state for xterm.js
- **Error Boundaries**: WebSocket connections include proper cleanup and error handling
- **Responsive Design**: Sidebar collapses to icon-only on smaller screens

## Development Workflows

### Running the Application

```bash
bun dev          # Development server with Turbopack
bun build        # Production build with Turbopack
bun start        # Production server
```

### Environment Setup

- Configure `NEXT_PUBLIC_API_HOST` for backend API communication
- Backend API must support CORS for dashboard communication
- WebSocket endpoints require upgrade-capable server

## Project-Specific Conventions

### Component Organization

- **UI Components**: Located in `src/components/ui/` (shadcn/ui pattern)
- **Feature Components**: Direct in `src/components/` (kebab-case naming)
- **Layouts**: Use compound component pattern (`DashboardLayout` wraps `SidebarProvider`)

### TypeScript Patterns

- Use `React.ComponentProps<typeof Component>` for component prop spreading
- Dynamic imports with proper loading states for client-only libraries
- Interface definitions inline for API responses (e.g., `{bots: Bot[]}`)

### State Management

- **SWR**: For API data fetching with automatic revalidation
- **WebSocket State**: Manual connection management with useRef for cleanup
- **Client-Side Only**: Components requiring browser APIs use `useState` + `useEffect` pattern

### Styling Approach

- **Tailwind CSS**: Utility-first with custom component classes
- **shadcn/ui**: Pre-built accessible components with consistent theming
- **Terminal Styling**: Custom xterm.js integration with proper container styling

## Critical Integration Points

### Backend API Requirements

- Must return bot list as `{bots: [{containerName: string, botId: string}]}`
- WebSocket endpoints must handle binary and text data for terminal
- Metrics endpoint returns `{cpuPercent, memoryUsage, memoryLimit, memoryPercent, sts}`

### Navigation Structure

```
/dashboard/app/{botId} - Individual bot management
/dashboard/app/upload-app - Bot deployment interface
/dashboard/documentation/* - Static documentation pages
/dashboard/settings/* - Configuration pages
```

### WebSocket Connection Pattern

```typescript
const protocol = window.location.protocol === "https:" ? "wss" : "ws";
const ws = new WebSocket(`${protocol}://${API_HOST}/api/endpoint`);
// Always include cleanup in useEffect return
```

## Coding Standards

### TypeScript Requirements

- **Always use TypeScript**: All new code must be written in TypeScript (.tsx/.ts files)
- **Type Safety**: Prefer explicit typing over `any` - use proper interfaces and type definitions
- **Component Props**: Use `React.ComponentProps<typeof Component>` pattern for component prop extensions

### Development Guidelines

- **No "run dev" Testing**: Do not suggest running `bun dev` to test code changes
- **Static Analysis**: Rely on TypeScript compiler and ESLint for code validation
- **Component Testing**: Test components in isolation rather than full application runs

## Working with this Codebase

When developing:

- Use the existing component patterns for consistency
- Implement proper WebSocket cleanup to prevent memory leaks
- Follow the sidebar navigation structure for new pages
- Always write TypeScript - never plain JavaScript
- Focus on type-safe implementations over runtime testing
