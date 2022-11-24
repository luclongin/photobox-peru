module.exports = (sequelize, Sequelize) => {
        const Discounts = sequelize.define("discounts", {
                discountId: {
                        type: Sequelize.STRING,
                        allowNull: false,
                        primaryKey: true
                },
                discountType: {
                        type: Sequelize.STRING,
                        allowNull: false,
                },
                discountAmount: {
                        type: Sequelize.STRING,
                        allowNull: false,
                },
                discountPercentage: {
                        type: Sequelize.STRING,
                        allowNull: false,
                },
                discountStartDate: {
                        type: Sequelize.STRING,
                        allowNull: false,
                },
                discountEndDate: {
                        type: Sequelize.STRING,
                        allowNull: false,
                },
                discountUsedAddresses: {
                        type: Sequelize.STRING,
                        allowNull: false,
                }
                
        });
        Discounts.removeAttribute('id');
        return Discounts;
};

/*
discounts
discountId: string
discountType: coupon/giftCard
discountAmount: int
discountPercentage: int
discountStartDate: date
discountEndDate: date
discountAppliedAddresses: [string]

add available discounts to users? No because there is no sign up
*/