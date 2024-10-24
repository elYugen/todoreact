// On importe les dépendances dont on a besoin
import express from "express" // framework js express pour créer notre application
import bcrypt from "bcryptjs";  // On importe bcryptjs pour le hachage du mot de passe
import {User} from "../models/userModel.js"; // notre schéma utilisateur

// On crée un routeur qui va gérer toutes nos routes pour les utilisateurs
const router = express.Router();

// Route pour CRÉER un nouvel utilisateur (POST)
router.post('', async (request, response) => {
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
 

// Route pour RÉCUPÉRER TOUS les utilisateurs (GET)
router.get('/', async (request, response) => {
   try {
       // On récupère la liste de tous les utilisateurs
       const users = await User.find();
       return response.status(200).json({
           count: users.length,  // Nombre total d'utilisateurs
           data: users          // Liste des utilisateurs
       })
   } catch (error) {
       // Gestion des erreurs
       console.log(error.message);
       response.status(500).send({message: error.message})
   }
})

// Route pour RÉCUPÉRER UN SEUL utilisateur par son ID (GET)
router.get('/:id', async (request, response) => {
   try {
       const { id } = request.params;  // On récupère l'ID depuis l'URL
       const user = await User.findById(id);  // On cherche l'utilisateur
       return response.status(200).json(user)
   } catch (error) {
       // Gestion des erreurs
       console.log(error.message);
       response.status(500).send({message:error.message})
   }
})

// Route pour MODIFIER un utilisateur (PUT)
router.put('/:id', async (request, response) => {
   try {
       const { id } = request.params  // On récupère l'ID de l'utilisateur à modifier
       // On met à jour l'utilisateur avec les nouvelles données
       const result = await User.findByIdAndUpdate(id, request.body, {new: true})
       return response.status(200).json(result)
   } catch (error) {
       // Gestion des erreurs
       console.log(error.message);
       response.status(404).send({ message: error.message })
   }
})

// Route pour SUPPRIMER un utilisateur (DELETE)
router.delete('/:id', async (request, response) => {
   try {
       const { id } = request.params  // On récupère l'ID de l'utilisateur à supprimer
       const user = await User.findByIdAndDelete(id)  // On supprime l'utilisateur

       // Si l'utilisateur n'existe pas, on envoie un message d'erreur
       if (!user) {
           response.status(404).json({message:"Cet utilisateur n'existe pas"})
       }

       // Si tout s'est bien passé, on envoie un message de succès
       response.status(200).send({message: "Cet utilisateur à bien été supprimé"})
   } catch (error) {
       // Gestion des erreurs
       console.log(error.message);
       response.status(500).send({message:error.message})
   }
})

// On exporte notre routeur pour l'utiliser dans notre application
export default router;