const express = require("express");
const cors = require("cors");
const app = express();
var corsOptions = {
  origin: "http://localhost:9000",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const db = require("./app/models");
db.sequelize
  .sync()
  .then(() => {
    console.log("synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

const PORT = 9000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const biodataController = require("./app/controller/biodata.controller.js");
// create bio route
app.post("/", (req, res) => {
  biodataController.create(req, res);
});
// find all bio route
app.get("/", (req, res) => {
  console.log(">> create biodata api");
  biodataController.findAll(req, res);
});
// find bio by id route
app.get("/:id", (req, res) => {
  biodataController.findOne(req, res);
});
// update bio with an id route
app.post("/:id", (req, res) => {
  biodataController.update(req, res);
});
// delete bio with an id route
app.delete("/:id", (req, res) => {
  biodataController.delete(req, res);
});
