// Import jsonwebtoken to create and verify JWTs
import jwt from "jsonwebtoken";

// Define sample user data to store in the JWT payload
const payload = {
  _id: "1234567890",
  username: "Student A",
};

// Define a secret key to sign and verify the JWT
const secretKey = "mysecretkey";

// Create a JWT that expires in 1 hour
const token = jwt.sign(payload, secretKey, {
  expiresIn: "1h",
});

// Display the generated token
console.log("Generated JWT:", token);

// Verify the JWT using the correct secret key
const decoded = jwt.verify(token, secretKey);

// Display the decoded payload
console.log("Decoded payload:", decoded);

// Try verifying the JWT using an incorrect secret key
try {
  const decodedWithWrongSecret = jwt.verify(token, "wrongsecret");

  console.log("Decoded payload:", decodedWithWrongSecret);
} catch (error) {
  console.log("Verification failed:", error.message);
}