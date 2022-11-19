const db = require("../models");
const Letters = db.letters;
const Op = db.Sequelize.Op;

exports.createLetter = (req, res) => {
  // Validate request
  const data = Object.assign({}, req.body);
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  console.log("Letters Data:", data);

  const newLetters = {
    orderId: data.orderId,
    letter1: data.letter1,
    letter2: data.letter2,
    letter3: data.letter3
  };

  // Save Photo in the database
  Letters.create(newLetters).then(data => {
    console.log("Finished creating letters entry:", data);
    res.send(data);
  }).catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the user."
      });
    });
};

exports.getLetters = (req, res) => {
      Letters.findAll().then(data => {
        res.send(data);
      }).catch(err => {
        res.status(500).send({
          message:
              err.message || "Some error occurred while retrieving users."
          });
      });
    }


exports.deleteLetters = (req, res) => {
  const id = req.params.id;
  Letters.destroy({
    where: {orderId: id}
  }).then(num => {
    if(num === 1) {
      res.send("Letter with order #" + id + " was deleted successfully");
    } else {
      res.send({
        message: "Cannot delete Letter with order #" + id
      });
    }
  }).catch(err => {
    res.status(500).send({
      message: "could not delete letter"
    })
  })
}