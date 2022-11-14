const db = require("../models");
const Users = db.users;
const Op = db.Sequelize.Op;

exports.createUser = (req, res) => {
  // Validate request
  const data = Object.assign({}, req.body);
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const newUser = {
    userId: data.userId,
    userFullName: data.userFullName,
    userEmail: data.userEmail,
    userPhoneNumber: data.userPhoneNumber,
    userAddress: data.userAddress,
    userDistrict: data.userDistrict,
    userCity: data.userCity
  };

  // Save Photo in the database
  Users.create(newUser).then(data => {
    console.log("Finished creating user entry:", data);
    res.send(data);
  }).catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the user."
      });
    });
};

exports.getUsers = (req, res) => {
      console.log("yooooo");
      Users.findAll().then(data => {
        res.send(data);
      }).catch(err => {
        res.status(500).send({
          message:
              err.message || "Some error occurred while retrieving users."
          });
      });
    }
