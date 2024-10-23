// importe toutes les dépendances
import express from "express"; // express pour créer notre application
import { PORT, mongoDBURL } from "./config.js"; // on recup les informations de configuration
import mongoose from "mongoose"; // pour se connecter à la base de données mongodb
import cors from "cors"; // permet à notre application de communiquer avec d'autres sites
import session from "express-session"; // garde en mémoire les informations des utilisateurs connecté
import MongoStore from 'connect-mongo'; // stocke les informations de connexion dans mongodb
import userRoute from "./routes/usersRoute.js"; // la route contenant le crud lié aux utilisateurs

// on crée notre application web avec Express
const app = express();

// on choisit sur quel port notre site sera accessible
const port = process.env.PORT; 

// démarre notre serveur
app.listen(port, () => {
 console.log(`serveur en cours sur le port http://localhost:${port}`);
});

// configure qui a le droit de requeter sur notre application
app.use(cors({ 
 // origin: '*',  // autorise toutes les adresses
 origin: 'http://localhost:5173',  // autorise uniquement cette adresse
 methods: ["GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS"],  // les actions autorisées
 credentials: true,    // autorise l'envoi d'informations de connexion
 optionsSuccessStatus: 200,  // code qui dit que tout s'est bien passé
}));

// Permet de comprendre les messages envoyés en format JSON
app.use(express.json());

// route par défaut de l'application
app.get('/', (req, res) => {
   console.log(req);  // on affiche les détails de la requete dans la console
   return res.status(200).send('Bonjour');  // on renvoie bonjour
});

// route lié aux utilisateurs
app.use('/users', userRoute);