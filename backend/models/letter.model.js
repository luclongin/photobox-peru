module.exports = (sequelize, Sequelize) => {
    const Letter = sequelize.define("letters", {
          orderId: {
                type: Sequelize.STRING,
                allowNull: false,
                primaryKey: true
          },
          letter1: {
                type: Sequelize.STRING,
                allowNull: false,
          },
          letter2: {
                type: Sequelize.STRING,
                allowNull: false,
          },
          letter3: {
                type: Sequelize.STRING,
                allowNull: false,
          }
    });
    Letter.removeAttribute('id');
    return Letter;
};