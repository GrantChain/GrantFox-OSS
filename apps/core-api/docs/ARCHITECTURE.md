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
├── prisma/                         # Database layer
│   ├── schema.prisma              # Database schema definition
│   └── seed.ts                    # Database seeding script
│
├── src/
│   │
│   ├── database/                  # Database module (Global)
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
│   ├── common/                    # Shared utilities (optional)
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
│
├── QUICK_START.md                 # Quick setup guide
├── DATABASE.md                    # Database documentation
├── PRISMA_EXAMPLES.md            # Prisma usage examples
└── ARCHITECTURE.md               # This file
```

## Module Structure Pattern

Each feature module follows this structure:

```
modules/[feature]/
├── [feature].module.ts           # Module definition
├── [feature].controller.ts       # HTTP layer
├── [feature].service.ts          # Business logic
├── [feature].service.spec.ts     # Unit tests
├── dto/                          # Data Transfer Objects
│   ├── create-[feature].dto.ts
│   ├── update-[feature].dto.ts
│   └── query-[feature].dto.ts
├── entities/                     # Domain entities (optional)
│   └── [feature].entity.ts
└── interfaces/                   # TypeScript interfaces (optional)
    └── [feature].interface.ts
```

## Layer Responsibilities

### 1. Controllers (HTTP Layer)
- Handle HTTP requests/responses
- Validate request data (DTOs)
- Call service methods
- Return formatted responses
- **Should NOT** contain business logic

```typescript
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
```

### 2. Services (Business Logic)
- Implement business rules
- Orchestrate data operations
- Handle transactions
- Call Prisma for data access
- **Should NOT** know about HTTP

```typescript
@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    // Business logic here
    return this.prisma.user.create({ data });
  }
}
```

### 3. DTOs (Data Transfer Objects)
- Define request/response shapes
- Validate incoming data
- Transform data types
- Document API contracts

```typescript
export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsOptional()
  name?: string;
}
```

### 4. Database Module
- Provides PrismaService globally
- Manages database connections
- Handles lifecycle events
- Logs queries (in development)

## Design Principles

### 1. Single Responsibility
Each class/module has one reason to change.

### 2. Dependency Injection
All dependencies are injected via constructor.

```typescript
constructor(
  private readonly prisma: PrismaService,
  private readonly config: ConfigService,
) {}
```

### 3. Global Modules
Database module is global - no need to import in every module.

```typescript
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class DatabaseModule {}
```

### 4. Validation Pipeline
All requests are validated automatically.

```typescript
// In main.ts
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }),
);
```

## Data Flow Example

```
1. Client Request
   POST /api/users
   { "email": "user@example.com", "name": "John" }
   
   ↓

2. Controller receives request
   UsersController.create(@Body() createUserDto)
   
   ↓

3. DTO validation
   CreateUserDto validates the data
   
   ↓

4. Service processes
   UsersService.create(createUserDto)
   
   ↓

5. Database operation
   PrismaService.user.create({ data })
   
   ↓

6. Response
   { "id": "123", "email": "...", "name": "..." }
```

## Best Practices

### ✅ DO

- Keep controllers thin
- Put business logic in services
- Use DTOs for validation
- Handle errors properly
- Use transactions for related operations
- Write tests for services
- Use TypeScript types
- Follow naming conventions
- Document complex logic

### ❌ DON'T

- Put business logic in controllers
- Access database directly from controllers
- Skip validation
- Ignore errors
- Expose sensitive data
- Hardcode values
- Use `any` type
- Mix concerns between layers

## Error Handling Strategy

```typescript
// Service layer
async findOne(id: string) {
  const user = await this.prisma.user.findUnique({ where: { id } });
  
  if (!user) {
    throw new NotFoundException(`User with ID ${id} not found`);
  }
  
  return user;
}

// Prisma errors
try {
  return await this.prisma.user.create({ data });
} catch (error) {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2002') {
      throw new ConflictException('Email already exists');
    }
  }
  throw error;
}
```

## Testing Strategy

```
Unit Tests (*.spec.ts)
├── Test services in isolation
├── Mock PrismaService
└── Test business logic

Integration Tests (*.e2e-spec.ts)
├── Test full request/response cycle
├── Use test database
└── Test API endpoints
```

## Environment Configuration

```typescript
// ConfigModule is global
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
})

// Use in services
constructor(private readonly config: ConfigService) {}

const dbUrl = this.config.get<string>('DATABASE_URL');
```

## Security Considerations

1. **Environment Variables**: Never commit `.env` files
2. **Validation**: Always validate input with DTOs
3. **SQL Injection**: Prisma protects against this
4. **CORS**: Configured in `main.ts`
5. **Rate Limiting**: Add if needed
6. **Authentication**: Implement JWT/OAuth
7. **Authorization**: Use guards
8. **Logging**: Don't log sensitive data

## Performance Optimization

1. **Connection Pooling**: Enabled via DATABASE_URL
2. **Indexes**: Add to frequently queried fields
3. **Select Only Needed Fields**: Use `select` in queries
4. **Pagination**: Implement for large datasets
5. **Caching**: Add Redis if needed
6. **Query Optimization**: Use Prisma Studio to analyze

## Scaling Considerations

- **Horizontal Scaling**: API is stateless
- **Database**: Supabase handles scaling
- **Caching**: Add Redis for sessions/cache
- **Queue**: Add Bull for background jobs
- **Microservices**: Split by domain if needed

## Resources

- [NestJS Documentation](https://docs.nestjs.com)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [SOLID Principles](https://en.wikipedia.org/wiki/SOLID)
