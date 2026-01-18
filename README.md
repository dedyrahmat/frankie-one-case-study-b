# Dynamic Address Form

A full-stack web application for managing international addresses with country-specific fields and Google Maps integration. This application supports multi-country address onboarding with localized field requirements for USA, Australia, and Indonesia.

## Project Overview

This project demonstrates a dynamic form system that adapts based on the selected country, providing an intuitive address collection experience with real-time validation using Google Maps Autocomplete. The backend stores addresses in a SQLite database with Drizzle ORM, while the frontend provides a modern React/Vite interface with TailwindCSS styling.

### Key Features

- **Multi-country Support**: Dynamic form fields based on selected country (USA, Australia, Indonesia)
- **Google Maps Integration**: Address autocomplete and validation
- **Persistent Storage**: SQLite database with Drizzle ORM migrations
- **Modern UI**: Built with React, Shadcn UI components, and TailwindCSS
- **RESTful API**: Hono.js backend with CORS support
- **Type-safe**: Full TypeScript support on both frontend and backend

## Quick Start

### Prerequisites

- Node.js 18+ and pnpm (or npm/yarn)
- Git

### Backend Setup

See [backend/README.md](backend/README.md) for detailed backend setup instructions.

```bash
cd backend
pnpm install
pnpm run db:generate
pnpm run db:migrate
pnpm run dev
```

The backend will start on `http://localhost:4000`

### Frontend Setup

See [frontend/README.md](frontend/README.md) for detailed frontend setup instructions.

```bash
cd frontend
pnpm install
pnpm run dev
```

The frontend will start on `http://localhost:5173`

## Project Structure

```
dynamic-address-form/
├── backend/                 # Express/Hono API server
│   ├── src/
│   │   ├── index.ts        # Server entry point
│   │   ├── db/             # Database configuration
│   │   ├── routes/         # API routes
│   │   └── helpers/        # Utility functions
│   ├── drizzle/            # Database migrations
│   └── package.json
└── frontend/               # React/Vite web application
    ├── src/
    │   ├── components/     # React components
    │   ├── lib/            # Utility functions & constants
    │   └── App.jsx         # Main application
    └── package.json
```

## API Endpoints

### Addresses

- `GET /addresses` - Retrieve all saved addresses
- `POST /addresses` - Create a new address
- `DELETE /addresses/:id` - Delete an address by ID

Request/Response format uses standardized API responses with status codes and messages.

## Technology Stack

### Backend

- **Hono.js**: Lightweight web framework
- **Drizzle ORM**: Type-safe SQL query builder
- **SQLite**: Embedded database
- **TypeScript**: Type safety

### Frontend

- **React 19**: UI library
- **Vite**: Build tool
- **TailwindCSS**: Utility-first CSS framework
- **Shadcn UI**: High-quality React components
- **Google Maps API**: Address autocomplete and validation
- **Sonner**: Toast notifications

## Design Decisions & Trade-offs

### Backend Architecture

**Decision**: Used **Hono.js** instead of Express

- **Rationale**: Lightweight, fast, with excellent TypeScript support and built-in middleware
- **Trade-off**: Smaller ecosystem compared to Express, but perfect for this API-first use case

**Decision**: **Drizzle ORM** for database abstraction

- **Rationale**: Type-safe, minimal boilerplate, excellent TypeScript integration
- **Trade-off**: Less mature than Sequelize/TypeORM but offers better DX and performance for simpler queries

**Decision**: **SQLite** for data persistence

- **Rationale**: File-based, no external DB setup, perfect for this use case
- **Trade-off**: Not suitable for high-concurrency scenarios; better alternatives like PostgreSQL for production at scale

### Frontend Architecture

**Decision**: **React 19** with functional components and hooks

- **Rationale**: Latest stable version, improved performance, better DX
- **Trade-off**: May require updates from older React projects

**Decision**: **Shadcn UI** component library

- **Rationale**: Headless components with full customization control, beautiful defaults, built on Radix UI primitives
- **Trade-off**: Manual component installation vs. npm-installed packages; provides better control and reduces bundle size

**Decision**: **Google Maps API** for address validation

- **Rationale**: Accurate, widely-trusted, supports address components and localization
- **Trade-off**: Requires API key and has usage costs at scale; dependency on third-party service

**Decision**: Dynamic form fields based on country configuration

- **Rationale**: Reduces validation complexity, ensures data consistency per country requirements
- **Trade-off**: Requires maintaining country-specific field mappings as new countries are added

### Data Model

**Decision**: Single `addressTable` with country-specific nullable fields

- **Rationale**: Flexible schema that accommodates different country requirements without separate tables
- **Trade-off**: Some NULL fields for countries that don't use them; could normalize with separate tables for scalability

**Decision**: Store country code as enum

- **Rationale**: Type safety, prevents invalid country codes, database constraint
- **Trade-off**: Adding new countries requires schema migration

### UI/UX Design

**Decision**: Tab-based interface (Add/Saved addresses)

- **Rationale**: Clear separation of concerns, intuitive navigation
- **Trade-off**: Limited screen space; could use sidebar navigation for more features

**Decision**: Form refreshing via state trigger instead of real-time updates

- **Rationale**: Simple implementation, works reliably
- **Trade-off**: Slight delay in UI refresh; websockets or polling would provide real-time updates

## Development Workflow

### Running Both Services

From the root directory, you can:

```bash
# Terminal 1 - Backend
cd backend && pnpm run dev

# Terminal 2 - Frontend
cd frontend && pnpm run dev
```

### Database Management

```bash
# Generate migrations after schema changes
cd backend && pnpm run db:generate

# Apply migrations
cd backend && pnpm run db:migrate

# Launch Drizzle Studio for visual DB management
cd backend && pnpm run db:studio
```

## Future Enhancements

- Add more countries with their specific address formats
- Implement user authentication and address ownership
- Add address validation against postal code databases
- Implement real-time validation with debouncing
- Add batch address import/export functionality
- Implement pagination for saved addresses
- Add address geocoding and distance calculations

## License

This project is open source and available for educational and commercial use.
