const db = require("../models");
const Order = db.orders;
const Op = db.Sequelize.Op;

exports.upload = (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "No file was uploaded" });
  }
  
  let fileValues;
  const file = Object.assign({}, req.files.file);
  try {
    if (req.files.file.name.length > 0) {
      // if you can access this, then ony one image uploaded
      fileValues = [file];
    }
  } catch (e) {
    // else it's an array
    fileValues = Object.values(file);
  }  

  fileValues.forEach(item => {
    item.mv(`${__dirname}/../public/uploads/${item.name}`, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
    });
  });
  return;
};
/*
exports.create = (req, res) => {
      // Validate request
      if (!req.body.firstName) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
        return;
      }

      // Create a User
      const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      };
  
      // Save Tutorial in the database
      Order.create(user)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Tutorial."
          });
        });
    };

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const firstName = req.query.firstName;
  var condition = firstName ? { firstName: { [Op.like]: `%${firstName}%` } } : null;

  Order.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};*/