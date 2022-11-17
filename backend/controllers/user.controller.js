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
      Users.findAll().then(data => {
        res.send(data);
      }).catch(err => {
        res.status(500).send({
          message:
              err.message || "Some error occurred while retrieving users."
          });
      });
    }


exports.delete = (req, res) => {
      const id = req.params.id;
      Users.destroy({
        where: {userId: id}
      }).then(num => {
        if(num === 1) {
          res.send("User with order #" + id + " was deleted successfully");
        } else {
          res.send({
            message: "Cannot delete User with order #" + id
          });
        }
      }).catch(err => {
        res.status(500).send({
          message: "could not delete order"
        })
      })
    }