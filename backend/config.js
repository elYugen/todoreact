// importe le module 'dotenv' qui permet de charger les variables d'environnement contenu dans le .env
import dotenv from 'dotenv';

// charge les variables d'environnement depuis le fichier .env
// les variables seront accessibles via process.env
dotenv.config();

// exporte la variable PORT qui est contenu dans le fichier .env
export const PORT = process.env.PORT;

// exporte l'url de connexion mongodb contenu le fichier .env
export const mongoDBURL = process.env.MONGODB_URI;

// Log pour le débogage
console.log('Configuration de connexion MongoDB:');
console.log('URL:', mongoDBURL);