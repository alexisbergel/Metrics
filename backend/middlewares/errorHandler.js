function errorHandler(err, req, res, next) {
    console.error(err.stack);
    res.status(500).json({
        status: 'error',
        message: err.message || 'Internal Server Error',
        details: err.details || null
    });
}

module.exports = errorHandler;