const express = require('express');
const { addBook, getBooks, incrementReadCount } = require('../controllers/bookController');
const router = express.Router();

router.post('/add', addBook);
router.get('/', getBooks);
router.patch('/:id/increment', incrementReadCount);

module.exports = router;
