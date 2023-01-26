const app = require("./app");

// Définit le port sur lequel l'application écoute
const port = process.env.PORT || 3000;

// Démarre l'application en écoutant sur le port spécifié
app.listen(port, () => {
  console.log(`Application écoute sur le port ${port}`);
});
