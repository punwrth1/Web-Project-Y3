const Floor = require("../models/floor.model.js");

exports.createFloor = (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    const floor = new Floor({
        building_id: req.body.building_id,
        floor_number: req.body.floor_number,
        floor_name: req.body.floor_name
    });

    Floor.create(floor, (err, data) => {
        if (err)
            res.status(500).send({ message: err.message || "Some error occurred while creating the Floor." });
        else res.send(data);
    });
};

exports.getAllFloors = (req, res) => {
    Floor.getAll((err, data) => {
        if (err)
            res.status(500).send({ message: err.message || "Some error occurred while retrieving floors." });
        else res.send(data);
    });
};

exports.getFloorById = (req, res) => {
    Floor.findById(req.params.floorId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({ message: `Not found Floor with id ${req.params.floorId}.` });
            } else {
                res.status(500).send({ message: "Error retrieving Floor with id " + req.params.floorId });
            }
        } else res.send(data);
    });
};

exports.updateFloor = (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    Floor.updateById(
        req.params.floorId,
        new Floor(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({ message: `Not found Floor with id ${req.params.floorId}.` });
                } else {
                    res.status(500).send({ message: "Error updating Floor with id " + req.params.floorId });
                }
            } else res.send(data);
        }
    );
};

exports.deleteFloor = (req, res) => {
    Floor.remove(req.params.floorId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({ message: `Not found Floor with id ${req.params.floorId}.` });
            } else {
                res.status(500).send({ message: "Could not delete Floor with id " + req.params.floorId });
            }
        } else res.send({ message: `Floor was deleted successfully!` });
    });
};
