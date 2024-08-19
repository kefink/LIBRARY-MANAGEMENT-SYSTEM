const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Transaction = sequelize.define('Transaction', {
  borrowDate: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  returnDate: { type: DataTypes.DATE },
}, {
  timestamps: true, // This will automatically add `createdAt` and `updatedAt` fields
});

module.exports = Transaction;
