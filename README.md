# CartForge 🛍️

A full-stack eCommerce web application for clothing built to learn how modern online shopping platforms work. The project focuses on understanding full-stack development, backend architecture, authentication, database design, and scalable application structure rather than just building a UI.

> *client link: https://cart-forge.vercel.app/
---

# About the Project

CartForge is a learning-focused eCommerce application where I am building every major feature of a real-world online shopping platform from scratch.

The goal of this project is to understand how frontend, backend, database, and APIs work together in a production-style application.

Instead of following tutorials blindly, this project is being built feature by feature while understanding the purpose behind every folder, API, and database table.

---

# Goals

* Learn Full-Stack Development
* Build a production-style project
* Understand REST APIs
* Learn PostgreSQL database design
* Learn Prisma ORM
* Implement Authentication & Authorization
* Build reusable backend architecture
* Improve React development skills
* Prepare for Software Engineering interviews

---

# Tech Stack

## Frontend

* React
* Vite
* React Router
* Axios
* CSS / Tailwind CSS (Planned)

## Backend

* Node.js
* Express.js

## Database

* PostgreSQL
* Prisma ORM

## Authentication

* JWT (JSON Web Token)
* bcrypt

## Development Tools

* Git
* GitHub
* npm
* VS Code

---

# Project Structure

```text
CartForge/
│
├── client/                     # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── context/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── server/                     # Express Backend
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── models/
│   ├── services/
│   ├── prisma/
│   ├── utils/
│   ├── package.json
│   └── server.js
│
├── .gitignore
└── README.md
```

---

# Folder Explanation

## client/

Contains everything related to the frontend.

Responsibilities:

* User Interface
* Routing
* State Management
* API Calls
* Forms
* Product Pages
* Cart
* Checkout

---

## server/

Contains all backend logic.

Responsibilities:

* REST APIs
* Authentication
* Business Logic
* Database Queries
* Order Processing
* Product Management

---

## controllers/

Contains functions that handle incoming requests.

Example:

* Login User
* Register User
* Get Products
* Create Orders

---

## routes/

Defines API endpoints and connects them to controllers.

Example:

```text
GET    /api/products
POST   /api/auth/login
POST   /api/auth/register
PUT    /api/products/:id
DELETE /api/products/:id
```

---

## middleware/

Reusable logic executed before requests reach controllers.

Examples:

* Verify JWT
* Check Admin Role
* Error Handling
* Request Validation

---

## prisma/

Contains Prisma schema, migrations, and database configuration.

This folder is responsible for:

* Database Schema
* Migrations
* PostgreSQL Connection

---

## services/

Contains reusable business logic.

Examples:

* Payment Service
* Email Service
* Inventory Service

---

## utils/

Helper functions used across the project.

Examples:

* Generate JWT
* Hash Password
* Price Formatter
* Error Helpers

---

# Database

This project uses **PostgreSQL** as the relational database.

Prisma ORM is used to:

* Design database tables
* Create relationships
* Run migrations
* Query the database
* Maintain type safety

Future tables include:

* Users
* Products
* Categories
* Orders
* Order Items
* Cart
* Wishlist

---

# Planned Features

## User Features

* User Registration
* Login
* Logout
* JWT Authentication
* Browse Products
* Product Details
* Search Products
* Filter Products
* Categories
* Shopping Cart
* Wishlist
* Checkout
* Order History
* User Profile

---

## Admin Features

* Admin Login
* Dashboard
* Add Products
* Update Products
* Delete Products
* Manage Orders
* Manage Users
* Inventory Management

---

# Learning Roadmap

## Phase 1

* Project Setup
* React Setup
* Express Setup
* PostgreSQL Setup
* Prisma Configuration
* Folder Structure

---

## Phase 2

* User Authentication
* JWT
* Password Hashing
* Protected Routes

---

## Phase 3

* Product CRUD APIs
* Product Listing
* Product Details

---

## Phase 4

* Shopping Cart
* Cart APIs

---

## Phase 5

* Checkout
* Order Management

---

## Phase 6

* Payment Gateway Integration

---

## Phase 7

* Admin Dashboard

---

## Phase 8

* Deployment

---

# API Overview

## Authentication

```text
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/profile
```

## Products

```text
GET    /api/products
GET    /api/products/:id
POST   /api/products
PUT    /api/products/:id
DELETE /api/products/:id
```

## Cart

```text
GET    /api/cart
POST   /api/cart
PUT    /api/cart
DELETE /api/cart/:id
```

## Orders

```text
POST   /api/orders
GET    /api/orders
GET    /api/orders/:id
```

---

# Getting Started

## Clone Repository

```bash
git clone <repository-url>
```

## Frontend

```bash
cd client
npm install
npm run dev
```

Runs on:

```text
http://localhost:5173
```

---

## Backend

```bash
cd server
npm install
npm run dev
```

Runs on:

```text
http://localhost:5000
```

---

# Future Improvements

* Stripe Payment Integration
* Razorpay Integration
* Cloudinary Image Uploads
* Email Notifications
* Product Reviews
* Ratings
* Coupons & Discounts
* Inventory Tracking
* Sales Dashboard
* Analytics
* Responsive UI Improvements
* Dark Mode
* Unit & Integration Testing
* Docker Support
* CI/CD Pipeline

---

# What I Am Learning

Through this project I aim to gain a deeper understanding of:

* React Application Architecture
* Express.js Backend Development
* REST API Design
* PostgreSQL Database Design
* Prisma ORM
* Authentication using JWT
* Password Security with bcrypt
* Backend Folder Structure
* CRUD Operations
* State Management
* Error Handling
* Production-level Project Organization
* Git & GitHub Workflow
* Building Scalable Full-Stack Applications

---

# License

This project is built for learning, portfolio development, and interview preparation.
