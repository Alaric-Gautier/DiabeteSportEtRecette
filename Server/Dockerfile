FROM node:18-alpine

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers nécessaires dans le conteneur
COPY package*.json ./
COPY . .

# Installer les dépendances
RUN npm install

# Exposer le port utilisé par le serveur
EXPOSE 8000

# Lancer le serveur
CMD ["npm", "run", "dev"]