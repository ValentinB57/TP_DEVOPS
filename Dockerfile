# Utilise une image de base plus récente et plus sûre
FROM node:14-alpine

# Définit le répertoire de travail
WORKDIR /app

# Copie les fichiers nécessaires à l'installation des dépendances
COPY package.json .
COPY package-lock.json .

# Installe les dépendances
RUN npm ci

# Copie les fichiers de l'application
COPY src/ .

# Expose le port sur lequel l'application écoute
EXPOSE 3000

# Définit la commande à exécuter lorsque le conteneur démarre
CMD ["node", "index.js"]
