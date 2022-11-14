module.exports = (sequelize, Sequelize) => {
      const Users = sequelize.define("users", {
            userId: {
                  type: Sequelize.STRING,
                  allowNull: false,
                  primaryKey: true
            },
            userFullName: {
                  type: Sequelize.STRING,
                  allowNull: false,
            },
            userEmail: {
                  type: Sequelize.STRING,
                  allowNull: false,
            },
            userAddress: {
                  type: Sequelize.STRING,
                  allowNull: false,
            },
            userPhoneNumber: {
                  type: Sequelize.STRING,
                  allowNull: false,
            },
            userDistrict: {
                  type: Sequelize.STRING,
                  allowNull: false,
            },
            userCity: {
                  type: Sequelize.STRING,
                  allowNull: false,
            }
      });
      Users.removeAttribute('id');
      return Users;
};