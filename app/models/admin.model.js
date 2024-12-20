const sql = require('./db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const scKey = require('../config/jwt.config');

const Admin = function (admin) {
    this.fullname = admin.fullname;
    this.username = admin.username;
    this.password = admin.password;
};

const expireTime = '1h';

// Admin Login
Admin.login = (account, result) => {
    sql.query("SELECT * FROM admins WHERE username = ?", [account.username], (err, res) => {
        if (err) {
            console.log("Query error: " + err);
            result(err, null);
            return;
        }
        if (res.length) {
            const validPassword = bcrypt.compareSync(account.password, res[0].password);
            if (validPassword) {
                const token = jwt.sign({ id: res[0].id }, scKey.secret, { expiresIn: expireTime });
                console.log("Login success. Token was generated: " + token);
                res[0].accessToken = token;
                result(null, res[0]);
                return;
            } else {
                console.log("Invalid password.");
                result({ kind: "invalid_pass" }, null);
                return;
            }
        }
        result({ kind: "not_found" }, null);
    });
};

// Create a New User
Admin.createUser = (newUser, result) => {
    const hashedPassword = bcrypt.hashSync(newUser.password, 10);
    sql.query(
        "INSERT INTO users (fullname, user_name, role, password, img) VALUES (?, ?, ?, ?, ?)",
        [newUser.fullname, newUser.user_name, newUser.role, hashedPassword, newUser.img],
        (err, res) => {
            if (err) {
                console.log("Error: ", err);
                result(err, null);
                return;
            }
            result(null, { user_id: res.insertId, ...newUser });
        }
    );
};

// Get All Users
Admin.getAllUsers = (result) => {
    sql.query("SELECT * FROM users", (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

// Get User by ID
Admin.getUserById = (user_id, result) => {
    sql.query("SELECT * FROM users WHERE user_id = ?", [user_id], (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            result(null, res[0]);
        } else {
            result({ kind: "not_found" }, null);
        }
    });
};

// Update User
Admin.updateUser = (user_id, user, result) => {
    const hashedPassword = bcrypt.hashSync(user.password, 10);
    sql.query(
        "UPDATE users SET fullname = ?, user_name = ?, role = ?, password = ?, img = ? WHERE user_id = ?",
        [user.fullname, user.user_name, user.role, hashedPassword, user.img, user_id],
        (err, res) => {
            if (err) {
                console.log("Error: ", err);
                result(err, null);
                return;
            }
            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }
            result(null, { user_id, ...user });
        }
    );
};

// Delete User
Admin.deleteUser = (user_id, result) => {
    sql.query("DELETE FROM users WHERE user_id = ?", [user_id], (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result(err, null);
            return;
        }
        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        result(null, res);
    });
};

module.exports = Admin;
