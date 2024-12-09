module.exports = (app) => {
  const wasteRecords = require("../controllers/wasteRecords.controller.js");
  const router = require("express").Router();

  // Create a new record
  router.post("/", wasteRecords.createRecord);

  // Retrieve all records
  router.get("/", wasteRecords.getAllRecords);

  // Retrieve records by user ID
  router.get("/user/:userId", wasteRecords.getRecordsByUserId);

  // Retrieve a single record by ID
  router.get("/:recordId", wasteRecords.getRecordById);

  // Update a record by ID
  router.put("/:recordId", wasteRecords.updateRecord);

  // Delete a record by ID
  router.delete("/:recordId", wasteRecords.deleteRecord);

  app.use("/api/wasteRecords", router);
};
