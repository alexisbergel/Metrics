const pool = require('../config/db');

exports.getAllTransactions = async (req, res, next) => { 
    try {
        const result = await pool.query('SELECT * FROM transactions ORDER BY date DESC');
        res.json(result.rows);
    } catch (error) {
        next(error);
    }
}

exports.createTransaction = async (req, res, next) => {
    const { type, amount, label } = req.body;
    const date = new Date();

    try {
        const result = await pool.query(
            'INSERT INTO transactions (type, amount, label, date) VALUES ($1, $2, $3, $4) RETURNING *',
            [type, amount, label, date]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

exports.editTransaction = async (req, res, next) => {
    const { id } = req.params;
    const { executed } = req.body;

    if (typeof executed !== 'boolean') {
        // TODO: write a custom error handler
        return res.status(400).json({ message: 'Invalid executed status' });
    }

    try {
        const result = await pool.query(
            'UPDATE transactions SET executed = $1 WHERE id = $2 RETURNING *',
            [executed, id]
        );

        if (result.rows.length === 0) {
            // TODO: write a custom error handler
            return res.status(404).json({ message: 'Transaction not found' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}