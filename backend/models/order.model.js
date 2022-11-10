module.exports = (sequelize, Sequelize) => {
      const Order = sequelize.define("orders", {
            orderId: {
                  type: Sequelize.STRING,
                  allowNull: false,
                  primaryKey: true
            },
            userId: {
                  type: Sequelize.STRING,
                  allowNull: false,
            },
            productType: {
                  type: Sequelize.STRING,
                  allowNull: false,
            },
            deliveryType: {
                  type: Sequelize.STRING,
                  allowNull: false,
            }
      });
      Order.removeAttribute('id');
      return Order;
};