module.exports = (sequelize, DataTypes) => {
  const SaveAccounts = sequelize.define(
    "SaveAccounts",
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
        }
      },
      customerId: {
        type: DataTypes.STRING,
        allowNull: false
      },
      balance: {
        type: DataTypes.BIGINT(10), // max 9 bilions
        allowNull: false
      },
      expired: {
        // 6 , 12
        type: DataTypes.INTEGER,
        allowNull: false
      },
      rate: {
        // lãi suất : 1,2,3 (tự hiểu 1%,2%,3%)
        type: DataTypes.INTEGER,
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
  SaveAccounts.associate = () => {
    // associations can be defined here
  };
  return SaveAccounts;
};