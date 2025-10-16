# 📚 Prisma Usage Examples

Common patterns and best practices for using Prisma in NestJS.

## Basic CRUD Operations

```typescript
// CREATE
const user = await this.prisma.user.create({
  data: {
    email: 'user@example.com',
    name: 'John Doe',
  },
});

// READ ONE
const user = await this.prisma.user.findUnique({
  where: { id: '123' },
});

// READ MANY
const users = await this.prisma.user.findMany({
  where: { name: { contains: 'John' } },
  orderBy: { createdAt: 'desc' },
  take: 10,
  skip: 0,
});

// UPDATE
const user = await this.prisma.user.update({
  where: { id: '123' },
  data: { name: 'Jane Doe' },
});

// DELETE
const user = await this.prisma.user.delete({
  where: { id: '123' },
});
```

## Transactions

```typescript
// Simple transaction
async transferFunds(fromId: string, toId: string, amount: number) {
  return this.prisma.$transaction(async (tx) => {
    // Deduct from sender
    await tx.account.update({
      where: { id: fromId },
      data: { balance: { decrement: amount } },
    });

    // Add to receiver
    await tx.account.update({
      where: { id: toId },
      data: { balance: { increment: amount } },
    });

    // Create transaction record
    return tx.transaction.create({
      data: {
        fromId,
        toId,
        amount,
        status: 'completed',
      },
    });
  });
}
```

## Relations

```typescript
// Include related data
const user = await this.prisma.user.findUnique({
  where: { id: '123' },
  include: {
    posts: true,
    profile: true,
  },
});

// Select specific fields
const user = await this.prisma.user.findUnique({
  where: { id: '123' },
  select: {
    id: true,
    email: true,
    posts: {
      select: {
        title: true,
        published: true,
      },
    },
  },
});

// Create with relations
const user = await this.prisma.user.create({
  data: {
    email: 'user@example.com',
    profile: {
      create: {
        bio: 'Hello World',
        avatar: 'https://...',
      },
    },
    posts: {
      create: [
        { title: 'First Post', content: '...' },
        { title: 'Second Post', content: '...' },
      ],
    },
  },
});
```

## Filtering & Sorting

```typescript
// Complex filtering
const users = await this.prisma.user.findMany({
  where: {
    AND: [
      { email: { contains: '@gmail.com' } },
      { createdAt: { gte: new Date('2024-01-01') } },
      {
        OR: [
          { name: { contains: 'John' } },
          { name: { contains: 'Jane' } },
        ],
      },
    ],
  },
  orderBy: [
    { createdAt: 'desc' },
    { name: 'asc' },
  ],
});

// Pagination
async findAllPaginated(page: number, limit: number) {
  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    this.prisma.user.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    }),
    this.prisma.user.count(),
  ]);

  return {
    data,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
}
```

## Aggregations

```typescript
// Count
const count = await this.prisma.user.count({
  where: { email: { contains: '@gmail.com' } },
});

// Aggregate
const stats = await this.prisma.order.aggregate({
  _sum: { total: true },
  _avg: { total: true },
  _min: { total: true },
  _max: { total: true },
  _count: true,
});

// Group by
const usersByCountry = await this.prisma.user.groupBy({
  by: ['country'],
  _count: {
    id: true,
  },
  orderBy: {
    _count: {
      id: 'desc',
    },
  },
});
```

## Upsert (Create or Update)

```typescript
const user = await this.prisma.user.upsert({
  where: { email: 'user@example.com' },
  update: { name: 'Updated Name' },
  create: {
    email: 'user@example.com',
    name: 'New User',
  },
});
```

## Batch Operations

```typescript
// Create many
const users = await this.prisma.user.createMany({
  data: [
    { email: 'user1@example.com', name: 'User 1' },
    { email: 'user2@example.com', name: 'User 2' },
    { email: 'user3@example.com', name: 'User 3' },
  ],
  skipDuplicates: true, // Skip records with duplicate unique fields
});

// Update many
const result = await this.prisma.user.updateMany({
  where: { email: { contains: '@gmail.com' } },
  data: { verified: true },
});

// Delete many
const result = await this.prisma.user.deleteMany({
  where: { createdAt: { lt: new Date('2023-01-01') } },
});
```

## Raw Queries

```typescript
// Raw query
const users = await this.prisma.$queryRaw`
  SELECT * FROM users WHERE email LIKE ${`%@gmail.com`}
`;

// Execute raw SQL
const result = await this.prisma.$executeRaw`
  UPDATE users SET verified = true WHERE email = ${email}
`;
```

## Error Handling

```typescript
import { Prisma } from '@prisma/client';

async createUser(data: CreateUserDto) {
  try {
    return await this.prisma.user.create({ data });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Unique constraint violation
      if (error.code === 'P2002') {
        throw new ConflictException('User with this email already exists');
      }
      // Foreign key constraint violation
      if (error.code === 'P2003') {
        throw new BadRequestException('Invalid foreign key reference');
      }
      // Record not found
      if (error.code === 'P2025') {
        throw new NotFoundException('Record not found');
      }
    }
    throw error;
  }
}
```

## Soft Delete Pattern

```typescript
// Add to your schema
model User {
  id        String    @id @default(uuid())
  email     String    @unique
  deletedAt DateTime? @map("deleted_at")
  
  @@map("users")
}

// Service implementation
async softDelete(id: string) {
  return this.prisma.user.update({
    where: { id },
    data: { deletedAt: new Date() },
  });
}

async findAllActive() {
  return this.prisma.user.findMany({
    where: { deletedAt: null },
  });
}

async restore(id: string) {
  return this.prisma.user.update({
    where: { id },
    data: { deletedAt: null },
  });
}
```

## Performance Tips

```typescript
// 1. Use select to fetch only needed fields
const users = await this.prisma.user.findMany({
  select: { id: true, email: true }, // Only fetch these fields
});

// 2. Use indexes in your schema
model User {
  email String @unique // Automatically indexed
  name  String @db.VarChar(255)
  
  @@index([name]) // Add index for frequently queried fields
}

// 3. Use connection pooling (already configured in DATABASE_URL)

// 4. Batch queries when possible
const [users, posts, comments] = await Promise.all([
  this.prisma.user.findMany(),
  this.prisma.post.findMany(),
  this.prisma.comment.findMany(),
]);

// 5. Use cursor-based pagination for large datasets
async findAllCursor(cursor?: string, limit = 10) {
  return this.prisma.user.findMany({
    take: limit,
    skip: cursor ? 1 : 0,
    cursor: cursor ? { id: cursor } : undefined,
    orderBy: { id: 'asc' },
  });
}
```

## Testing with Prisma

```typescript
// In your test file
describe('UsersService', () => {
  let service: UsersService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, PrismaService],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(async () => {
    // Clean up test data
    await prisma.user.deleteMany();
  });

  it('should create a user', async () => {
    const user = await service.create({
      email: 'test@example.com',
      name: 'Test User',
    });

    expect(user).toBeDefined();
    expect(user.email).toBe('test@example.com');
  });
});
```

## Resources

- [Prisma CRUD Operations](https://www.prisma.io/docs/concepts/components/prisma-client/crud)
- [Prisma Relations](https://www.prisma.io/docs/concepts/components/prisma-client/relation-queries)
- [Prisma Transactions](https://www.prisma.io/docs/concepts/components/prisma-client/transactions)
- [Prisma Error Reference](https://www.prisma.io/docs/reference/api-reference/error-reference)
