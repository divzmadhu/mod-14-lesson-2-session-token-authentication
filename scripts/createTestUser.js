// Load environment variables from .env
import "dotenv/config";

// Import Mongoose to connect to MongoDB
import mongoose from "mongoose";

// Import the existing User model
import User from "../models/User.js";

// Connect to MongoDB Atlas
await mongoose.connect(process.env.MONGODB_URI);

console.log("Connected to MongoDB Atlas");

// Create a test user
const testUser = new User({
    username: "Student A",
    email: "student@example.com",
    password: "Student123!",
});

// Save the user to MongoDB
// The pre-save middleware in User.js automatically hashes the password
await testUser.save();

console.log("Test user created successfully!");

// Close the MongoDB connection
await mongoose.connection.close();