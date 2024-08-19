const User = require('./User');
const Book = require('./Book');
const Transaction = require('./Transaction');

// Define associations
User.hasMany(Transaction, { foreignKey: 'userId' });
Book.hasMany(Transaction, { foreignKey: 'bookId' });
Transaction.belongsTo(User, { foreignKey: 'userId' });
Transaction.belongsTo(Book, { foreignKey: 'bookId' });

// Export all models including their associations
module.exports = {
  User,
  Book,
  Transaction
};
