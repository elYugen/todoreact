import express from "express";
import bcrypt from "bcryptjs";
import { User } from "../models/userModel.js";

const router = express.Router();

// Inscription
router.post('/register', async (request, response) => {
    try {
        const { username, password, email } = request.body;

        // Validation des champs
        if (!username || !password || !email) {
            return response.status(400).send({ message: "Veuillez fournir tous les champs" });
        }

        // Hash du mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = { username, password: hashedPassword, email };

        // Création de l'utilisateur
        const user = await User.create(newUser);
        return response.status(201).send(user);

    } catch (error) {
        console.error("Erreur lors de l'inscription :", error);
        response.status(500).send({ message: error.message });
    }
});

// Connexion avec email
router.post('/login', async (request, response) => {
    try {
        const { email, password } = request.body;
        
        // Rechercher l'utilisateur par email
        const user = await User.findOne({ email });
        
        if (!user) {
            return response.status(401).send({ message: 'Utilisateur non trouvé' });
        }

        // Vérifier le mot de passe
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return response.status(401).send({ message: 'Mot de passe incorrect' });
        }

        // Ajout des informations de session
        request.session.userId = user._id;
        request.session.email = user.email;

        // Exclusion du mot de passe dans la réponse
        const userWithoutPassword = {
            _id: user._id,
            email: user.email,
        };

        console.log("Session après login :", request.session);
        return response.status(200).send(userWithoutPassword);

    } catch (error) {
        console.error("Erreur lors de la connexion :", error);
        response.status(500).send({ message: error.message });
    }
});


// Récupération des informations utilisateur
router.get('/me', async (req, res) => {
    if (!req.session.userId) {
        return res.status(401).send({ message: 'Non authentifié' });
    }

    try {
        const user = await User.findById(req.session.userId).select('-password');
        if (!user) {
            return res.status(404).send({ message: 'Utilisateur non trouvé' });
        }
        res.status(200).send(user);
    } catch (error) {
        console.error("Erreur lors de la récupération de l'utilisateur :", error);
        res.status(500).send({ message: error.message });
    }
});

// Déconnexion
router.post('/logout', (request, response) => {
    request.session.destroy((err) => {
        if (err) {
            console.error("Erreur lors de la déconnexion :", err);
            return response.status(500).send({ message: 'Erreur lors de la déconnexion' });
        }
        response.status(200).send({ message: 'Déconnecté avec succès' });
    });
});

export default router;
