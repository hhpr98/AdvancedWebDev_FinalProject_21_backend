module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.createTable('SaveAccounts', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.INTEGER,
                autoIncrement: true,
                autoIncrement: 1
            },
            accountNumber: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    // 13 số
                    len: [10, 15]
                }
            },
            customerId: {
                type: Sequelize.STRING,
                allowNull: false
            },
            balance: {
                type: Sequelize.BIGINT(10), // max 9 bilions
                allowNull: false
            },
            expired: {
                // 6 , 12
                type: Sequelize.INTEGER,
                allowNull: false
            },
            rate: {
                // lãi suất : 1,2,3 (tự hiểu 1%,2%,3%)
                type: Sequelize.INTEGER,
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
    down: queryInterface => queryInterface.dropTable('SaveAccounts')
};