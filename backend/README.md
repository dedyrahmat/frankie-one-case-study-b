# Backend API

A RESTful API built with Hono.js and Drizzle ORM for managing dynamic international addresses.

## Setup Instructions

### 1. Install Dependencies
```bash
cd backend
pnpm install
```

### 2. Initialize Database
```bash
pnpm run db:generate
pnpm run db:migrate
```

### 3. Start Development Server
```bash
pnpm run dev
```

The server will start on http://localhost:4000

## Available Scripts

- `pnpm run dev` - Start development server
- `pnpm run build` - Build TypeScript
- `pnpm start` - Run compiled server
- `pnpm run db:generate` - Generate migrations
- `pnpm run db:migrate` - Apply migrations
- `pnpm run db:studio` - Launch Drizzle Studio

## API Endpoints

### GET /addresses
Retrieve all saved addresses.

### POST /addresses
Create a new address with country-specific fields.

### DELETE /addresses/:id
Delete an address by ID.

## Key Technologies

- **Hono.js**: Ultra-fast web framework
- **Drizzle ORM**: Type-safe SQL query builder
- **SQLite**: Embedded database
- **TypeScript**: Type-safe development

## Design Decisions & Trade-offs

### Hono.js Framework
- **Choice**: Hono.js over Express
- **Reasoning**: Lightweight, excellent TypeScript support, minimal boilerplate
- **Trade-off**: Smaller ecosystem but perfect for API-first services

### Drizzle ORM
- **Choice**: Drizzle ORM over Prisma/Sequelize
- **Reasoning**: Type-safe, minimal overhead, excellent DX
- **Trade-off**: Less mature but superior for small to medium APIs

### SQLite Database
- **Choice**: SQLite for development/small-scale
- **Reasoning**: No external dependencies, file-based, suitable
- **Trade-off**: Limitations at high concurrency; PostgreSQL recommended for production

### Unified Schema
- **Choice**: Single table with nullable country-specific fields
- **Reasoning**: Flexibility without complex joins
- **Trade-off**: Some NULL fields; normalization possible with multiple tables

## Database Schema

| Column | Type | Description |
|--------|------|-------------|
| id | INT | Primary key |
| countryCode | TEXT | Country code (USA, AUS, IDN) |
| addressLine1 | TEXT | Primary address |
| addressLine2 | TEXT | Secondary address |
| postalCode | TEXT | Postal code |
| city | TEXT | City name |
| region | TEXT | State/Province |
| suburb | TEXT | Suburb (AUS) |
| district | TEXT | District (IDN) |
| village | TEXT | Village (IDN) |
| createdAt | TEXT | Creation timestamp |

## Supported Countries

### USA
- addressLine1, addressLine2, city, region, postalCode

### AUS (Australia)
- addressLine1, addressLine2, suburb, region, postalCode

### IDN (Indonesia)
- addressLine1, addressLine2, city, region, district, village, postalCode

## Troubleshooting

### Port Already in Use
```bash
netstat -ano | findstr :4000
taskkill /PID <PID> /F
```

### Database Issues
```bash
pnpm run db:generate
pnpm run db:migrate
```

### CORS Configuration
CORS is enabled for all origins (*) in development. For production, update in src/index.ts.
