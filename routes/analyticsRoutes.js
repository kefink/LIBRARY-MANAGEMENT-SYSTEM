const express = require('express');
const { getMonthlyReport } = require('../controllers/analyticsController');
const router = express.Router();

router.get('/report', getMonthlyReport);

module.exports = router;
