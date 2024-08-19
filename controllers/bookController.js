const { Book } = require('../models');

const addBook = async (req, res) => {
  const { title, author, category } = req.body;

  try {
    const book = await Book.create({ title, author, category });
    res.json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const incrementReadCount = async (req, res) => {
  const { id } = req.params;

  try {
    const book = await Book.findByPk(id);
    book.readCount += 1;
    await book.save();
    res.json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { addBook, getBooks, incrementReadCount };
