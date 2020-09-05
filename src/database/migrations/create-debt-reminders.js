module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.createTable('DebtReminders', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.INTEGER,
                autoIncrement: true,
                autoIncrement: 1
            },
            accountNumber: { // STK nhắc nợ
                type: Sequelize.STRING,
                allowNull: false
            },
            debtReminderAccountNumber: { // STK bị nhắc nợ
                type: Sequelize.STRING,
                allowNull: false
            },
            amount: { // số tiền chuyển
                type: Sequelize.BIGINT,
                allowNull: false
            },
            description: { // nội dung nhắc nợ
                type: Sequelize.STRING,
                allowNull: true
            },
            status: { // trạng thái
                type: Sequelize.ENUM('DA THANH TOAN', 'CHUA THANH TOAN')
            },
            isDeleted: {
                // true : deleted , false : have debt reminder
                type: Sequelize.BOOLEAN
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
    down: queryInterface => queryInterface.dropTable('DebtReminders')
};