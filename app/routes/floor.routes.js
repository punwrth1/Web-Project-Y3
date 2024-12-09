module.exports = app => {
  const floors = require('../controllers/floor.controller.js');
  var router = require("express").Router();

  // Create a new Floor
  router.post("/", floors.createFloor);

  // Retrieve all Floors
  router.get("/", floors.getAllFloors);

  // Retrieve a single Floor with floorId
  router.get("/:floorId", floors.getFloorById);

  // Update a Floor with floorId
  router.put("/:floorId", floors.updateFloor);

  // Delete a Floor with floorId
  router.delete("/:floorId", floors.deleteFloor);

  app.use('/api/floors', router);
};
