const express = require('express');
const path = require('path');
require('dotenv').config();
const app = express();

const PORT = process.env.PORT || 3000;

// Setup EJS engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware for static files
app.use(express.static(path.join(__dirname, '../public')));

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simple route for testing
app.get('/', (req, res) => {
  res.render('index', { title: 'Accueil' });
});

// Test route to check if db connection works
const dbTestRoute = require('./routes/dbtest');
app.use('/dbtest', dbTestRoute);

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});