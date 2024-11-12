# image de base
FROM node:20 AS build

# créer un dossier app
WORKDIR /app
COPY ./package*.json ./
RUN npm install
COPY . .
# RUN npm run dev
ENV CHOKIDAR_USEPOLLING=true
ENV VITE_WATCH_POLL=true

EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]
