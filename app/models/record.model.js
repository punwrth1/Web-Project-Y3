const sql = require("./db.js");

const Record = function (record) {
    this.assignment_id = record.assignment_id;
    this.floor_id = record.floor_id;
    this.record_date = record.record_date;
    this.recorder_name = record.recorder_name;
    this.general_waste_kg = record.general_waste_kg;
    this.recycle_kg = record.recycle_kg;
    this.organic_kg = record.organic_kg;
    this.hazardous_kg = record.hazardous_kg;
};

// Create a new record
Record.create = (newRecord, result) => {
    sql.query("INSERT INTO waste_records SET ?", newRecord, (err, res) => {
        if (err) {
            console.error("Error: ", err);
            result(err, null);
            return;
        }
        console.log("Created record: ", { id: res.insertId, ...newRecord });
        result(null, { id: res.insertId, ...newRecord });
    });
};

// Find a record by ID
Record.findById = (recordId, result) => {
    sql.query("SELECT * FROM waste_records WHERE record_id = ?", [recordId], (err, res) => {
        if (err) {
            console.error("Error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("Found record: ", res[0]);
            result(null, res[0]);
        } else {
            result({ kind: "not_found" }, null);
        }
    });
};

// Retrieve all records
Record.getAll = (result) => {
    sql.query("SELECT * FROM waste_records", (err, res) => {
        if (err) {
            console.error("Error: ", err);
            result(err, null);
            return;
        }
        console.log("Retrieved records: ", res);
        result(null, res);
    });
};

// Update a record by ID
Record.updateById = (id, record, result) => {
    sql.query(
        "UPDATE waste_records SET assignment_id = ?, floor_id = ?, record_date = ?, recorder_name = ?, general_waste_kg = ?, recycle_kg = ?, organic_kg = ?, hazardous_kg = ? WHERE record_id = ?",
        [
            record.assignment_id,
            record.floor_id,
            record.record_date,
            record.recorder_name,
            record.general_waste_kg,
            record.recycle_kg,
            record.organic_kg,
            record.hazardous_kg,
            id,
        ],
        (err, res) => {
            if (err) {
                console.error("Error: ", err);
                result(null, err);
                return;
            }
            if (res.affectedRows === 0) {
                result({ kind: "not_found" }, null);
            } else {
                console.log("Updated record: ", { id, ...record });
                result(null, { id, ...record });
            }
        }
    );
};

// Delete a record by ID
Record.remove = (id, result) => {
    sql.query("DELETE FROM waste_records WHERE record_id = ?", [id], (err, res) => {
        if (err) {
            console.error("Error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows === 0) {
            result({ kind: "not_found" }, null);
        } else {
            console.log("Deleted record with id: ", id);
            result(null, res);
        }
    });
};

module.exports = Record;
