const Assignment = require("../models/assignment.model.js");

// Create a single assignment
exports.createAssignment = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content cannot be empty!" });
    return;
  }

  const assignment = new Assignment(req.body);

  Assignment.create(assignment, (err, data) => {
    if (err) {
      res.status(500).send({ message: err.message || "Error occurred while creating the assignment." });
    } else {
      res.send(data);
    }
  });
};

// Create bulk assignments
exports.createBulkAssignments = (req, res) => {
  if (!req.body || !Array.isArray(req.body.assignments)) {
    res.status(400).send({ message: "Assignments should be an array!" });
    return;
  }

  Assignment.createBulk(req.body.assignments, (err, data) => {
    if (err) {
      res.status(500).send({ message: err.message || "Error occurred while creating bulk assignments." });
    } else {
      res.send({ message: "Bulk assignments created successfully!", data });
    }
  });
};

// Retrieve all assignments
exports.getAllAssignments = (req, res) => {
  Assignment.getAll((err, data) => {
    if (err) {
      res.status(500).send({ message: err.message || "Error occurred while retrieving assignments." });
    } else {
      res.send(data);
    }
  });
};

// Retrieve a single assignment by ID
exports.getAssignmentById = (req, res) => {
  Assignment.findById(req.params.assignmentId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({ message: `Assignment not found with ID ${req.params.assignmentId}.` });
      } else {
        res.status(500).send({ message: "Error retrieving assignment with ID " + req.params.assignmentId });
      }
    } else {
      res.send(data);
    }
  });
};

// Update an assignment by ID
exports.updateAssignment = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content cannot be empty!" });
    return;
  }

  Assignment.updateById(req.params.assignmentId, new Assignment(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({ message: `Assignment not found with ID ${req.params.assignmentId}.` });
      } else {
        res.status(500).send({ message: "Error updating assignment with ID " + req.params.assignmentId });
      }
    } else {
      res.send(data);
    }
  });
};

// Delete an assignment by ID
exports.deleteAssignment = (req, res) => {
  Assignment.remove(req.params.assignmentId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({ message: `Assignment not found with ID ${req.params.assignmentId}.` });
      } else {
        res.status(500).send({ message: `Could not delete assignment with ID ${req.params.assignmentId}.` });
      }
    } else {
      res.send({ message: "Assignment was deleted successfully!" });
    }
  });
};
