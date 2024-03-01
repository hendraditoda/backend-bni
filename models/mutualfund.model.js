module.exports = (sequelize, DataTypes) => {
  const Score = sequelize.define('MutualFund', {
    transactionId: {
      type: DataTypes.STRING,
    },
    fundId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    DateTime: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    transactionType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    typeOfPayment: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    units: {
      type: DataTypes.DECIMAL(12, 4),
      allowNull: true,
    },
    amount: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: true,
    },
    nav: {
      type: DataTypes.DECIMAL(12, 4),
      allowNull: true,
    },
    fees: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: true,
    },
    tax: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: true,
    },
    totalAmount: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: true,
    },
  });
  return Score;
};
