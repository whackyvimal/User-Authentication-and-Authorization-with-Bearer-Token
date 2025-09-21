# Auth JWT MVC

Simple Node.js app demonstrating user registration, login, and JWT-protected route using Express and Mongoose.

Requirements
- Node.js
- MongoDB

Installation
1. Copy `.env.example` to `.env` and set values (MongoDB URI, JWT secret).
2. Install dependencies:

```powershell
npm install
```

Run

```powershell
npm run dev
```

API Endpoints

1. POST /api/auth/register
 - Request JSON: `{ username, email, password }`
 - Success: `201 { message: 'User registered successfully' }`

2. POST /api/auth/login
 - Request JSON: `{ email, password }`
 - Success: `200 { token, expiresIn }`

3. GET /api/user/me
 - Header: `Authorization: Bearer <token>`
 - Success: `200 { id, username, email }`

Postman
- A sample Postman collection is included in `postman_collection.json`.

Notes
- Passwords are hashed with `bcryptjs`.
- JWT secret must be set in `.env` for security.
