const db = require("../models");
const Order = db.orders;
const Op = db.Sequelize.Op;

exports.createOrder = (req, res) => {
      // Validate request
      const data = Object.assign({}, req.body);

      if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
        return;
      }

      const newOrder = {
        orderId: data.orderId,
        userId: data.userId,
        productType: data.productType,
        deliveryType: data.deliveryType,
      };

      // Save Order in the database
      Order.create(newOrder).then(data => {
        console.log("Finished creating user:", data);
        res.send(data);
      }).catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the new order."
          });
        });
    };


// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  Order.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving orders."
      });
    });
};