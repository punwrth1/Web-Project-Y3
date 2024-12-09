const Record = require("../models/record.model.js");

exports.createRecord = (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Content cannot be empty!" });
    } else {
        const record = new Record({
            assignment_id: req.body.assignment_id,
            floor_id: req.body.floor_id,
            record_date: req.body.record_date || new Date(),
            recorder_name: req.body.recorder_name,
            general_waste_kg: req.body.general_waste_kg || 0,
            recycle_kg: req.body.recycle_kg || 0,
            organic_kg: req.body.organic_kg || 0,
            hazardous_kg: req.body.hazardous_kg || 0,
        });

        Record.create(record, (err, data) => {
            if (err)
                res.status(500).send({ message: err.message || "Some error occurred while creating the Record." });
            else res.send(data);
        });
    }
};

exports.getAllRecords = (req, res) => {
    Record.getAll((err, data) => {
        if (err)
            res.status(500).send({ message: err.message || "Some error occurred while retrieving records." });
        else res.send(data);
    });
};

exports.findRecordById = (req, res) => {
    Record.findById(req.params.recordId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({ message: `Record not found with id ${req.params.recordId}.` });
            } else {
                res.status(500).send({ message: "Error retrieving Record with id " + req.params.recordId });
            }
        } else res.send(data);
    });
};

exports.updateRecord = (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Content cannot be empty!" });
    } else {
        Record.updateById(req.params.recordId, new Record(req.body), (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({ message: `Record not found with id ${req.params.recordId}.` });
                } else {
                    res.status(500).send({ message: "Error updating Record with id " + req.params.recordId });
                }
            } else res.send(data);
        });
    }
};

exports.deleteRecord = (req, res) => {
    Record.remove(req.params.recordId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({ message: `Record not found with id ${req.params.recordId}.` });
            } else {
                res.status(500).send({ message: `Could not delete Record with id ${req.params.recordId}.` });
            }
        } else res.send({ message: "Record was deleted successfully!" });
    });
};
