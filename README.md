# Todo List RESTful API

This project implements a RESTful API for managing a Todo list. Users can create, read, update, and delete Todo items. The API is built using Node.js, Express.js, TypeORM, and PostgreSQL.

## Table of Contents

- [Setup](#setup)
- [Database Configuration](#database-configuration)
- [API Endpoints](#api-endpoints)
  - [GET /todos](#get-todos)
  - [GET /todos/:id](#get-todosid)
  - [POST /todos](#post-todos)
  - [PUT /todos/:id](#put-todosid)
  - [DELETE /todos/:id](#delete-todosid)
  - [POST /register](#post-register)
  - [POST /login](#post-login)
- [Authentication](#authentication)
- [TypeScript Configuration](#typescript-configuration)
- [Environment Variables](#environment-variables)
- [Running the Project](#running-the-project)
- [Testing](#testing)
- [License](#license)

## Setup

1. Clone this repository:
   ```bash
   git clone [<repository-url>](https://github.com/Bhagwan73/TodoList)
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Database Configuration

1. Create a PostgreSQL database for the project.
2. Set up environment variables in a `.env` file:
   ```
        PORT=API server port. (Default: 3000)
        DB_HOST=database host. (localhost)
        DB_PORT="your-database-port"
        DB_USERNAME="your-username"
        DB_PASSWORD="your-password"
        DB_DATABASE="your-database-name"
        SECRET_KEY="your-secret-key"
   
   ```

...

## API Endpoints

### GET /todos

Retrieve a list of all Todo items.

**Response:**
```json
[
  {
    "id": 1,
    "title": "Sample Todo",
    "description": "This is a sample todo item.",
    "status": false,
    "created_at": "2023-08-01T10:00:00Z",
    "updated_at": "2023-08-02T14:30:00Z"
  },
  // ... more todo items
]
```

### GET /todos/:id

Retrieve a specific Todo item by ID.

**Parameters:**
- `id`: Todo item ID

**Response:**
```json
{
  "id": 1,
  "title": "Sample Todo",
  "description": "This is a sample todo item.",
  "status": false,
  "created_at": "2023-08-01T10:00:00Z",
  "updated_at": "2023-08-02T14:30:00Z"
}
```

### POST /todos

Create a new Todo item.

**Request Body:**
```json
{
  "title": "New Todo",
  "description": "This is a new todo item."
}
```

**Response:**
```json

{
    "status": true,
    "message": "Todo item created successfully.",
    "data": {
        "id": 2,
        "title": "New Todo",
        "description": "This is a new todo item.",
        "status": false,
        "created_at": "2023-08-03T09:00:00Z",
        "updated_at": "2023-08-03T09:00:00Z"
     }
}
```

### PUT /todos/:id

Update an existing Todo item.

**Parameters:**
- `id`: Todo item ID

**Request Body:**
```json
{
  "title": "Updated Todo",
  "description": "This is an updated todo item.",
  "status": true
}
```

**Response:**
```json
{
    "status": true,
    "message": "Todo item updated successfully.",
    "updatedTask": {
            "id": 1,
            "title": "Updated Todo",
            "description": "This is an updated todo item.",
            "status": true,
            "created_at": "2023-08-01T10:00:00Z",
            "updated_at": "2023-08-03T10:30:00Z"
        }
   }

```

### DELETE /todos/:id

Delete a Todo item.

**Parameters:**
- `id`: Todo item ID

**Response:**
```
{
    "status": true,
    "messgae": "Todo item deleted successfully."
}
```
### POST /register

Register a new user.

**Request Body:**
```json
{
  "userName": "JohnDoe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "status": true,
  "message": "User created successfully",
  "user": {
    "id": 1,
    "userName": "JohnDoe",
    "email": "john@example.com",
    "password": "hashedPassword",
    // ... other user fields
  }
}
```

### POST /login

User login.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "status": true,
  "message": "User login success"
}
```


## Authentication

This API requires authentication using JSON Web Tokens (JWT). Users need to register and log in to obtain a JWT token for accessing protected routes.

## Password Hashing

User passwords are securely hashed using the bcrypt library before being stored in the database. This adds an extra layer of security to protect user data.



## TypeScript Configuration

To ensure proper TypeScript compilation and decorator support, make sure your `tsconfig.json` file includes the following compiler options:

```json
{
  "compilerOptions": {
    "esModuleInterop": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true
  }
}
```

## Environment Variables

Before running the project, you need to set up the following environment variables in a `.env` file:

- `PORT`: The port on which the API server will listen. (Default: 3000)

- `DB_HOST`: PostgreSQL database host.

- `DB_PORT`: PostgreSQL database port.

- `DB_USERNAME`: PostgreSQL database username.

- `DB_PASSWORD`: PostgreSQL database password.

- `DB_DATABASE`: PostgreSQL database name.

- `SECRET_KEY`: Secret key used for generating and verifying JSON Web Tokens (JWT) for authentication.


## Running the Project

1. Run the API:
   ```bash
   npm start
   ```

2. Access the API at `http://localhost:3000`.

## Testing

To run tests, execute:
```bash
npm test
```

## License

This project is licensed under the MIT License. ![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

