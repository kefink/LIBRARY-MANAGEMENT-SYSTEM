const express = require('express');
const { borrowBook, returnBook } = require('../controllers/transactionController');
const router = express.Router();

router.post('/borrow', borrowBook);
router.patch('/return/:id', returnBook);

module.exports = router;
