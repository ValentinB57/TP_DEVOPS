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
app.get("/test", (_req, res) => {
  // Envoie une réponse HTTP avec un statut 200 et un message "Hello world"
   res.type("text/plain");
   res.status(200).send("Hello world")
})

// Ajoute une route pour la requête GET '/about'
app.get("/about", (_req, res) => {
  // Envoie une réponse HTTP avec un statut 200 et un message "This is an about page"
   res.type("text/plain");
  res.status(200).send("This is an about page")
})

// Ajoute une route pour la requête GET '/contact'
app.get("/contact", (_req, res) => {
  // Envoie une réponse HTTP avec un statut 200 et un message "Contact us at"
   res.type("text/plain");
  res.status(200).send("Contact us at contact@example.com")
})

// Ajoute une route pour la requête GET '/users/:id'
app.get("/users/:id", (req, res) => {
  // Envoie une réponse HTTP avec un statut 200 et un message "Displaying information for user with ID: ${ req.params.id }"
   res.type("text/plain");
  res.status(200).send("Displaying information for user with ID: ${ req.params.id }")
})

// Ajoute une page de base  pour les toutes les routes non définies'

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/minecraft.html'));
});


// Exporte l'instance de l'application pour pouvoir l'utiliser dans d'autres fichiers
module.exports = app;

//test d'un push qui valide les tests