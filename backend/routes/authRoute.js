import express from "express";
import bcrypt from "bcryptjs";
import { User } from "../models/userModel.js";

const router = express.Router();

// Inscription
router.post('/register', async (request, response) => {
    try {
        // On vérifie si tous les champs obligatoires sont remplis
        if (!request.body.username || !request.body.password || !request.body.email) {
            return response.status(400).send({
                message: "Veuillez fournir tous les champs, bordel",
            });
        }
 
        // Hash du mot de passe
        const hashedPassword = await bcrypt.hash(request.body.password, 10);
 
        // On prépare les données du nouvel utilisateur
        const newUser = {
            username: request.body.username,
            password: hashedPassword,  // Utilisation du mot de passe haché
            email: request.body.email,
        };
 
        // On crée l'utilisateur dans la base de données
        const user = await User.create(newUser);
        return response.status(201).send(user);
 
    } catch (error) {
        // En cas d'erreur, on envoie un message d'erreur
        console.log(error);
        response.status(500).send({ message: error.message });
    }
});

// Connexion
router.post('/login', async (request, response) => {
    try {
        const { username, password } = request.body;
        const user = await User.findOne({ username });
        if (!user) {
            return response.status(401).send({ message: 'Utilisateur non trouvé' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return response.status(401).send({ message: 'Mot de passe incorrect' });
        }

        // stock les informations utilisateur dans la session
        request.session.userId = user._id;
        request.session.username = user.username;
        request.session.rank = user.rank;

        // Retourne l'utilisateur sans le mot de passe
        const userWithoutPassword = {
            _id: user._id,
            username: user.username,
            rank: user.rank,
        };

        if (err) console.error("Erreur de sauvegarde de session :", err);
        console.log("Session après login :", request.session);
        return response.status(200).send(userWithoutPassword);

    } catch (error) {
        console.log(error);
        response.status(500).send({ message: error.message });
    }
});

router.get('/me', async (req, res) => {
    console.log("Session dans /me :", req.session);
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
        res.status(500).send({ message: error.message });
    }
});


// Déconnexion
router.post('/logout', (request, response) => {
    request.session.destroy();
    response.status(200).send({ message: 'Deconnecté avec succès' });
});

export default router;