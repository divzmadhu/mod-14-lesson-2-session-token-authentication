// Load environment variables from .env
import "dotenv/config";

// Import jsonwebtoken to create and verify JWTs
import jwt from "jsonwebtoken";

// Retrieve the JWT secret from environment variables
const secret = process.env.JWT_SECRET;

// Set how long the JWT will remain valid
const expiration = "2h";

// Import Express to create the server
import express from "express";

// Create an Express application
const app = express();

// Allow Express to read JSON data from incoming requests
app.use(express.json());

// Define the port on which the server will run
const PORT = 3000;

// Start the server and listen for incoming requests
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
