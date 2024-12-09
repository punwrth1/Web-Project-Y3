// module.exports = app => {
//   const buildings = require('../controllers/building.controller.js');
//   var router = require("express").Router();

//   // Create a new Building
//   router.post("/", buildings.createBuilding);

//   // Retrieve all Buildings
//   router.get("/", buildings.getAllBuildings);

//   // Retrieve a single Building with buildingId
//   router.get("/:buildingId", buildings.getBuildingById);

//   // Update a Building with buildingId
//   router.put("/:buildingId", buildings.updateBuilding);

//   // Delete a Building with buildingId
//   router.delete("/:buildingId", buildings.deleteBuilding);

//   app.use('/api/buildings', router);
// };
