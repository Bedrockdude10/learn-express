# Express Tutorial

## Setup
- Run `npm install` from the project root.
- Run `npm install` from `ui-app/`.

To run any server use `npx ts-node /path/to/server` from the project root.

## For You to Do

1. Add a route to quiz/server.js to search for a user.
2. Complete quiz/server4.js with express router.

# Express Tutorial #2

Q: Briefly explain the design patterns used by the Express framework to improve the readability and maintainability of REST-based web services.

A: The Express framework follows several design patterns that improve readability, maintainability, and scalability of REST-based web services. 

Command Design Pattern – Express routes encapsulate requests as objects, decoupling request senders (clients) from receivers (handlers). Each route handler (e.g., app.get('/users', handler)) acts as a concrete command that executes a specific function when invoked, ensuring a clean separation between request invocation and execution logic.

Chain of Responsibility Pattern – Middleware functions in Express form a processing pipeline, where each function can handle, modify, or terminate a request before passing it to the next handler. This allows for structured request handling, such as logging, authentication, and validation, without cluttering the core route logic.

Router Pattern – Express promotes modularization by grouping related routes into router modules using express.Router(). This ensures that different functionalities (e.g., user authentication, data retrieval) are encapsulated in separate files, improving code maintainability and separation of concerns.

Dependency Injection – Express automatically injects dependencies (req, res, next) into middleware and route handlers, promoting flexibility and testability. This enables easy modification of request processing without directly modifying dependent modules.

Controller-Service Pattern – Express applications often separate controllers (handling requests/responses) from services (business logic). This approach keeps controllers lightweight and maintains reusable business logic in dedicated service modules.

Centralized Error Handling – Express provides error-handling middleware to catch and process errors in a standardized way, preventing redundant error-handling logic across multiple routes.