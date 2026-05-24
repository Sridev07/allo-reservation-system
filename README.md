# Allo Reservation System

A concurrency-safe inventory reservation system built with Next.js, Prisma, PostgreSQL, and Tailwind CSS.

This project was built as part of the Allo Engineering Take-Home Exercise.

---

# Features

- Product inventory management
- Multi-warehouse stock tracking
- Inventory reservation system
- Reservation confirmation flow
- Reservation cancellation flow
- Automatic reservation expiry
- Real-time countdown timer
- Concurrency-safe reservation handling
- Responsive modern UI
- Production deployment on Vercel

---

# Tech Stack

- Next.js (App Router)
- TypeScript
- Prisma ORM
- PostgreSQL
- Tailwind CSS
- Vercel

---

# How Reservation Flow Works

1. User starts a reservation
2. Stock is temporarily reserved
3. Reservation expires automatically after 30 seconds
4. User can:
   - Confirm purchase
   - Cancel reservation
5. On confirmation:
   - Stock is permanently deducted
6. On cancellation/expiry:
   - Reserved stock is released back

---

# Concurrency Handling

The reservation endpoint uses Prisma database transactions to prevent overselling during concurrent requests.

Flow:
- Inventory is checked inside a transaction
- Available stock is calculated atomically
- Reserved quantity is updated immediately
- Reservation record is created in the same transaction

This ensures:
- Only one request can reserve the last available unit
- Competing requests receive a 409-style failure

---

# Expiry Handling

Expired reservations are cleaned lazily before important operations.

Cleanup runs before:
- creating reservations
- confirming reservations
- cancelling reservations

Expired reservations:
- change status
- release reserved stock automatically

For demo/testing purposes, reservation expiry is set to 30 seconds.

In production this would typically be longer (10–15 minutes).

---

# Local Setup

## Install dependencies

DATABASE_URL="postgresql://neondb_owner:npg_6rzl1GvxiuTk@ep-little-glade-ap2egann.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"

Run Prisma migrations:
npx prisma migrate dev

Seed database:
npx prisma db seed

Start development server:
npm run dev

API Endpoints
Products
GET /api/products
Create Reservation
POST /api/reservations
Confirm Reservation
POST /api/reservations/:id/confirm
Cancel Reservation
POST /api/reservations/:id/cancel

Deployment:vercel

URL:https://allo-reservation-system-one-xi.vercel.app
