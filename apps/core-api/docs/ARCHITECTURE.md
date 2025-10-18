# 🏗️ Core API Architecture

## Clean Architecture Overview

This API follows **Clean Architecture** principles with clear separation of concerns.

```
┌─────────────────────────────────────────────────────────────┐
│                         Controllers                          │
│                    (HTTP Layer / Routes)                     │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                         Services                             │
│                    (Business Logic)                          │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                      Prisma Service                          │
│                   (Database Abstraction)                     │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    Supabase PostgreSQL                       │
│                        (Database)                            │
└─────────────────────────────────────────────────────────────┘
```

## Project Structure

```
apps/core-api/
│
├── prisma/                        # Database layer
│   ├── schema.prisma              # Database schema definition
│   └── seed.ts                    # Database seeding script
│
├── src/
│   │
│   ├── database/                 # Database module (Global)
│   │   ├── database.module.ts    # Exports PrismaService globally
│   │   ├── prisma.service.ts     # Prisma client with lifecycle hooks
│   │   └── index.ts              # Barrel export
│   │
│   ├── modules/                   # Feature modules
│   │   │
│   │   └── users/                # Example: Users module
│   │       ├── users.module.ts   # Module definition
│   │       ├── users.controller.ts  # HTTP endpoints
│   │       ├── users.service.ts  # Business logic
│   │       └── dto/              # Data Transfer Objects
│   │           ├── create-user.dto.ts
│   │           └── update-user.dto.ts
│   │
│   ├── common/                   # Shared utilities (optional)
│   │   ├── filters/              # Exception filters
│   │   ├── guards/               # Auth guards
│   │   ├── interceptors/         # Response interceptors
│   │   ├── decorators/           # Custom decorators
│   │   └── pipes/                # Custom pipes
│   │
│   ├── config/                    # Configuration (optional)
│   │   └── database.config.ts
│   │
│   ├── app.module.ts             # Root module
│   └── main.ts                   # Application entry point
│
├── test/                          # E2E tests
│   └── app.e2e-spec.ts
│
├── .env                           # Environment variables (create this)
├── .env.example                   # Environment template
├── .gitignore                     # Git ignore rules
├── nest-cli.json                  # NestJS CLI config
├── package.json                   # Dependencies & scripts
├── tsconfig.json                  # TypeScript config
```
