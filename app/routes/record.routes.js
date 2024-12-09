module.exports = (app) => {
  const recordController = require("../controllers/record.controllers.js");
  const router = require("express").Router();

  // Create a new record
  router.post("/", recordController.createRecord);

  // Retrieve all records
  router.get("/", recordController.getAllRecords);

  // Retrieve a single record by ID
  router.get("/:recordId", recordController.findRecordById);

  // Update a record by ID
  router.put("/:recordId", recordController.updateRecord);

  // Delete a record by ID
  router.delete("/:recordId", recordController.deleteRecord);

  app.use("/api/records", router);
};
