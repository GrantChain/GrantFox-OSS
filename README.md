# 🦊 GrantFox OSS

> Open-source bounty platform connecting contributors, maintainers, and organizations through transparent task management and blockchain-powered rewards.

[![Turborepo](https://img.shields.io/badge/built%20with-Turborepo-blueviolet.svg)](https://turbo.build/)
[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![NestJS](https://img.shields.io/badge/NestJS-10-red)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Architecture](#-architecture)
- [Applications](#-applications)
- [Getting Started](#-getting-started)
- [Development](#-development)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Contributing](#-contributing)

---

## 🎯 Overview

**GrantFox OSS** is a modern monorepo-based platform that facilitates open-source contributions through bounties and transparent task management. Built with cutting-edge web technologies and blockchain integration (Stellar), it provides a seamless experience for:

- **Contributors**: Discover issues, claim bounties, and get paid fairly
- **Maintainers**: Manage repositories, issues, and reward contributors
- **Admins**: Oversee platform operations and moderate content

---

## 🏗️ Architecture

This project uses a **monorepo architecture** powered by [Turborepo](https://turbo.build/), enabling:

- 🚀 **Fast builds** with intelligent caching
- 🔄 **Shared dependencies** across applications
- 📦 **Isolated workspaces** for each app
- ⚡ **Parallel execution** of tasks

```
oss-grantfox/
├── apps/
│   ├── contributor-app/  # Main contributor portal
│   ├── maintainer-app/   # Maintainer dashboard
│   ├── admin-app/        # Admin panel
│   └── core-api/         # Backend API
└── package.json          # Root workspace config
```

---

## 📱 Applications

### 🎨 Contributor App
**Port:** `3001` | **Framework:** Next.js 15

The primary application for open-source contributors to discover and work on bounties.

**Key Features:**
- 🔍 **Discover**: Browse and search GitHub repositories and issues
- 👤 **Profile**: Track contributions and earnings
- 💰 **Escrow**: Trustless payment system via Stellar blockchain
- 🔐 **Auth**: Secure authentication with Supabase
- 🎭 **Modern UI**: Built with shadcn/ui, MagicUI, and Framer Motion

**Tech Highlights:**
```
Next.js 15 + TypeScript + TailwindCSS 4
shadcn/ui + MagicUI + Radix UI
Supabase + TanStack Query
Stellar Wallets Kit + Trustless Work
```

**Routes:**
- `/` - Landing page
- `/discover` - Browse repositories and issues
- `/org/[org]` - Organization profile
- `/org/[org]/repo/[repo]` - Repository details
- `/profile/[username]` - User profile
- `/signin` - Authentication

---

### 🛠️ Maintainer App
**Port:** `3002` | **Framework:** Next.js 15

Dashboard for repository maintainers to manage issues, bounties, and contributors.

**Key Features:**
- 📊 **Dashboard**: Overview of repositories and active bounties
- 🎫 **Issue Management**: Create, edit, and assign bounties
- 👥 **Contributor Management**: Review and approve work
- 💸 **Payment Distribution**: Manage escrow releases

**Tech Stack:**
```
Next.js 15 + TypeScript
TailwindCSS 4 + React 19
```

---

### 🔐 Admin App
**Port:** `3003` | **Framework:** Next.js 15

Administrative panel for platform oversight and moderation.

**Key Features:**
- 📈 **Analytics**: Platform-wide statistics
- 🚨 **Moderation**: Content and user management
- ⚙️ **Configuration**: System settings and controls

**Tech Stack:**
```
Next.js 15 + TypeScript
TailwindCSS 4 + React 19
```

---

### 🔌 Core API
**Port:** `3000` | **Framework:** NestJS 10

Backend REST API providing business logic and data management.

**Key Features:**
- 🔄 **RESTful API**: Clean, consistent endpoints
- 🗃️ **Database Integration**: PostgreSQL via Supabase
- 🔐 **Authentication**: JWT-based auth
- 📊 **Data Validation**: Request/response validation

**Tech Stack:**
```
NestJS 10 + TypeScript
PostgreSQL + Supabase
Jest + Supertest
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 18.x
- **npm** >= 10.x
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-org/oss-grantfox.git
   cd oss-grantfox
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create `.env.local` files in each app directory:
   
   ```bash
   # apps/contributor-app/.env.local
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
   NEXT_PUBLIC_GITHUB_TOKEN=your_github_token
   ```

4. **Run the development servers**
   ```bash
   npm run dev
   ```

All apps will start concurrently:
- Contributor App: http://localhost:3001
- Maintainer App: http://localhost:3002
- Admin App: http://localhost:3003
- Core API: http://localhost:3000

---

## 💻 Development

### Available Scripts

```bash
# Development
npm run dev          # Start all apps in development mode
npm run dev:contrib  # Start only contributor app
npm run dev:api      # Start only core API

# Build
npm run build        # Build all apps for production
npm run build:contrib # Build only contributor app

# Production
npm run start        # Start all apps in production mode

# Linting & Formatting
npm run lint         # Lint all apps
npm run lint:fix     # Auto-fix linting issues
```

### Workspace Commands

Run commands in specific workspaces:

```bash
# Run command in contributor-app
npm run dev --workspace=grantfox-oss

# Run command in core-api
npm run dev --workspace=core-api

# Add dependency to specific app
npm install package-name --workspace=grantfox-oss
```

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript 5.9
- **Styling**: TailwindCSS 4
- **UI Components**: shadcn/ui, MagicUI, Radix UI
- **Animations**: Framer Motion (motion)
- **State Management**: TanStack Query
- **Forms**: React Hook Form + Zod
- **Blockchain**: Stellar Wallets Kit

### Backend
- **Framework**: NestJS 10
- **Language**: TypeScript 5
- **Database**: PostgreSQL (via Supabase)
- **Testing**: Jest + Supertest

### DevOps & Tooling
- **Monorepo**: Turborepo
- **Package Manager**: npm
- **Linting**: ESLint 9
- **Formatting**: Prettier
- **Version Control**: Git

---

<div align="center">
  <p>Made with ❤️ by the GrantFox Team</p>
  <p>
    <a href="#-grantfox-oss">Back to Top</a>
  </p>
</div>

