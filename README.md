# Todo List RESTful API with MongoDB and Mongoose

This project implements a RESTful API for managing a Todo list using MongoDB and Mongoose. Users can create, read, update, and delete Todo items. The API is built using Node.js, Express.js, MongoDB, and Mongoose.

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
- [Environment Variables](#environment-variables)
- [Running the Project](#running-the-project)
- [Testing](#testing)
- [License](#license)

## Setup

1. Clone this repository:
   ```bash
   git clone [<repository-url>](https://github.com/Bhagwan73/TodoList)
   ```

2. Change directory into the project folder:
   ```bash
   cd TodoList
   ```

3. Check out the `todo_with_MongoDB` branch:
   ```bash
   git checkout todo_with_MongoDB
   ```

4. Install dependencies:
   ```bash
   npm install
   ```

5. Set up the necessary environment variables in a `.env` file (see [Environment Variables](#environment-variables)).

6. Run the API:
   ```bash
   npm start
   ```

7. Access the API at `http://localhost:3000`.

## Database Configuration

1. Ensure you have a running MongoDB instance.
2. Set up environment variables in a `.env` file:
   ```
        PORT=API server port. (Default: 3000)
        MONGO_URL=your-mongodb-url
        SECRET_KEY=your-secret-key
   ```

...

## API Endpoints

### GET /todos

Retrieve a list of all Todo items.

**Response:**
```json
[
  {
        "_id": "64e0da07edd909260abf3146",
        "title": "Go for a run",
        "description": "Run for 30 minutes in the park",
        "status": false,
        "createdAt": "2023-08-19T15:04:39.554Z",
        "updatedAt": "2023-08-19T15:04:39.554Z",
        "__v": 0
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
    "status": true,
    "task": {
        "_id": "64e0da07edd909260abf3146",
        "title": "Go for a run",
        "description": "Run for 30 minutes in the park",
        "status": false,
        "createdAt": "2023-08-19T15:04:39.554Z",
        "updatedAt": "2023-08-19T15:04:39.554Z",
        "__v": 0
    }
}
```

### POST /todos

Create a new Todo item.

**Request Body:**
```json
{
   "title": "Go for a run",
    "description": "Run for 30 minutes in the park",
}
```

**Response:**
```json

{
    "status": true,
   "message": "Todo item created successfully",
    "data": {
        "_id": "64e0da07edd909260abf3146",
        "title": "Go for a run",
        "description": "Run for 30 minutes in the park",
        "status": false,
        "createdAt": "2023-08-19T15:04:39.554Z",
        "updatedAt": "2023-08-19T15:33:59.812Z",
        "__v": 0
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
   "title": "Go for a run",
    "description": "Run for 30 minutes in the park",
    "status":true
}
```

**Response:**
```json
{
    "status": true,
    "message": "Todo item updated successfully.",
    "updatedTask": {
        "_id": "64e0da07edd909260abf3146",
        "title": "Go for a run",
        "description": "Run for 30 minutes in the park",
        "status": true,
        "createdAt": "2023-08-19T15:04:39.554Z",
        "updatedAt": "2023-08-19T15:33:59.812Z",
        "__v": 0
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
    "message": "Todo item deleted successfully."
}
```

### POST /register

Register a new user.

**Request Body:**
```json
{
   "userName": "john_doe",
    "email": "john@example.com",
    "password":"john123"
}
```

**Response:**
```json
{
    "status": false,
    "message": "user created sucessfully",
    "user": {
        "userName": "john_doe",
        "email": "john@example.com",
        "password": "$2b$10$1XdaIcmge74fMwRUdmzZfuZOeqWt3hDTVEh9Jbu31avuBvyk44xc.",
        "_id": "64e0e7ab491b10a2fefc6242",
        "createdAt": "2023-08-19T16:02:51.774Z",
        "updatedAt": "2023-08-19T16:02:51.774Z",
        "__v": 0
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


## Environment Variables

Before running the project, you need to set up the following environment variables in a `.env` file:

- `PORT`: The port on which the API server will listen. (Default: 3000)

- `MONGO_URL`: MongoDB connection URL.

- `SECRET_KEY`: Secret key used for generating and verifying JSON Web Tokens (JWT) for authentication.

Example `.env` file:

```plaintext
PORT=3000
MONGO_URL=mongodb://localhost:27017/your-database-name
SECRET_KEY=my-secret-key
```

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


