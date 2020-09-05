module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.createTable('TransactionEmployees', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.INTEGER,
                autoIncrement: true,
                autoIncrement: 1
            },
            employeeId: { // nhân viên nạp tiền vào || admin
                type: Sequelize.STRING,
                allowNull: false
            },
            paymentTo: { // STK nhận
                type: Sequelize.STRING,
                allowNull: false
            },
            amount: { // số tiền chuyển
                type: Sequelize.BIGINT,
                allowNull: false
            },
            description: { // nội dung chuyển tiền
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
    down: queryInterface => queryInterface.dropTable('TransactionEmployees')
};