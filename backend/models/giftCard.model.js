module.exports = (sequelize, Sequelize) => {
    const GiftCards = sequelize.define("giftCards", {
            giftCardId: {
                    type: Sequelize.STRING,
                    allowNull: false,
                    primaryKey: true
            },
            giftCardAmount: {
                    type: Sequelize.STRING,
                    allowNull: false,
            },
            giftCardDate: {
                    type: Sequelize.STRING,
                    allowNull: false,
            }
    });
    GiftCards.removeAttribute('id');
    return GiftCards;
};