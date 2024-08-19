const express = require('express');
const { register, login } = require('../controllers/userController');
const { addBook, getBooks, incrementReadCount } = require('../controllers/bookController');
const { borrowBook, returnBook } = require('../controllers/transactionController');
const { getMonthlyReport } = require('../controllers/analyticsController');
const authenticate = require('../middleware/auth');

const router = express.Router();

// User routes
router.post('/users/register', register);
router.post('/users/login', login);

// Book routes (protected)
router.post('/books/add', authenticate, addBook);
router.get('/books', authenticate, getBooks);
router.patch('/books/:id/increment', authenticate, incrementReadCount);

// Transaction routes (protected)
router.post('/transactions/borrow', authenticate, borrowBook);
router.patch('/transactions/return/:id', authenticate, returnBook);

// Analytics routes (protected)
router.get('/analytics/report', authenticate, getMonthlyReport);

module.exports = router;
