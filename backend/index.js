/************************************/
/*     IMPORTS DES DÉPENDANCES      */
/************************************/
// Express : Framework web Node.js qui simplifie la création d'applications web
import express from "express";

// Configuration : Fichier contenant nos variables d'environnement (port, URL de la base de données)
import { PORT, mongoDBURL } from "./config.js";

// Mongoose : Bibliothèque qui facilite l'interaction avec MongoDB
import mongoose from "mongoose";

// CORS : Cross-Origin Resource Sharing - Permet de sécuriser les requêtes entre différents domaines
import cors from "cors";

// Express-session : Gère les sessions utilisateurs (garde en mémoire qui est connecté)
import session from "express-session";

// Connect-mongo : Stocke les sessions dans MongoDB au lieu de la mémoire du serveur
import MongoStore from 'connect-mongo';

// Import des routes : Fichiers contenant la logique pour différentes parties de l'application
import userRoute from "./routes/usersRoute.js";    // Routes pour la gestion des utilisateurs (CRUD)
import authRoute from "./routes/authRoute.js";      // Routes pour l'authentification
import taskRoute from "./routes/taskRoute.js";
import projectsRoute from "./routes/projectsRoute.js"; // Routes pour la gestion des projets (CRUD)

/************************************/
/*    CRÉATION DE L'APPLICATION     */
/************************************/
// Initialisation de l'application Express
const app = express()

// Définition du port d'écoute (récupéré depuis les variables d'environnement)
const port = process.env.PORT;

/************************************/
/*   CONNEXION BASE DE DONNÉES      */
/************************************/
// Connexion à MongoDB via Mongoose
mongoose
      // Tentative de connexion à l'URL spécifiée dans config.js
      .connect(mongoDBURL)
      // Si la connexion réussit
      .then(() => {
         console.log('Connecté à la base de données');
         // Démarre le serveur web sur le port spécifié
         app.listen(PORT, () => {
            console.log(`App écoute sur le port : ${PORT}`);
         });
      })
      // Si la connexion échoue
      .catch((error) => {
         console.log("Erreur de connexion à MongoDB : ", error);
      });

/************************************/
/*    CONFIGURATION DES SESSIONS    */
/************************************/
// Configuration du système de sessions
app.use(session({
  // Clé secrète utilisée pour signer le cookie de session
  secret: 'jesuisuneclesecreteenculerdemerde',
  
  // Options de session
  resave: false,                // Ne pas sauvegarder la session si elle n'est pas modifiée
  saveUninitialized: false,     // Ne pas créer de session tant qu'il n'y a rien à stocker
  
  // Configuration du stockage des sessions dans MongoDB
  store: MongoStore.create({
    mongoUrl: mongoDBURL,           // URL de connexion à MongoDB
    collectionName: 'sessions',     // Nom de la collection où stocker les sessions
  }),
  
  // Configuration du cookie de session
  cookie: {
    secure: false,      // false car nous n'utilisons pas HTTPS en développement
    httpOnly: true,     // Empêche l'accès au cookie via JavaScript (sécurité)
    maxAge: 1000 * 60 * 60 * 24  // Durée de vie du cookie : 24 heures en millisecondes
  }
}));

/************************************/
/*    CONFIGURATION DU CORS         */
/************************************/
// Configuration des autorisations d'accès à l'API
app.use(cors({ 
 // origin: '*',  // Autoriserait toutes les origines (déconseillé en production)
 origin: 'http://localhost:5173',  // N'autorise que cette origine (notre frontend)
 methods: ["GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS"],  // Méthodes HTTP autorisées
 credentials: true,    // Autorise l'envoi des cookies et en-têtes d'authentification
 optionsSuccessStatus: 200,  // Code de statut pour les requêtes OPTIONS réussies
}));

/************************************/
/*    MIDDLEWARE GÉNÉRAUX          */
/************************************/
// Middleware pour parser le JSON dans les requêtes
app.use(express.json());

/************************************/
/*    DÉFINITION DES ROUTES        */
/************************************/
// Route racine - page d'accueil
app.get('/', (req, res) => {
   console.log(req);  // Log les détails de la requête pour le débogage
   return res.status(200).send('Bonjour');  // Renvoie une réponse simple
});

// Montage des routes pour différentes parties de l'application
app.use('/task', taskRoute);
app.use('/users', userRoute);  // Toutes les routes commençant par /users
app.use('/auth', authRoute);   // Toutes les routes commençant par /auth
app.use('/projects', projectsRoute); //Toutes les routes commençant par /projects

/************************************/
/*    GESTION GLOBALE DES ERREURS  */
/************************************/
// Middleware de gestion d'erreurs - attrapera toutes les erreurs non gérées
app.use((err, req, res, next) => {
   console.error(err.stack);  // Log l'erreur pour le débogage
   res.status(500).send('Quelque chose s\'est mal passé!');  // Renvoie une réponse d'erreur générique
});