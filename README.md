# Restaurant Food Ordering App

A Node.js/Express backend application for a restaurant food ordering system. This API enables users to browse menus, place orders, manage payments, and includes admin functionality for menu and order management.

## Features

- **User Management**: Registration, login, profile management with JWT authentication
- **Menu Management**: Browse menu items (public) and admin controls for CRUD operations
- **Order Management**: Create orders, view order history, update order status, and cancel orders
- **Payment Processing**: Handle payment transactions and check payment status
- **Role-Based Access Control**: Support for customer and admin roles
- **Password Security**: Bcrypt password hashing

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: Bcrypt for password hashing
- **Development**: Nodemon for auto-reloading in developement 
- **Logging**: Winston

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd restaurant-food-ordering-app
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add:
```
MONGODB_URI=mongodb://localhost:27017/restaurant-app
PORT=4000
JWT_SECRET=your_jwt_secret_key
```

## Running the Application

### Development Mode
```bash
npm run dev
```
The server will start on `http://localhost:4000` and auto-reload on file changes.

### Production Mode
```bash
npm start
```

## API Endpoints

### User Module (`/api/user`)
Authentication and user profile management.

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---|
| GET | `/api/user/` | Welcome message | No |
| POST | `/api/user/register` | Register a new user | No |
| POST | `/api/user/login` | Login user | No |
| GET | `/api/user/profile` | Get user profile | Yes |
| PUT | `/api/user/profile` | Update user profile | Yes |

### Menu Module (`/api/menu`)
Browse and manage restaurant menu items.

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---|---|
| GET | `/api/menu/` | Get all menu items | No | - |
| GET | `/api/menu/:id` | Get menu item by ID | No | - |
| POST | `/api/menu/` | Create new menu item | Yes | Admin |
| PUT | `/api/menu/:id` | Update menu item | Yes | Admin |
| DELETE | `/api/menu/:id` | Delete menu item | Yes | Admin |

### Orders Module (`/api/orders`)
Manage food orders.

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---|---|
| POST | `/api/orders/` | Create a new order | Yes | Customer |
| GET | `/api/orders/my-orders` | Get user's orders | Yes | Customer |
| GET | `/api/orders/:id` | Get order details | Yes | Customer |
| GET | `/api/orders/` | Get all orders | Yes | Admin |
| PATCH | `/api/orders/:id/cancel` | Cancel an order | Yes | Customer |
| PATCH | `/api/orders/:id/status` | Update order status | Yes | Admin |

### Payments Module (`/api/payments`)
Handle payment processing.

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---|
| POST | `/api/payments/:orderId` | Process payment | Yes |
| GET | `/api/payments/:orderId/status` | Get payment status | Yes |

## Project Structure

```
restaurant-food-ordering-app/
├── src/
│   ├── app.js              # Express app configuration
│   ├── controllers/        # Request handlers
│   ├── middlewares/        # Auth and role middlewares
│   ├── models/             # Mongoose schemas
│   ├── routes/             # API route definitions
│   └── services/           # Business logic
├── server.js               # Server entry point
├── package.json            # Dependencies
└── .env                    # Environment variables
```

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Protected routes require:
- Authorization header: `Authorization: Bearer <token>`

Obtain a token by logging in at `/api/user/login` endpoint.

## License

ISC
