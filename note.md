# Crée une image Docker à partir du Dockerfile
docker build -t node-app:latest .

# Démarre un conteneur à partir de l'image créée précédemment
# -d : permet de démarrer le conteneur en arrière-plan
# -p : permet de publier les ports exposés par le conteneur pour les rendre accessibles depuis l'hôte. ici on expose le port 3000 de l'hôte avec le port 3000 du conteneur
docker run -d -p 3000:3000 node-app:latest



#deploiement


https://app.netlify.com/sites/zesty-fudge-22a680/settings/deploys