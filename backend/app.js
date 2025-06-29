const express = require('express');
const path = require('path');
require('dotenv').config();
const app = express();
const cors = require('cors');
const router = require('./routes/index');

const PORT = process.env.PORT || 5000;

// Setup CORS
app.use(cors({
  origin: 'http://localhost:3000',
}));

// Setup EJS engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware for static files
app.use(express.static(path.join(__dirname, '../public')));

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Router
app.use('/api', router);

app.get('/test', (req, res) => {
  console.log('Test route accessed');
  res.send('Test route OK');
});

// Error handling middleware
const errorHandler = require('./middlewares/errorHandler');
app.use(errorHandler);

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});