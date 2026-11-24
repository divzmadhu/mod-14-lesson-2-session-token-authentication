// Import Schema and model from Mongoose
import { Schema, model } from "mongoose";

// Import bcrypt to hash passwords and verify them securely
import bcrypt from "bcrypt";

// Define the structure and validation rules for a User document
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "Must match an email address!"],
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
});


// Hash the password before saving a new or updated User document
userSchema.pre("save", async function () {
  // Check whether the document is new or the password has changed
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;

    // Hash the password using bcrypt
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
});

// Create a method to verify a user's password
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// Create a User model using the schema
const User = model("User", userSchema);

// Export the model so other files can use it
export default User;