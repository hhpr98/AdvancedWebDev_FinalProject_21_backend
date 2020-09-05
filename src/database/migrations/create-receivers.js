module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.createTable('Receivers', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.INTEGER,
                autoIncrement: true,
                autoIncrement: 1
            },
            userId: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            receiverId: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            accountNumber: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            memorizeName: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            type: {
                type: Sequelize.ENUM('NOI BO', 'LIEN NGAN HANG'),
                allowNull: false
            },
            bankId: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            bankName: {
                type: Sequelize.STRING,
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
    down: queryInterface => queryInterface.dropTable('Receivers')
};