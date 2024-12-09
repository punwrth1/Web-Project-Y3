const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

// Validate username
exports.validUsername = (req, res) => {
    User.checkUsername(req.params.us, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.send({ message: "Not Found: " + req.params.us, valid: true });
            } else {
                res.status(500).send({ message: "Error querying username: " + req.params.us });
            }
        } else {
            res.send({ record: data, valid: false });
        }
    });
};

// Create a new user
exports.createNewUser = (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: "Content cannot be empty." });
    }
    const salt = bcrypt.genSaltSync(10);
    const newUser = new User({
        fullname: req.body.fullname,
        user_name: req.body.user_name,
        role: req.body.role,
        password: bcrypt.hashSync(req.body.password, salt),
        img: req.body.img,
    });

    User.create(newUser, (err, data) => {
        if (err) {
            res.status(500).send({ message: err.message || "Error occurred while creating the user." });
        } else {
            res.send(data);
        }
    });
};

// Login user
exports.login = (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: "Content cannot be empty." });
    }

    const loginCredentials = new User({
        user_name: req.body.user_name,
        password: req.body.password,
    });

    User.loginModel(loginCredentials, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(401).send({ message: "User not found: " + req.body.user_name });
            } else if (err.kind === "invalid_pass") {
                res.status(401).send({ message: "Invalid Password" });
            } else {
                res.status(500).send({ message: "Error occurred during login." });
            }
        } else {
            res.send(data);
        }
    });
};

// Get all users
exports.getAllUsers = (req, res) => {
    User.getAllRecords((err, data) => {
        if (err) {
            res.status(500).send({ message: err.message || "Error occurred while retrieving users." });
        } else {
            res.send(data);
        }
    });
};

// Update user
exports.updateUser = (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: "Content cannot be empty." });
    }

    const userId = req.params.id;
    const salt = bcrypt.genSaltSync(10);
    const updatedUser = new User({
        fullname: req.body.fullname,
        user_name: req.body.user_name,
        role: req.body.role,
        password: bcrypt.hashSync(req.body.password, salt),
        img: req.body.img,
    });

    User.updateById(userId, updatedUser, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({ message: `User not found with id ${userId}.` });
            } else {
                res.status(500).send({ message: `Error updating User with id ${userId}` });
            }
        } else {
            res.send(data);
        }
    });
};

// Delete user
exports.deleteUser = (req, res) => {
    const userId = req.params.id;

    User.remove(userId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({ message: `User not found with id ${userId}.` });
            } else {
                res.status(500).send({ message: `Could not delete User with id ${userId}` });
            }
        } else {
            res.send({ message: `User deleted successfully!` });
        }
    });
};

// Get users by role
exports.getUsersByRole = (req, res) => {
    const role = req.params.role; // Extract the role from the URL parameter
    if (!role) {
        res.status(400).send({ message: "Role is required." });
        return;
    }

    User.getUsersByRole(role, (err, data) => {
        if (err) {
            res.status(500).send({ message: err.message || "Error retrieving users by role." });
        } else {
            res.send(data);
        }
    });
};
