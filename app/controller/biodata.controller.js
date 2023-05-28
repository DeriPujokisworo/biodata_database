const db = require("../models/index.js");
const Biodata = db.biodata;
const Op = db.Sequelize.Op;
// Create bio method
exports.create = (req, res) => {};
// Retrieve all  bio from the database.
exports.findAll = (req, res) => {};
// Find a single  bio with an id
exports.findOne = (req, res) => {};
// Delete a bio with an id
exports.delete = (req, res) => {};

// Create bio method
exports.create = (req, res) => {
  // Validate request
  if (!req.body.nama) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  // Create bio object
  const biodata = {
    nama: req.body.nama,
    tempat_lahir: req.body.tempat,
    tanggal_lahir: req.body.tanggal,
    alamat: req.body.alamat,
  };

  console.log(biodata);
  // Save bio to database
  Biodata.create(biodata)
    .then((data) => {
      console.log(">> insert data successfully");
      res.send(data);
    })
    .catch((err) => {
      console.log(">> insert data fail");
      res.status(500).send({
        message: "Error occurred while inserting data.",
      });
    });
};

// Retrieve all data from the database.
exports.findAll = (req, res) => {
  Biodata.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error while retrieving data.",
      });
    });
};

// Find a data with an id
exports.findOne = (req, res) => {
  Biodata.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error while finding data.",
      });
    });
};

// Update data
exports.update = (req, res) => {
  db.sequelize
    .query(
      `UPDATE data_diri
    SET nama= '${req.body.nama}', tempat_lahir='${req.body.tempat}', tanggal_lahir='${req.body.tanggal}', alamat='${req.body.alamat}'
    WHERE id = ${req.params.id};`,
      {
        type: db.sequelize.QueryTypes.UPDATE,
      }
    )
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error update data",
      });
    });
};

// Delete a bio with an id
exports.delete = (req, res) => {
  Biodata.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(
      res.send({
        message: `Success deleted data with id= ${req.params.id}! `,
      })
    )
    .catch((err) => {
      res.status(500).send({
        message: `Could not delete data with id= ${req.params.id} `,
      });
    });
};
