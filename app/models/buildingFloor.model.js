const sql = require("./db.js");

const BuildingFloor = function (buildingFloor) {
    this.building_name = buildingFloor.building_name;
    this.floor_number = buildingFloor.floor_number;
};

// Create a new building with multiple floors
BuildingFloor.create = (building_name, numberOfFloors, result) => {
    const floors = Array.from({ length: numberOfFloors }, (_, index) => [
        building_name,
        index + 1,
    ]);
    sql.query(
        "INSERT INTO buildings_floors (building_name, floor_number) VALUES ?",
        [floors],
        (err, res) => {
            if (err) {
                console.error("Error: ", err);
                result(err, null);
                return;
            }
            console.log("Building and floors created: ", res);
            result(null, res);
        }
    );
};

// Get all buildings
BuildingFloor.getAll = (result) => {
    sql.query(
        "SELECT DISTINCT building_name FROM buildings_floors ORDER BY building_name",
        (err, res) => {
            if (err) {
                console.error("Error: ", err);
                result(err, null);
                return;
            }
            console.log("Buildings: ", res);
            result(null, res);
        }
    );
};

// Get floors of a specific building
BuildingFloor.getFloors = (building_name, result) => {
    sql.query(
        "SELECT id, floor_number FROM buildings_floors WHERE building_name = ? ORDER BY floor_number",
        [building_name],
        (err, res) => {
            if (err) {
                console.error("Error: ", err);
                result(err, null);
                return;
            }
            console.log("Floors for building: ", building_name, res);
            result(null, res);
        }
    );
};

// Delete a building and all its floors
BuildingFloor.remove = (building_name, result) => {
    sql.query(
        "DELETE FROM buildings_floors WHERE building_name = ?",
        [building_name],
        (err, res) => {
            if (err) {
                console.error("Error: ", err);
                result(err, null);
                return;
            }
            console.log("Deleted building and floors: ", res);
            result(null, res);
        }
    );
};

module.exports = BuildingFloor;
