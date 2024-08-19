const { Transaction } = require('../models');

const borrowBook = async (req, res) => {
  const { userId, bookId } = req.body;

  try {
    const transaction = await Transaction.create({ userId, bookId });
    res.json(transaction);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const returnBook = async (req, res) => {
  const { id } = req.params;

  try {
    const transaction = await Transaction.findByPk(id);
    transaction.returnDate = new Date();
    await transaction.save();
    res.json(transaction);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { borrowBook, returnBook };
