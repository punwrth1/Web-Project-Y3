// const Building = require("../models/building.model.js");

// exports.createBuilding = (req, res) => {
//     if (!req.body) {
//         res.status(400).send({ message: "Content can not be empty!" });
//         return;
//     }

//     const building = new Building({
//         building_name: req.body.building_name
//     });

//     Building.create(building, (err, data) => {
//         if (err)
//             res.status(500).send({ message: err.message || "Some error occurred while creating the Building." });
//         else res.send(data);
//     });
// };

// exports.getAllBuildings = (req, res) => {
//     Building.getAll((err, data) => {
//         if (err)
//             res.status(500).send({ message: err.message || "Some error occurred while retrieving buildings." });
//         else res.send(data);
//     });
// };

// exports.getBuildingById = (req, res) => {
//     Building.findById(req.params.buildingId, (err, data) => {
//         if (err) {
//             if (err.kind === "not_found") {
//                 res.status(404).send({ message: `Not found Building with id ${req.params.buildingId}.` });
//             } else {
//                 res.status(500).send({ message: "Error retrieving Building with id " + req.params.buildingId });
//             }
//         } else res.send(data);
//     });
// };

// exports.updateBuilding = (req, res) => {
//     if (!req.body) {
//         res.status(400).send({ message: "Content can not be empty!" });
//         return;
//     }

//     Building.updateById(
//         req.params.buildingId,
//         new Building(req.body),
//         (err, data) => {
//             if (err) {
//                 if (err.kind === "not_found") {
//                     res.status(404).send({ message: `Not found Building with id ${req.params.buildingId}.` });
//                 } else {
//                     res.status(500).send({ message: "Error updating Building with id " + req.params.buildingId });
//                 }
//             } else res.send(data);
//         }
//     );
// };

// exports.deleteBuilding = (req, res) => {
//     Building.remove(req.params.buildingId, (err, data) => {
//         if (err) {
//             if (err.kind === "not_found") {
//                 res.status(404).send({ message: `Not found Building with id ${req.params.buildingId}.` });
//             } else {
//                 res.status(500).send({ message: "Could not delete Building with id " + req.params.buildingId });
//             }
//         } else res.send({ message: `Building was deleted successfully!` });
//     });
// };
