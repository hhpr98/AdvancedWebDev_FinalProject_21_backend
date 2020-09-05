module.exports = (sequelize, DataTypes) => {
    const ForeignBanks = sequelize.define(
      "ForeignBanks",
      {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true,
            autoIncrement: 1
        },
        bankingName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        bankingSortName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        urlInfo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        urlTransaction: {
            type: DataTypes.STRING,
            allowNull: false
        },
        localSecretKey: {
          type: DataTypes.STRING,
          allowNull: false
        },
        foreignSecretKey: {
            type: DataTypes.STRING,
            allowNull: false
        },
        foreignPublicKey: {
            type: DataTypes.STRING(1023),
            allowNull: false
        },
        localCompanyID: {
            type: DataTypes.STRING,
            allowNull: false
        },
        foreignCompanyID: {
            type: DataTypes.STRING,
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
    ForeignBanks.associate = () => {
      // associations can be defined here
    };
    return ForeignBanks;
  };