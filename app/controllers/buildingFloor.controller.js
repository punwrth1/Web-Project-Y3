const BuildingFloor = require("../models/buildingFloor.model.js");

// Create a new building with multiple floors
exports.create = (req, res) => {
    if (!req.body.building_name || !req.body.numberOfFloors) {
        return res.status(400).send({
            message: "Building name and number of floors are required!",
        });
    }

    BuildingFloor.create(
        req.body.building_name,
        req.body.numberOfFloors,
        (err, data) => {
            if (err) {
                return res.status(500).send({
                    message: err.message || "Error occurred while creating the building.",
                });
            }
            res.send(data);
        }
    );
};

// Retrieve all buildings
exports.getAll = (req, res) => {
    BuildingFloor.getAll((err, data) => {
        if (err) {
            return res.status(500).send({
                message: err.message || "Error occurred while retrieving buildings.",
            });
        }
        res.send(data);
    });
};

// Retrieve floors of a specific building
exports.getFloors = (req, res) => {
    if (!req.params.building_name) {
        return res.status(400).send({
            message: "Building name is required to retrieve floors!",
        });
    }

    BuildingFloor.getFloors(req.params.building_name, (err, data) => {
        if (err) {
            return res.status(500).send({
                message: err.message || `Error occurred while retrieving floors.`,
            });
        }
        res.send(data);
    });
};

// Delete a building and all its floors
exports.delete = (req, res) => {
    if (!req.params.building_name) {
        return res.status(400).send({
            message: "Building name is required to delete!",
        });
    }

    BuildingFloor.remove(req.params.building_name, (err, data) => {
        if (err) {
            return res.status(500).send({
                message: err.message || `Error occurred while deleting building.`,
            });
        }
        res.send({ message: "Building deleted successfully!" });
    });
};
