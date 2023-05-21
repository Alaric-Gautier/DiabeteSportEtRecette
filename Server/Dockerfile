FROM node:18.15.0-alpine

# Définir le répertoire de travail
WORKDIR /app

COPY package.json ./

# Installer un compilateur
# RUN apk add --no-cache make gcc g++ python3

# Installer les dépendances
RUN npm install

# Copier les fichiers nécessaires dans le conteneur
COPY . .

# Exposer le port utilisé par le serveur
EXPOSE 8000

# Lancer le serveur
CMD ["npm", "run", "dev"]