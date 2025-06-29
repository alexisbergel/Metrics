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