module.exports = (sequelize, DataTypes) => {
    const DebtReminders = sequelize.define(
        "DebtReminders",
        {
            id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.INTEGER,
                autoIncrement: true,
                autoIncrement: 1
            },
            accountNumber: { // STK nhắc nợ
                type: DataTypes.STRING,
                allowNull: false
            },
            debtReminderAccountNumber: { // STK bị nhắc nợ
                type: DataTypes.STRING,
                allowNull: false
            },
            amount: { // số tiền chuyển
                type: DataTypes.BIGINT,
                allowNull: false
            },
            description: { // nội dung nhắc nợ
                type: DataTypes.STRING,
                allowNull: true
            },
            status: { // trạng thái
                type: DataTypes.ENUM('DA THANH TOAN', 'CHUA THANH TOAN')
            },
            isDeleted: {
                // true : deleted , false : have debt reminder
                type: DataTypes.BOOLEAN
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
    DebtReminders.associate = () => {
        // associations can be defined here
    };
    return DebtReminders;
};