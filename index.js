// Load environment variables from .env
import "dotenv/config";

// Import jsonwebtoken to create and verify JWTs
import jwt from "jsonwebtoken";

// Import Mongoose to connect to MongoDB
import mongoose from "mongoose";

// Retrieve the JWT secret from environment variables
const secret = process.env.JWT_SECRET;

// Set how long the JWT will remain valid
const expiration = "2h";

// Import Express to create the server
import express from "express";

// Import the User model to find users in MongoDB
import User from "./models/User.js";

// Create an Express application
const app = express();

// Allow Express to read JSON data from incoming requests
app.use(express.json());

// Define the port on which the server will run
const PORT = 3000;

// Connect to MongoDB Atlas
await mongoose.connect(process.env.MONGODB_URI);

console.log("Connected to MongoDB Atlas");

// Start the server and listen for incoming requests
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
