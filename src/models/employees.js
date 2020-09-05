module.exports = (sequelize, DataTypes) => {
  const Employees = sequelize.define(
    "Employees",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      ruleAccess: {
        // 0: admin, 1: employee
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
  Employees.associate = () => {
    // associations can be defined here
  };
  return Employees;
};