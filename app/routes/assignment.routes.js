const assignments = require("../controllers/assignment.controller.js");
const express = require("express");
const router = express.Router();

// Create a single assignment
router.post("/", assignments.createAssignment);

// Create bulk assignments
router.post("/bulk", assignments.createBulkAssignments);

// Retrieve all assignments
router.get("/", assignments.getAllAssignments);

// Retrieve a single assignment by ID
router.get("/:assignmentId", assignments.getAssignmentById);

// Update an assignment by ID
router.put("/:assignmentId", assignments.updateAssignment);

// Delete an assignment by ID
router.delete("/:assignmentId", assignments.deleteAssignment);

module.exports = (app) => {
  app.use("/api/assignments", router);
};
