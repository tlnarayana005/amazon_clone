# Amazon Clone (MERN)

A resume-level Amazon clone built with the MERN stack.

## Project Overview

This project includes a full-stack shopping experience with:
- User authentication with JWT
- Product catalog and product details
- Shopping cart with add/remove features
- Checkout flow and order creation
- REST API backend with Express and MongoDB
- React frontend with React Router and global state

## Features

- Sign up / sign in
- Browse products
- Add products to cart
- Remove items from cart
- Save cart state in local storage
- Secure backend routes for orders

## Tech Stack

- Frontend: React, React Router, Axios
- Backend: Node.js, Express, MongoDB, Mongoose
- Authentication: JWT, bcrypt

## Folder Structure

- `server/` - backend API
- `client/` - React web app

## Setup

1. Install server dependencies:

```bash
cd server
npm install
```

2. Install client dependencies:

```bash
cd ../client
npm install
```

3. Create `server/.env` from `.env.example` and set your MongoDB URI and JWT secret.

4. Seed the database with sample products:

```bash
cd server
npm run seed
```

5. Run the backend and frontend locally:

```bash
cd server && npm run dev
cd ../client && npm start
```

The app runs at `http://localhost:3000` and the API runs at `http://localhost:5000`.

## Demo Login

When MongoDB is not running, use the built-in demo account:

- Email: `demo@amazon.test`
- Password: `password123`

This demo mode supports browsing products, adding items to the cart, and placing checkout orders locally.

## Notes

This is a developer portfolio project meant to demonstrate a production-style full-stack architecture, clean routing, auth, and persistent cart state.
