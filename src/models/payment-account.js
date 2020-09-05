module.exports = (sequelize, DataTypes) => {
  const PaymentAccounts = sequelize.define(
    "PaymentAccounts",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        autoIncrement: 1
      },
      accountNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          // 13 số
          len: [10, 15]
        },
        unique: true
      },
      customerId: {
        type: DataTypes.STRING,
        allowNull: false
      },
      balance: {
        type: DataTypes.BIGINT(10), // max 9 bilions
        allowNull: false
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
  PaymentAccounts.associate = (models) => {
    // associations can be defined here
    PaymentAccounts.hasMany(models.Transactions,{
      foreignKey: 'accountNumber', 
      as: 'Transactions'
    })
  };
  return PaymentAccounts;
};