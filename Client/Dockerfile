# Étape 1 : construire l'application
FROM node:18.15.0-alpine AS build

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

# Étape 2 : déployer l'application
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]