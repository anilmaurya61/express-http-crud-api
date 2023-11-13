# Todo CRUD API

## Description

This is a simple HTTP API for managing todo items stored in a PostgreSQL database. It uses Express.js, Yup for validation, and Sequelize as the ORM.

## Endpoints

1. **Fetch Todo List** (GET `/todos`)
   - Returns a list of todos.
2. **Fetch Todo Detail** (GET `/todos/:id`)

   - Returns details of a specific todo by ID.

3. **Create Todo** (POST `/todos`)

   - Creates a new todo and returns it with the ID.

4. **Update Todo** (PUT `/todos/:id`)

   - Updates a specific todo and returns the updated todo.

5. **Delete Todo** (DELETE `/todos/:id`)
   - Deletes a specific todo.

## Validation

Request data is validated using Yup, ensuring data integrity.

## Database

Todos are stored in a PostgreSQL database via Sequelize.

## Status Codes

Proper HTTP status codes are used for clear responses.

## Getting Started

1. Clone the repository to your local machine.
   ```ruby
   git clone https://github.com/anilmaurya61/express-http-crud-api.git
   ```

3. Create an .env file with the following content:

   ```ruby
      NODE_ENV=development
      DB_DIALECT=postgres
      DB_USERNAME=user_name
      DB_PASSWORD=password
      DB_DATABASE=database_name
      DB_HOST=localhost
      PORT=8080
   ```
4. Install dependencies

   ```ruby
      npm install
   ```

5. Start the app

   ```ruby
      npm start
   ```
