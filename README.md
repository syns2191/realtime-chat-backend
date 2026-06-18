# Realtime Chats Backend

A scalable realtime chat backend built with Fastify, Socket.io, PostgreSQL, and Redis. Supports private and group conversations, friend system, JWT authentication, and message delivery status tracking.

---

## Features

- **Authentication** — Register, login with JWT access + refresh tokens, password hashing with bcrypt
- **Friend System** — Send, accept, reject friend requests, unfriend, search users by email
- **Conversations** — Create private or group conversations, list with last message and unread count
- **Messaging** — Send and receive messages with delivery status (pending / sent / read)
- **Realtime** — Socket.io for instant messaging and notifications
- **Scalable** — Redis adapter for Socket.io enables horizontal scaling across multiple server instances

---

## Tech Stack

| Layer | Library |
|---|---|
| Framework | [Fastify 5](https://fastify.dev) |
| Realtime | [Socket.io 4](https://socket.io) |
| Auth | [@fastify/jwt](https://github.com/fastify/fastify-jwt) + [bcrypt](https://github.com/kelektiv/node.bcrypt.js) |
| Database | PostgreSQL + [Drizzle ORM](https://orm.drizzle.team) |
| Cache / Pub-Sub | Redis + [ioredis](https://github.com/redis/ioredis) |
| Validation | [TypeBox](https://github.com/sinclairzx81/typebox) via `@fastify/type-provider-typebox` |
| Monorepo | [Turborepo](https://turbo.build) + pnpm workspaces |
| Language | TypeScript |

---

## Project Structure

```
realtime-chats-backend/
├── apps/
│   └── api/                        # Fastify API server
│       └── src/
│           ├── config/             # Environment config
│           ├── db/
│           │   ├── schema/         # Drizzle table definitions
│           │   ├── migrations/     # SQL migrations
│           │   ├── index.ts        # DB connection pool
│           │   └── migrate.ts      # Migration runner
│           ├── modules/
│           │   ├── auth/           # Login & register routes
│           │   ├── user/           # User CRUD routes
│           │   ├── chat/           # Conversation & message routes
│           │   ├── friendship/     # Friend request routes
│           │   └── friend-list/    # Accepted friends routes
│           ├── plugins/
│           │   ├── cors.ts         # CORS setup
│           │   ├── drizzle.ts      # DB plugin
│           │   ├── jwt.ts          # JWT plugin
│           │   └── socket.ts       # Socket.io + Redis adapter
│           ├── socket/
│           │   ├── chat.ts         # Socket event handlers
│           │   └── middleware.ts   # Socket auth middleware
│           ├── libs/               # Shared TypeBox schemas
│           ├── types/              # Fastify type augmentations
│           ├── app.ts              # App setup & route registration
│           └── index.ts            # Server entry point
└── packages/
    └── typescript-config/          # Shared tsconfig
```

---

## Getting Started

### Prerequisites

- Node.js >= 18
- pnpm >= 9
- PostgreSQL
- Redis

### Clone and Install

```sh
git clone https://github.com/your-username/realtime-chats-backend.git
cd realtime-chats-backend
pnpm install
```

### Configure Environment

```sh
cp apps/api/.env-example apps/api/.env
```

Edit `apps/api/.env`:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name

JWT_SECRET=your_jwt_secret
JWT_EXP=86400

REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_AUTH=

PORT=3000
NODE_ENV=development
```

### Run Database Migrations

```sh
pnpm --filter @repo/api db:migrate
```

### Development

```sh
pnpm dev
```

### Build

```sh
pnpm build
```

The API compiles to `apps/api/dist/`.

### Start Production

```sh
pnpm --filter @repo/api start
```

---

## API Reference

All protected routes require the header: `Authorization: Bearer <token>`
