module.exports = (sequelize, Sequelize) => {
      const Order = sequelize.define("orders", {
            photosId: {
                  type: Sequelize.STRING
            },
            additionalPhrasesId: {
                  type: Sequelize.STRING
            },
            deliveryType: {
                  type: Sequelize.STRING
            },
            address: {
                  type: Sequelize.STRING
            }
      });
      return Order;
};