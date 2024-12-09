const sql = require("./db.js");
const bcrypt = require("bcryptjs");

const User = function (user) {
  this.fullname = user.fullname;
  this.user_name = user.user_name;
  this.role = user.role;
  this.password = user.password;
  this.img = user.img;
};

// Check if a username exists
User.checkUsername = (user_name, result) => {
  sql.query("SELECT * FROM users WHERE user_name = ?", [user_name], (err, res) => {
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

// Create a new user
User.create = (newUser, result) => {
  sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }
    result(null, { id: res.insertId, ...newUser });
  });
};

// Login user
User.loginModel = (account, result) => {
    sql.query("SELECT * FROM users WHERE user_name = ?", [account.user_name], (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        const user = res[0];
        const validPassword = bcrypt.compareSync(account.password, user.password);
        if (validPassword) {
          result(null, { user_id: user.user_id, user_name: user.user_name, role: user.role });
        } else {
          result({ kind: "invalid_password" }, null);
        }
      } else {
        result({ kind: "not_found" }, null);
      }
    });
  };
  
// Get all users
User.getAllRecords = (result) => {
  sql.query("SELECT * FROM users", (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};

// Update user
User.updateById = (userId, user, result) => {
  sql.query(
    "UPDATE users SET fullname = ?, user_name = ?, role = ?, password = ?, img = ? WHERE user_id = ?",
    [user.fullname, user.user_name, user.role, user.password, user.img, userId],
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }
      if (res.affectedRows === 0) {
        result({ kind: "not_found" }, null);
      } else {
        result(null, { id: userId, ...user });
      }
    }
  );
};

// Delete user
User.remove = (userId, result) => {
  sql.query("DELETE FROM users WHERE user_id = ?", [userId], (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows === 0) {
      result({ kind: "not_found" }, null);
    } else {
      result(null, res);
    }
  });
};

// Get users by role
User.getUsersByRole = (role, result) => {
  sql.query("SELECT * FROM users WHERE role = ?", [role], (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};

module.exports = User;
