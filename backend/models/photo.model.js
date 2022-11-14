module.exports = (sequelize, Sequelize) => {
      const Photo = sequelize.define("photos", {
            photoId: {
                  type: Sequelize.STRING,
                  allowNull: false,
                  primaryKey: true
            },
            orderId: {
                  type: Sequelize.STRING,
                  allowNull: false,
            },
            photoName: {
                  type: Sequelize.STRING,
                  allowNull: false,
            }
      });
      Photo.removeAttribute('id');
      return Photo;
};