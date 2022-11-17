const db = require("../models");
const AdditionalPhrases = db.additionalPhrases;
const Op = db.Sequelize.Op;

exports.createAdditionalPhrase = (req, res) => {
      // Validate request
      const data = Object.assign({}, req.body);
      if (!req.body) {
            res.status(400).send({
                  message: "Content can not be empty!"
            });
            return;
      }

      const newPhrase = {
            phraseId: data.phraseId,
            orderId: data.orderId,
            phraseType: data.phraseType,
            phraseText: data.phraseText,
            phraseColor: data.phraseColor
      };

      // Save Photo in the database
      AdditionalPhrases.create(newPhrase).then(data => {
      console.log("Finished creating additionalPhrase entry:", data);
      res.send(data);
      }).catch(err => {
            res.status(500).send({
            message:
            err.message || "Some error occurred while creating the AdditionalPhrase."
            });
      });
};

exports.getAdditionalPhrases = (req, res) => {
      AdditionalPhrases.findAll().then(data => {
        res.send(data);
      }).catch(err => {
        res.status(500).send({
          message:
              err.message || "Some error occurred while retrieving additional phrases."
          });
      });
    }

exports.delete = (req, res) => {
      const id = req.params.id;
      AdditionalPhrases.destroy({
        where: {orderId: id}
      }).then(num => {
        if(num === 1) {
          res.send("AddPhrase with order #" + id + " was deleted successfully");
        } else {
          res.send({
            message: "Cannot delete AddPhrase with order #" + id
          });
        }
      }).catch(err => {
        res.status(500).send({
          message: "could not delete order"
        })
      })
    }