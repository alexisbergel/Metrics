const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();

// Port depuis le .env ou 3000 par défaut
const PORT = process.env.PORT || 3000;

// Définir EJS comme moteur de template
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Servir les fichiers statiques depuis /public
app.use(express.static(path.join(__dirname, '../public')));

// Middleware pour parser les données envoyées via formulaire
app.use(express.urlencoded({ extended: true }));

// Route simple de test
app.get('/', (req, res) => {
  res.render('index', { title: 'Accueil' });
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});