module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.createTable('Transactions', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.INTEGER,
                autoIncrement: true,
                autoIncrement: 1
            },
            accountNumber: { // STK chuyển
                type: Sequelize.STRING,
                allowNull: false
            },
            receiverNumber: { // STK nhận
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
            type: {
                type: Sequelize.ENUM('NOI BO', 'LIEN NGAN HANG', 'THANH TOAN NHAC NO'),
                allowNull: false,
            },
            bankId: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            sign: { // chữ kí của ngân hàng liên kết sau mỗi giao dịch, ngân hàng nội bộ thì để null
                type: Sequelize.STRING(1023),
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
    down: queryInterface => queryInterface.dropTable('Transactions')
};