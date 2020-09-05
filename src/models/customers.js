module.exports = (sequelize, DataTypes) => {
  const Customers = sequelize.define(
    "Customers",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true
      },
      phonenumber: {
        type: DataTypes.STRING,
        allowNull: false
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
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
  Customers.associate = (models) => {
    // associations can be defined here
    Customers.hasOne(models.PaymentAccounts,{
      foreignKey: 'customerId', 
      as: 'PaymentAccounts'
    });
    Customers.hasMany(models.Receivers,{
      foreignKey: 'userId', 
      as: 'Receivers'
    });
    Customers.hasMany(models.SaveAccounts,{
      foreignKey: 'customerId', 
      as: 'SaveAccounts'
    })
  };
  return Customers;
};