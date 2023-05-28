const Sequelize = require("sequelize");
const sequelize = new Sequelize("biodata_db", "root", "", {
  host: "localhost",
  dialect: "mysql",
  port: 3307,
});

const biodata = require("./biodata.model.js")(sequelize, Sequelize);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.biodata = biodata; // property models

module.exports = db;
