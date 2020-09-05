module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.createTable('OTPCustomers', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.INTEGER,
                autoIncrement: true,
                autoIncrement: 1
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false
            },
            OTP: {
                type: Sequelize.STRING,
                allowNull: true
            },
            timeSend: {
                type: Sequelize.DATE,
                allowNull: true
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: true
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: true
            }
        }),
    down: queryInterface => queryInterface.dropTable('OTPCustomers')
};