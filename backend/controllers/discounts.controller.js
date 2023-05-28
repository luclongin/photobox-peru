const db = require("../models");
const Discounts = db.discounts;
const Op = db.Sequelize.Op;

exports.createDiscount = (req, res) => {
  // Validate request
  const data = Object.assign({}, req.body);
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const newDiscount = {
    discountId: data.discountId,
    discountType: data.discountType,
    discountAmount: data.discountAmount,
    discountPercentage: data.discountPercentage,
    discountStartDate: data.discountStartDate,
    discountEndDate: data.discountEndDate,
    discountUsedAddresses: data.discountUsedAddresses
  };

  console.log("newDiscount", newDiscount);

  // Save Photo in the database
  Discounts.create(newDiscount).then(data => {
    console.log("Finished creating Discounts entry:", data);
    res.send(data);
  }).catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Discount."
      });
    });
};

exports.getDiscounts = (req, res) => {
  console.log("getting discounts!!");
  console.log("all discounts: ", Discounts.findAll());
  Discounts.findAll().then(data => {
      console.log("data:", data);
        res.send(data);
      }).catch(err => {
        res.status(500).send({
          message:
              err.message || "Some error occurred while retrieving Discounts."
          });
      });
    }

exports.checkDiscount = (req, res) => {
  const id = req.params.discountId;
  Discounts.findAll({
    where: {discountId: id}
  }).then(answer => {
    const reply = answer[0].dataValues;
    if(answer[0].uniqno === 1) {
      res.send({
        exists: true,
        message: "found discount by id",
        id: reply.discountId,
        amount: reply.discountAmount,
        percentage: reply.discountPercentage,
        type: reply.discountType
      });
    } else {
        // if id not found send false
        res.send({
          exists: false,
          message: "could not find discount by id"
        });
    }
  }).catch(err => {
    res.send({
      exists: false,
      message: "could not find discount by id"
    });
  })
}

exports.deleteDiscount = (req, res) => {
    console.log("deleting discount");
      const id = req.params.discountId;
      Discounts.destroy({
        where: {discountId: id}
      }).then(num => {
        if(num === 1) {
          res.send("Discounts with id #" + id + " was deleted successfully");
        } else {
          res.send({
            message: "Cannot delete Discounts with id #" + id
          });
        }
      }).catch(err => {
        res.status(500).send({
          message: "could not delete Discounts"
        })
      })
    }