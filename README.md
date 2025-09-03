# TechTestQuiz

This project is a technical test for DevelopsToday. It is a fullstack application for creating and solving quizzes, using NestJS (backend), Next.js (frontend), Prisma, and Postgres.

## Features

- Full CRUD for quizzes and questions
- Complete integration between frontend and backend via API
- Backend data validation
- Full Docker support for fast development

---

## Getting Started

### Step-by-step: Local development and Docker workflow

#### 1. Prepare your environment variables

- **For local development and migrations:**

  - Set your `backend/.env` as:
    ```env
    DATABASE_URL=postgresql://postgres:postgres@localhost:5432/quizdb
    PORT=3001
    ```
  - This allows your local Prisma CLI to connect to the database started by Docker Compose.

- **For Docker Compose (after migrations):**

  - Change your `backend/.env` to:
    ```env
    DATABASE_URL=postgresql://postgres:postgres@db:5432/quizdb
    PORT=3001
    ```
  - This is required because inside Docker, the database hostname is `db` (the service name).

- **Frontend:**
  - Use:
    ```env
    NEXT_PUBLIC_API_URL=http://localhost:3001
    ```

#### 2. Start only the database with Docker Compose

In the project root, run:

```bash
docker-compose up -d db
```

#### 3. Run migrations locally (with backend/.env using localhost)

In a new terminal, go to the backend folder and run:

```bash
cd backend
npx prisma migrate dev --name init
```

This will create the initial migration and set up your database schema.

#### 4. (Optional) Commit the generated `prisma/migrations/` folder

This ensures your migrations are versioned and portable.

#### 5. Switch backend/.env to use db for Docker Compose

Before running the full stack, edit `backend/.env` so `DATABASE_URL` uses `db` as the host (see above).

#### 6. Now you can run the full stack with Docker Compose

```bash
docker-compose up --build
```

---

### 1. Clone the repository

```bash
git clone https://github.com/your-username/techTestQuiz.git
cd techTestQuiz
```

### 2. Environment variables

#### Backend (`backend/.env`)

```env
DATABASE_URL=postgresql://postgres:postgres@db:5432/quizdb
PORT=3001
```

#### Frontend (`frontend/.env`)

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

---

## Running with Docker

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
npx prisma migrate dev
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
