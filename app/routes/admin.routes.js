const express = require("express");
const adminController = require("../controllers/admin.controller");
const authJwt = require("../middleware/auth.jwt");

const router = express.Router();

// Admin login route
router.post("/login", adminController.login);

// CRUD operations on users for admin
router.get("/users",  adminController.getAllUsers);
router.post("/users",  adminController.createUser);
router.get("/users/:user_id",  adminController.getUserById); // Changed :id to :user_id
router.put("/users/:user_id",  adminController.updateUser);  // Changed :id to :user_id
router.delete("/users/:user_id", adminController.deleteUser); // Changed :id to :user_id

module.exports = app => {
    app.use("/api/admin", router);
};
