const sql = require("./db.js");

const Assignment = function (assignment) {
  this.building_floor_id = assignment.building_floor_id;
  this.user_id = assignment.user_id;
  this.assigned_date = assignment.assigned_date || new Date();
  this.status = assignment.status || "Pending";
};

// Create a single assignment
Assignment.create = (newAssignment, result) => {
  sql.query("INSERT INTO assignmentsss SET ?", newAssignment, (err, res) => {
    if (err) {
      console.error("Error: ", err);
      result(err, null);
      return;
    }
    result(null, { id: res.insertId, ...newAssignment });
  });
};

// Create bulk assignments
Assignment.createBulk = (assignments, result) => {
  const values = assignments.map((assignment) => [
    assignment.building_floor_id,
    assignment.user_id,
    assignment.assigned_date,
    assignment.status || "Pending",
  ]);

  sql.query(
    "INSERT INTO assignmentsss (building_floor_id, user_id, assigned_date, status) VALUES ?",
    [values],
    (err, res) => {
      if (err) {
        console.error("Error: ", err);
        result(err, null);
        return;
      }
      result(null, res);
    }
  );
};

// Retrieve a single assignment by ID
Assignment.findById = (assignmentId, result) => {
  sql.query("SELECT * FROM assignmentsss WHERE id = ?", [assignmentId], (err, res) => {
    if (err) {
      console.error("Error: ", err);
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

// Retrieve all assignments
Assignment.getAll = (result) => {
  sql.query(
    `SELECT a.id, bf.building_name, bf.floor_number, u.fullname AS user_name, a.status, a.assigned_date 
        FROM assignmentsss a 
        INNER JOIN buildings_floors bf ON a.building_floor_id = bf.id 
        INNER JOIN users u ON a.user_id = u.user_id`,
    (err, res) => {
      if (err) {
        console.error("Error: ", err);
        result(err, null);
        return;
      }
      result(null, res);
    }
  );
};

// Update an assignment by ID
Assignment.updateById = (id, assignment, result) => {
  sql.query(
    "UPDATE assignmentsss SET building_floor_id = ?, user_id = ?, assigned_date = ?, status = ? WHERE id = ?",
    [assignment.building_floor_id, assignment.user_id, assignment.assigned_date, assignment.status, id],
    (err, res) => {
      if (err) {
        console.error("Error: ", err);
        result(err, null);
        return;
      }
      if (res.affectedRows === 0) {
        result({ kind: "not_found" }, null);
      } else {
        result(null, { id: id, ...assignment });
      }
    }
  );
};

// Delete an assignment by ID
Assignment.remove = (id, result) => {
  sql.query("DELETE FROM assignmentsss WHERE id = ?", [id], (err, res) => {
    if (err) {
      console.error("Error: ", err);
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

module.exports = Assignment;
