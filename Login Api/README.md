# Backend Auth Project (PostgreSQL)

A minimal Node.js + Express backend with JWT-based email/password authentication and PostgreSQL.

## Structure

```
backend-auth-postgres/
├── config/
│   └── db.js               # PostgreSQL connection pool
├── controllers/
│   └── authController.js   # register / login / me logic
├── db/
│   ├── schema.sql          # users table definition
│   └── migrate.js          # runs schema.sql against your DB
├── middleware/
│   └── authMiddleware.js   # JWT verification (protect routes)
├── models/
│   └── User.js             # raw SQL queries + password hashing
├── routes/
│   └── authRoutes.js       # /api/auth routes
├── .env.example
├── .gitignore
├── package.json
└── server.js                # App entry point
```

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy the environment file and fill in your values:
   ```bash
   cp .env.example .env
   ```
   - `DATABASE_URL`: full Postgres connection string (recommended), **or**
     set `PGHOST` / `PGPORT` / `PGUSER` / `PGPASSWORD` / `PGDATABASE` individually
   - `JWT_SECRET`: a long, random string used to sign tokens
   - `JWT_EXPIRES_IN`: token lifetime, e.g. `7d`

3. Create the database (if it doesn't exist yet):
   ```bash
   createdb auth_demo
   ```

4. Run the migration to create the `users` table:
   ```bash
   npm run migrate
   ```

5. Start the server:
   ```bash
   npm run dev    # with nodemon, auto-restarts on changes
   # or
   npm start
   ```

Server runs at `http://localhost:5000` by default.

## API Endpoints

### Register
`POST /api/auth/register`
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "supersecret123"
}
```
Returns `{ user, token }`.

### Login
`POST /api/auth/login`
```json
{
  "email": "jane@example.com",
  "password": "supersecret123"
}
```
Returns `{ user, token }`.

### Get current user (protected)
`GET /api/auth/me`
Header: `Authorization: Bearer <token>`

Returns `{ user }`.

## Notes

- Passwords are hashed with bcrypt before being stored (never stored in plain text).
- Uses the `pg` connection pool directly with parameterized queries (no ORM), so it's easy to read and adapt.
- Emails are stored lowercase and are unique at the database level.
- This is a starting point — add refresh tokens, rate limiting, email verification, and request validation (e.g. `zod` or `joi`) before using in production.
