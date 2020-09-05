module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.createTable('ForeignBanks', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.INTEGER,
                autoIncrement: true,
                autoIncrement: 1
            },
            bankingName: {
                type: Sequelize.STRING,
                allowNull: false
            },
            bankingSortName: {
                type: Sequelize.STRING,
                allowNull: false
            },
            urlInfo: {
                type: Sequelize.STRING,
                allowNull: false
            },
            urlTransaction: {
                type: Sequelize.STRING,
                allowNull: false
            },
            localSecretKey: {
                type: Sequelize.STRING,
                allowNull: false
            },
            foreignSecretKey: {
                type: Sequelize.STRING,
                allowNull: false
            },
            foreignPublicKey: {
                type: Sequelize.STRING(1023),
                allowNull: false
            },
            localCompanyID: {
                type: Sequelize.STRING,
                allowNull: false
            },
            foreignCompanyID: {
                type: Sequelize.STRING,
                allowNull: false
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
    down: queryInterface => queryInterface.dropTable('ForeignBanks')
};