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

// Handle user login
app.post("/api/login", async (req, res) => {

    // Get the email and password from the request body
    const { email, password } = req.body;

    // Find the user by email in MongoDB
    const user = await User.findOne({ email });

    // Check whether a user with this email exists
    if (!user) {
        return res.status(400).json({ message: "Incorrect email or password" });
    }

    // Check whether the entered password matches the stored password hash
    const correctPassword = await user.isCorrectPassword(password);

    // Check whether the password is correct
    if (!correctPassword) {
        return res.status(400).json({ message: "Incorrect email or password" });
    }

    // Prepare the user information to include in the JWT
    const payload = {
        _id: user._id,
        username: user.username,
        email: user.email,
    };

    // Create a signed JWT containing the user information
    const token = jwt.sign({ data: payload }, secret, {
        expiresIn: expiration,
    });

    // Send the generated token back to the client
    res.json({ token });

});

// Middleware to verify JWTs before allowing access to protected routes
const authenticateToken = (req, res, next) => {

    // Get the token from the Authorization header
    let token = req.headers.authorization;

    // Remove "Bearer" and extract the actual token
    if (token) {
        token = token.split(" ").pop().trim();
    }

    // Check whether a token was provided
    if (!token) {
        return res.status(401).json({ message: "No token found!" });
    }

    try {
        const { data } = jwt.verify(token, secret, { maxAge: "2h" });
        req.user = data;
    } catch {
        return res.status(401).json({ message: "Invalid token!" });
    }

    // Continue to the next middleware or protected route
    next();

};

// Protected route - requires a valid JWT
app.get("/api/protected", authenticateToken, (req, res) => {
    res.json({
        message: "Access granted!",
        user: req.user,
    });
});

// Start the server and listen for incoming requests
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
