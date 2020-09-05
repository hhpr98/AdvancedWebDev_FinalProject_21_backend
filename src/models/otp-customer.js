module.exports = (sequelize, DataTypes) => {
    const OTPCustomers = sequelize.define(
        "OTPCustomers",
        {
            id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.INTEGER,
                autoIncrement: true,
                autoIncrement: 1
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false
            },
            OTP: {
                type: DataTypes.STRING,
                allowNull: true
            },
            timeSend: {
                type: DataTypes.DATE,
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
    OTPCustomers.associate = (models) => {
        // associations can be defined here

    };
    return OTPCustomers;
};