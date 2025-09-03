# TechTestQuiz

This project is a technical test for DevelopsToday. It is a fullstack application for creating and solving quizzes, using NestJS (backend), Next.js (frontend), Prisma, and Postgres.

## Features

- Complete integration between frontend and backend via API
- Backend data validation and simple tests
- Full Docker support for fast development
- API documented with Swagger

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/techTestQuiz.git
cd techTestQuiz
```

### 2. Environment variables

#### Backend (`backend/.env`)

```env
DATABASE_URL=postgresql://postgres:postgres@db:5432/quizdb
```

#### Frontend (`frontend/.env`)

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

---

## Running with Docker (Recommended)

1. Make sure you have Docker and Docker Compose installed.
2. In the project root, run:

```bash
docker-compose up --build
```

3. The frontend will be available at [http://localhost:3000](http://localhost:3000) and the backend at [http://localhost:3001](http://localhost:3001).

---

## Running without Docker

### Prerequisites

- Node.js 18+
- Postgres 15+

### 1. Database

- Create a database named `quizdb` and configure the user/password as in the backend `.env` file.

### 2. Backend

```bash
cd backend
npm install
npx prisma generate
npm run start:dev
```

### 3. Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

---

## Notes

- The backend runs on port 3001 and the frontend on port 3000 by default.
- Prisma migrations are automatically executed when the backend Docker container starts.
- To run tests, use `npm run test` in each respective folder.

---

## About the test

This project was developed as part of a hiring process for DevelopsToday.

---
