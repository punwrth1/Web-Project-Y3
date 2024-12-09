module.exports = (app) => {
  const buildingFloor = require("../controllers/buildingFloor.controller.js");
  const router = require("express").Router();

  // Create a new building with floors
  router.post("/", buildingFloor.create);

  // Get all buildings
  router.get("/", buildingFloor.getAll);

  // Get floors of a specific building
  router.get("/:building_name/floors", buildingFloor.getFloors);

  // Delete a building and its floors
  router.delete("/:building_name", buildingFloor.delete);

  app.use("/api/buildings", router);
};
