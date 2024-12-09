const WasteRecord = require("../models/wasteRecords.model.js");

// Create a new record
exports.createRecord = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content cannot be empty!" });
    return;
  }

  const record = new WasteRecord(req.body);

  WasteRecord.create(record, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the waste record.",
      });
    } else {
      res.send(data);
    }
  });
};

// Retrieve all records
exports.getAllRecords = (req, res) => {
  WasteRecord.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving waste records.",
      });
    } else {
      res.send(data);
    }
  });
};

// Retrieve records by user ID
exports.getRecordsByUserId = (req, res) => {
  WasteRecord.getByUserId(req.params.userId, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving records for the user.",
      });
    } else {
      res.send(data);
    }
  });
};

// Retrieve a single record by ID
exports.getRecordById = (req, res) => {
  WasteRecord.findById(req.params.recordId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Record not found with id ${req.params.recordId}.`,
        });
      } else {
        res.status(500).send({
          message: `Error retrieving record with id ${req.params.recordId}.`,
        });
      }
    } else {
      res.send(data);
    }
  });
};

// Update a record by ID
exports.updateRecord = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content cannot be empty!" });
    return;
  }

  WasteRecord.updateById(req.params.recordId, new WasteRecord(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Record not found with id ${req.params.recordId}.`,
        });
      } else {
        res.status(500).send({
          message: `Error updating record with id ${req.params.recordId}.`,
        });
      }
    } else {
      res.send(data);
    }
  });
};

// Delete a record by ID
exports.deleteRecord = (req, res) => {
  WasteRecord.remove(req.params.recordId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Record not found with id ${req.params.recordId}.`,
        });
      } else {
        res.status(500).send({
          message: `Could not delete record with id ${req.params.recordId}.`,
        });
      }
    } else {
      res.send({ message: "Record was deleted successfully!" });
    }
  });
};
