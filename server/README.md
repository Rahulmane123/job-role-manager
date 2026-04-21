# Job Role Management System

Full-stack MERN app with JWT authentication, Redux Toolkit state management, and a responsive MUI dashboard for managing job roles.

## Stack

- React + Vite
- Redux Toolkit
- MUI
- Node.js + Express
- MongoDB + Mongoose
- JWT authentication

## Features

- Login with JWT
- Auto-seeded admin account from environment variables
- Create, edit, delete, search, and sort job roles
- Protected API routes
- Validation, loading states, and snackbar feedback
- Render-ready deployment structure

## Local setup

1. Copy `.env.example` to `.env` in the project root.
2. Install dependencies:

```bash
npm install
```

3. Start the app:

```bash
npm run dev
```

4. Login with the seeded admin credentials from `.env`.

For local Vite development, `VITE_API_URL` is already included in the example env. In production, the frontend can use the default relative `/api` path.

## Render deployment

- Create a MongoDB database and set `MONGODB_URI`.
- Set `JWT_SECRET` and `ADMIN_PASSWORD`.
- Deploy with `render.yaml` or configure the same build/start commands manually.

## API

- `POST /api/auth/login`
- `GET /api/jobroles`
- `POST /api/jobroles`
- `PUT /api/jobroles/:id`
- `DELETE /api/jobroles/:id`
