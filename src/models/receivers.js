module.exports = (sequelize, DataTypes) => {
    const Receivers = sequelize.define(
        "Receivers",
        {
            id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.INTEGER,
                autoIncrement: true,
                autoIncrement: 1
            },
            userId: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            receiverId: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            accountNumber: { // STK của người nhận
                type: DataTypes.STRING,
                allowNull: false,
            },
            memorizeName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            type: {
                type: DataTypes.ENUM('NOI BO', 'LIEN NGAN HANG'),
                allowNull: false
            },
            bankId: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            bankName: {
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
    Receivers.associate = () => {
        // associations can be defined here
    };
    return Receivers;
};