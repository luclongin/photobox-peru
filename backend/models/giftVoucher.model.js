module.exports = (sequelize, Sequelize) => {
    const GiftVouchers = sequelize.define("giftVouchers", {
            voucherId: {
                    type: Sequelize.STRING,
                    allowNull: false,
                    primaryKey: true
            },
            userId: {
                    type: Sequelize.STRING,
                    allowNull: false,
            },
            voucherAmount: {
                    type: Sequelize.STRING,
                    allowNull: false,
            },
            voucherDate: {
                    type: Sequelize.STRING,
                    allowNull: false,
            }
    });
    GiftVouchers.removeAttribute('id');
    return GiftVouchers;
};