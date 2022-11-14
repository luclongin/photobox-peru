module.exports = (sequelize, Sequelize) => {
      const AdditionalPhrase = sequelize.define("additionalphrases", {
            phraseId: {
                  type: Sequelize.STRING,
                  allowNull: false,
                  primaryKey: true
            },
            orderId: {
                  type: Sequelize.STRING,
                  allowNull: false,
            },
            phraseType: {
                  type: Sequelize.STRING,
                  allowNull: false,
            },
            phraseText: {
                  type: Sequelize.STRING,
                  allowNull: false,
            }
      });
      AdditionalPhrase.removeAttribute('id');
      return AdditionalPhrase;
};