const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

// Middleware
global.__basedir = __dirname;
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev")); // Logs all requests for debugging

// Root endpoint
app.get("/", (req, res) => {
  res.json({ message: "Welcome to my API." });
});

// Routes
require("./app/routes/user.routes")(app);
require("./app/routes/file.routes")(app);
require("./app/routes/admin.routes")(app);
require("./app/routes/record.routes")(app);
// require('./app/routes/building.routes.js')(app);
require('./app/routes/floor.routes')(app);
require('./app/routes/assignment.routes')(app);
require('./app/routes/buildingFloor.routes')(app);

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
