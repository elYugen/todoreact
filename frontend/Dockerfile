# Utiliser l'image Node.js officielle
FROM node:18

# Créer un répertoire de travail pour l'application
WORKDIR /app

# Copier package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tout le code de l'application dans le conteneur
COPY . .

# Exposer le port que le serveur de développement React utilise (par défaut 3000)
EXPOSE 3000

# Commande pour démarrer l'application en mode développement avec watch
CMD ["npm", "start"]
