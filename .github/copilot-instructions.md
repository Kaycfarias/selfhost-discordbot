# Selfhost Discord Bot Dashboard - AI Agent Instructions

## Project Overview

This is a Next.js 15 dashboard for managing self-hosted Discord bots. Currently in early development with basic shadcn/ui components and placeholder layouts. The planned architecture will separate the dashboard frontend from a backend API managing Docker containers running Discord bots.

## Current State & Architecture

### Implemented Components

- **Root Layout**: `src/app/layout.tsx` wraps entire app in `DashboardLayout` with theme provider
- **Dashboard Layout**: `src/components/dashboard-layout.tsx` implements shadcn/ui sidebar pattern
- **Sidebar**: `src/components/app-sidebar.tsx` with static navigation structure and collapsible sections
- **UI Components**: shadcn/ui components in `src/components/ui/` (sidebar, breadcrumb, button, etc.)

### Key Implementation Details

- **Global Layout Strategy**: `DashboardLayout` wraps all pages via root layout, not per-page basis
- **Sidebar Structure**: Uses `SidebarProvider > AppSidebar + SidebarInset` pattern with trigger and breadcrumbs
- **Static Data**: Current sidebar uses hardcoded data object, ready for dynamic bot list integration
- **Empty Components**: `terminal.tsx` and `terminal-new.tsx` exist but are empty placeholders

### Future Integration Points

- **Backend API**: Will communicate via `NEXT_PUBLIC_API_HOST` environment variable
- **Bot Management**: API endpoint `/api/list-bots` returning `{bots: [{containerName, botId}]}`
- **WebSocket Endpoints**: Planned for `/api/ws-terminal?botId=X` and `/api/ws-metrics?botId=X`
- **Real-time Components**: Terminal will use xterm.js with dynamic imports and client-side state

## Development Workflows

### Running the Application

```bash
bun dev          # Development server with Turbopack
bun build        # Production build with Turbopack
bun start        # Production server
bun lint         # ESLint checking
```

### Project Structure

```
src/app/                 # Next.js 15 App Router
├── layout.tsx          # Root layout with DashboardLayout wrapper
├── page.tsx            # Home page (minimal placeholder)
├── globals.css         # Tailwind CSS with custom theme variables
└── dashboard/page.tsx  # Dashboard page (duplicate sidebar layout - needs refactoring)

src/components/
├── dashboard-layout.tsx    # Main layout with SidebarProvider
├── app-sidebar.tsx        # Sidebar with hardcoded navigation data
├── terminal*.tsx          # Empty placeholder files for future terminal
└── ui/                    # shadcn/ui components
```

### Current Configuration

- **Build Tool**: Turbopack enabled for both dev and build
- **Styling**: Tailwind CSS v4 with "new-york" shadcn/ui style preset
- **Theme**: Custom OKLCH color system with CSS variables for light/dark modes
- **TypeScript**: Strict mode with path mapping (`@/*` → `./src/*`)

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

### STRICT REQUIREMENTS - MUST BE FOLLOWED

- **TypeScript ONLY**: All code generation MUST use TypeScript (.tsx/.ts files) - NO JavaScript allowed
- **NO Development Server Testing**: NEVER suggest or use `bun dev`, `bun run dev`, or any development server commands to test code
- **Static Code Validation**: Use TypeScript compiler and ESLint for validation, not runtime testing

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
