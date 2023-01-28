// This module exports an express app that serves the static files in the public
// directory on the root path. It also serves a GET request to /test that returns
// "Hello world" and a status code of 200.

// Importe le module express
const express = require("express");

// Importe le module path
const path = require('path');

// Crée une instance de l'application express
const app = express();


// Indique à l'application d'utiliser le répertoire 'public' pour servir les fichiers statiques
app.use(express.static('public'));

// Ajoute une route pour la requête GET '/test'
app.get("/test", (_req, res) =>  {
  // Envoie une réponse HTTP avec un statut 200 et un message "Hello world"
  res.status(200).send("Hello world_")
})

// Ajoute une page de base  pour les toutes les routes non définies'

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/minecraft.html'));
});


// Exporte l'instance de l'application pour pouvoir l'utiliser dans d'autres fichiers
module.exports = app;
