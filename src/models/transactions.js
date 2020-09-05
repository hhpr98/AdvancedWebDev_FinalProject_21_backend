module.exports = (sequelize, DataTypes) => {
    const Transactions = sequelize.define(
        "Transactions",
        {
            id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.INTEGER,
                autoIncrement: true,
                autoIncrement: 1
            },
            accountNumber: { // STK chuyển
                type: DataTypes.STRING,
                allowNull: false
            },
            receiverNumber: { // STK nhận
                type: DataTypes.STRING,
                allowNull: false
            },
            amount: { // số tiền chuyển
                type: DataTypes.BIGINT,
                allowNull: false
            },
            description: { // nội dung chuyển tiền
                type: DataTypes.STRING,
                allowNull: true
            },
            type: {
                type: DataTypes.ENUM('NOI BO', 'LIEN NGAN HANG', 'THANH TOAN NHAC NO'),
                allowNull: false,
            },
            bankId: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            sign: { // chữ kí của ngân hàng liên kết sau mỗi giao dịch, ngân hàng nội bộ thì để null
                type: DataTypes.STRING(1023),
                allowNull: true
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: true
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: true
            }
        },
        {}
    );
    Transactions.associate = () => {
        // associations can be defined here
    };
    return Transactions;
};