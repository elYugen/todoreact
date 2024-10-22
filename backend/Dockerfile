# Étape 1 : Construction du backend Node.js
FROM node:18 AS node-build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Étape 2 : Configuration de Nginx et démarrage de nodemon + Nginx
FROM nginx:latest

COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN rm -rf /usr/share/nginx/html/*

COPY --from=node-build /app /app

RUN npm install -g nodemon

EXPOSE 80

COPY start.sh /start.sh
RUN chmod +x /start.sh

CMD ["/start.sh"]
