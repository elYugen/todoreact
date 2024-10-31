#image de base
FROM node:20

# créer un dossier app
WORKDIR /app
COPY package*.json ./
RUN npm install
# COPY . .
RUN npm install -g nodemon

EXPOSE 80
CMD ["nodemon", "--legacy-watch", "server.js"]
