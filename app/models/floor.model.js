const sql = require("./db.js");

const Floor = function (floor) {
    this.building_id = floor.building_id;
    this.floor_number = floor.floor_number;
    this.floor_name = floor.floor_name;
};

Floor.create = (newFloor, result) => {
    sql.query("INSERT INTO floors SET ?", newFloor, (err, res) => {
        if (err) {
            console.error("Error: ", err);
            result(err, null);
            return;
        }
        console.log("Created floor: ", { id: res.insertId, ...newFloor });
        result(null, { id: res.insertId, ...newFloor });
    });
};

Floor.getAll = (result) => {
    const query = `
        SELECT f.floor_id, f.building_id, f.floor_number, f.floor_name, b.building_name
        FROM floors f
        LEFT JOIN buildings b ON f.building_id = b.building_id
    `;
    sql.query(query, (err, res) => {
        if (err) {
            console.error("Error: ", err);
            result(err, null);
            return;
        }
        console.log("Floors: ", res);
        result(null, res);
    });
};

module.exports = Floor;
