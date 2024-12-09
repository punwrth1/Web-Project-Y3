    const sql = require("./db.js");

    const WasteRecord = function (record) {
    this.assignment_id = record.assignment_id;
    this.user_id = record.user_id;
    this.floor_id = record.floor_id;
    this.record_date = record.record_date || new Date();
    this.recorder_name = record.recorder_name;
    this.general_waste_kg = record.general_waste_kg || 0;
    this.recycle_kg = record.recycle_kg || 0;
    this.organic_kg = record.organic_kg || 0;
    this.hazardous_kg = record.hazardous_kg || 0;
    };

    // Create a new record
    WasteRecord.create = (newRecord, result) => {
    sql.query("INSERT INTO wasterecords SET ?", newRecord, (err, res) => {
        if (err) {
        console.error("Error: ", err);
        result(err, null);
        return;
        }
        result(null, { id: res.insertId, ...newRecord });
    });
    };

    // Retrieve all records
    WasteRecord.getAll = (result) => {
    sql.query(
        `SELECT wr.*, u.fullname AS recorder_name, bf.building_name, bf.floor_number
        FROM wasterecords wr
        INNER JOIN assignmentsss a ON wr.assignment_id = a.id
        INNER JOIN buildings_floors bf ON a.building_floor_id = bf.id
        INNER JOIN users u ON wr.user_id = u.user_id`,
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

    // Retrieve records by user ID
    WasteRecord.getByUserId = (userId, result) => {
    sql.query(
        `SELECT wr.*, bf.building_name, bf.floor_number
        FROM wasterecords wr
        INNER JOIN assignmentsss a ON wr.assignment_id = a.id
        INNER JOIN buildings_floors bf ON a.building_floor_id = bf.id
        WHERE wr.user_id = ?`,
        [userId],
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

    // Retrieve a single record by ID
    WasteRecord.findById = (recordId, result) => {
    sql.query(
        `SELECT wr.*, u.fullname AS recorder_name, bf.building_name, bf.floor_number
        FROM wasterecords wr
        INNER JOIN assignmentsss a ON wr.assignment_id = a.id
        INNER JOIN buildings_floors bf ON a.building_floor_id = bf.id
        INNER JOIN users u ON wr.user_id = u.user_id
        WHERE wr.record_id = ?`,
        [recordId],
        (err, res) => {
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
        }
    );
    };

    // Update a record by ID
    WasteRecord.updateById = (id, record, result) => {
    sql.query(
        `UPDATE wasterecords
        SET assignment_id = ?, user_id = ?, floor_id = ?, record_date = ?, recorder_name = ?,
        general_waste_kg = ?, recycle_kg = ?, organic_kg = ?, hazardous_kg = ?
        WHERE record_id = ?`,
        [
        record.assignment_id,
        record.user_id,
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
            result(err, null);
            return;
        }
        if (res.affectedRows === 0) {
            result({ kind: "not_found" }, null);
        } else {
            result(null, { id, ...record });
        }
        }
    );
    };

    // Delete a record by ID
    WasteRecord.remove = (id, result) => {
    sql.query("DELETE FROM wasterecords WHERE record_id = ?", [id], (err, res) => {
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

    module.exports = WasteRecord;
