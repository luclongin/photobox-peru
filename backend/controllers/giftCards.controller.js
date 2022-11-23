const db = require("../models");
const GiftCards = db.giftCards;
const Op = db.Sequelize.Op;

exports.createGiftCard = (req, res) => {
  // Validate request
  const data = Object.assign({}, req.body);
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const newGiftCard = {
    giftCardId: data.giftCardId,
    giftCardAmount: data.giftCardAmount,
    giftCardDate: data.giftCardDate
  };

  // Save Photo in the database
  GiftCards.create(newGiftCard).then(data => {
    console.log("Finished creating GiftCards entry:", data);
    res.send(data);
  }).catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the user."
      });
    });
};

exports.getGiftCards = (req, res) => {
    GiftCards.findAll().then(data => {
        res.send(data);
      }).catch(err => {
        res.status(500).send({
          message:
              err.message || "Some error occurred while retrieving GiftCards."
          });
      });
    }

exports.checkGiftCard = (req, res) => {
  const id = req.params.giftCardId;
  console.log("IDBRO:", id);
  GiftCards.findAll({
    where: {giftCardId: id}
  }).then(answer => {
    const reply = answer[0].dataValues;
    if(answer[0].uniqno === 1) {
      res.send({
        exists: true,
        message: "found gift card by id",
        id: reply.giftCardId,
        amount: reply.giftCardAmount,
        date: reply.giftCardDate
      });
    } else {
        // if id not found send false
        res.send({
          exists: false,
          message: "could not find gift card by id"
        });
    }
  }).catch(err => {
    res.send({
      exists: false,
      message: "could not find gift card by id"
    });
  })
}

exports.deleteGiftCard = (req, res) => {
      const id = req.params.giftCardId;
      GiftCards.destroy({
        where: {giftCardId: id}
      }).then(num => {
        if(num === 1) {
          res.send("GiftCard with id #" + id + " was deleted successfully");
        } else {
          res.send({
            message: "Cannot delete GiftCard with id #" + id
          });
        }
      }).catch(err => {
        res.status(500).send({
          message: "could not delete order"
        })
      })
    }