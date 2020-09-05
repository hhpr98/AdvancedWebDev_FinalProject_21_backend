module.exports = (sequelize, DataTypes) => {
    const TransactionEmployees = sequelize.define(
        "TransactionEmployees",
        {
            id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.INTEGER,
                autoIncrement: true,
                autoIncrement: 1
            },
            employeeId: { // nhân viên nạp tiền vào || admin
                type: DataTypes.STRING,
                allowNull: false
            },
            paymentTo: { // STK nhận
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
    TransactionEmployees.associate = () => {
        // associations can be defined here
    };
    return TransactionEmployees;
};