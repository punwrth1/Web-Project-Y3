const userController = require("../controllers/user.controller");
const express = require("express");
const router = express.Router();

// Validate username
router.get("/:us", userController.validUsername);

// Create a new user
router.post("/signup", userController.createNewUser);

// Login user
router.post("/login", userController.login);

// Get all users
router.get("/", userController.getAllUsers);

// Get users by role
router.get("/role/:role", userController.getUsersByRole);

// Update user
router.put("/:id", userController.updateUser);

// Delete user
router.delete("/:id", userController.deleteUser);

module.exports = (app) => {
    app.use("/api/users", router); // Attach this router under `/api/users`
};
