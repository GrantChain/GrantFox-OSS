# 🚀 Quick Start Guide

## 1️⃣ Install Dependencies

From the **root** of the monorepo:
```bash
npm install
```

## 2️⃣ Configure Environment

In `apps/core-api`, create a `.env` file:
```bash
cd apps/core-api
cp .env.example .env
```

Edit `.env` and add your Supabase credentials:
```env
DATABASE_URL="postgresql://postgres:[PASSWORD]@[PROJECT].pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres:[PASSWORD]@[PROJECT].supabase.com:5432/postgres"
```

## 3️⃣ Setup Prisma

```bash
# Generate Prisma Client
npm run prisma:generate

# Push schema to database (development)
npm run prisma:push

# OR create a migration (recommended)
npm run prisma:migrate
```

## 4️⃣ Run the API

From the **root** of the monorepo:
```bash
npm run dev
```

Or just the API:
```bash
cd apps/core-api
npm run dev
```

The API will be available at: **http://localhost:3000/api**

## 5️⃣ Test the API

Example endpoints (with the Users module):
- `GET http://localhost:3000/api/users` - Get all users
- `POST http://localhost:3000/api/users` - Create a user
- `GET http://localhost:3000/api/users/:id` - Get a user
- `PATCH http://localhost:3000/api/users/:id` - Update a user
- `DELETE http://localhost:3000/api/users/:id` - Delete a user

## 📊 Prisma Studio

To visually manage your database:
```bash
npm run prisma:studio
```

Opens at: **http://localhost:5555**

## 🌱 Seed Database

```bash
npm run prisma:seed
```

## 📁 Project Structure

```
apps/core-api/
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── seed.ts             # Seed data
├── src/
│   ├── database/           # Database module (global)
│   │   ├── database.module.ts
│   │   ├── prisma.service.ts
│   │   └── index.ts
│   ├── modules/            # Feature modules
│   │   └── users/          # Example module
│   │       ├── users.module.ts
│   │       ├── users.service.ts
│   │       ├── users.controller.ts
│   │       └── dto/
│   ├── app.module.ts
│   └── main.ts
├── .env                    # Environment variables (create this)
├── .env.example            # Environment template
└── DATABASE.md             # Full documentation
```

## 🎯 Next Steps

1. Update `prisma/schema.prisma` with your actual models
2. Run `npm run prisma:generate` after schema changes
3. Create new modules following the `users` example
4. Read `DATABASE.md` for detailed documentation

## 🆘 Troubleshooting

**Error: Environment variable not found**
- Make sure `.env` file exists in `apps/core-api`
- Check that `DATABASE_URL` and `DIRECT_URL` are set

**Error: Can't reach database server**
- Verify your Supabase credentials
- Check your internet connection
- Ensure Supabase project is active

**Prisma Client not generated**
- Run `npm run prisma:generate`
- Restart your IDE/terminal
