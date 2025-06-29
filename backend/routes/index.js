const express = require('express');
const router = express.Router();

// Transactions routes
const TransactionsRoutes = require('./transactions');
router.use('/transactions', TransactionsRoutes);

module.exports = router;