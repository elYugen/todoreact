// Import des dépendances nécessaires
import express from "express";  // Framework web pour Node.js
import bcrypt from "bcryptjs";  // Bibliothèque pour le hachage des mots de passe
import { User } from "../models/userModel.js";  // Import du modèle utilisateur MongoDB

// Création d'un routeur Express pour gérer les routes d'authentification
const router = express.Router();

/**
 * Route pour l'inscription d'un nouvel utilisateur
 * Méthode HTTP: POST
 * URL: /register
 * Corps de la requête attendu: { username, password, email }
 */
router.post('/register', async (request, response) => {
    try {
        // Extraction des données du corps de la requête
        const { username, password, email } = request.body;

        // Vérification que tous les champs requis sont présents
        if (!username || !password || !email) {
            return response.status(400).send({ message: "Veuillez fournir tous les champs" });
        }

        // Hachage du mot de passe pour le sécuriser
        // Le '10' représente le nombre de tours de hachage (plus c'est élevé, plus c'est sécurisé mais lent)
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Création d'un objet utilisateur avec le mot de passe haché
        const newUser = { username, password: hashedPassword, email };

        // Sauvegarde de l'utilisateur dans la base de données
        const user = await User.create(newUser);
        
        // Renvoie l'utilisateur créé avec un code 201 (Created)
        return response.status(201).send(user);

    } catch (error) {
        // Gestion des erreurs : log de l'erreur et envoi d'une réponse d'erreur
        console.error("Erreur lors de l'inscription :", error);
        response.status(500).send({ message: error.message });
    }
});

/**
 * Route pour la connexion d'un utilisateur
 * Méthode HTTP: POST
 * URL: /login
 * Corps de la requête attendu: { email, password }
 */
router.post('/login', async (request, response) => {
    try {
        // Extraction des informations de connexion
        const { email, password } = request.body;
        
        // Recherche de l'utilisateur dans la base de données par son email
        const user = await User.findOne({ email });
        
        // Si l'utilisateur n'existe pas, renvoyer une erreur
        if (!user) {
            return response.status(401).send({ message: 'Utilisateur non trouvé' });
        }

        // Vérification du mot de passe en comparant le hash stocké
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return response.status(401).send({ message: 'Mot de passe incorrect' });
        }

        // Création de la session utilisateur après connexion réussie
        request.session.userId = user._id;
        request.session.email = user.email;

        // Création d'un objet utilisateur sans le mot de passe pour la réponse
        const userWithoutPassword = {
            _id: user._id,
            email: user.email,
        };

        // Log de débogage pour la session
        console.log("Session après login :", request.session);
        
        // Renvoie les informations utilisateur (sans mot de passe)
        return response.status(200).send(userWithoutPassword);

    } catch (error) {
        // Gestion des erreurs de connexion
        console.error("Erreur lors de la connexion :", error);
        response.status(500).send({ message: error.message });
    }
});

/**
 * Route pour récupérer les informations de l'utilisateur connecté
 * Méthode HTTP: GET
 * URL: /me
 * Nécessite d'être authentifié (session active)
 */
router.get('/me', async (req, res) => {
    // Vérification de l'authentification via la session
    if (!req.session.userId) {
        return res.status(401).send({ message: 'Non authentifié' });
    }

    try {
        // Recherche de l'utilisateur par son ID (stocké dans la session)
        // Le '.select('-password')' exclut le champ password des résultats
        const user = await User.findById(req.session.userId).select('-password');
        
        if (!user) {
            return res.status(404).send({ message: 'Utilisateur non trouvé' });
        }
        
        // Renvoie les informations utilisateur
        res.status(200).send(user);
    } catch (error) {
        console.error("Erreur lors de la récupération de l'utilisateur :", error);
        res.status(500).send({ message: error.message });
    }
});

/**
 * Route pour la déconnexion
 * Méthode HTTP: POST
 * URL: /logout
 * Détruit la session utilisateur
 */
router.post('/logout', (request, response) => {
    // Destruction de la session
    request.session.destroy((err) => {
        if (err) {
            console.error("Erreur lors de la déconnexion :", err);
            return response.status(500).send({ message: 'Erreur lors de la déconnexion' });
        }
        // Confirmation de la déconnexion réussie
        response.status(200).send({ message: 'Déconnecté avec succès' });
    });
});

// Export du routeur pour être utilisé dans l'application principale
export default router;