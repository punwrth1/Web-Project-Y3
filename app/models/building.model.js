// const sql = require("./db.js");

// const Building = function(building) {
//     this.building_id = building.building_id;  // if auto-generated, no need to include in constructor
//     this.building_name = building.building_name;
// };

// Building.create = (newBuilding, result) => {
//     sql.query("INSERT INTO buildings SET ?", newBuilding, (err, res) => {
//         if (err) {
//             console.error("Error: ", err);
//             result(err, null);
//             return;
//         }
//         console.log("Created building: ", { id: res.insertId, ...newBuilding });
//         result(null, { id: res.insertId, ...newBuilding });
//     });
// };

// Building.findById = (buildingId, result) => {
//     sql.query("SELECT * FROM buildings WHERE building_id = ?", buildingId, (err, res) => {
//         if (err) {
//             console.error("Error: ", err);
//             result(err, null);
//             return;
//         }
//         if (res.length) {
//             console.log("Found building: ", res[0]);
//             result(null, res[0]);
//         } else {
//             result({ kind: "not_found" }, null);
//         }
//     });
// };

// Building.getAll = (result) => {
//     sql.query("SELECT * FROM buildings", (err, res) => {
//         if (err) {
//             console.error("Error: ", err);
//             result(err, null);
//             return;
//         }
//         console.log("buildings: ", res);
//         result(null, res);
//     });
// };

// Building.updateById = (id, building, result) => {
//     sql.query(
//         "UPDATE buildings SET building_name = ? WHERE building_id = ?",
//         [building.building_name, id], 
//         (err, res) => {
//             if (err) {
//                 console.error("Error: ", err);
//                 result(null, err);
//                 return;
//             }
//             if (res.affectedRows == 0) {
//                 result({ kind: "not_found" }, null);
//             } else {
//                 console.log("Updated building: ", { id: id, ...building });
//                 result(null, { id: id, ...building });
//             }
//         }
//     );
// };

// Building.remove = (id, result) => {
//     sql.query("DELETE FROM buildings WHERE building_id = ?", id, (err, res) => {
//         if (err) {
//             console.error("Error: ", err);
//             result(null, err);
//             return;
//         }
//         if (res.affectedRows == 0) {
//             result({ kind: "not_found" }, null);
//         } else {
//             console.log("Deleted building with id: ", id);
//             result(null, res);
//         }
//     });
// };

// module.exports = Building;
