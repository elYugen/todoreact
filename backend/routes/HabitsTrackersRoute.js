// On importe les dépendances dont on a besoin
import express from "express" // framework js express pour créer notre application
import {HabitsTrackers} from "../models/HabitsTrakersModel.js"; // notre schéma projet

// On crée un routeur qui va gérer toutes nos routes pour les utilisateurs
const router = express.Router();

// Route pour CRÉER un nouveau projet (POST)
router.post('', async (request, response) => {
    try {
        // On vérifie si tous les champs obligatoires sont remplis
        if (!request.body.habitname || !request.body.user) {
            return response.status(400).send({
                message: "Veuillez fournir tous les champs, bordel",
            });
        }
 
        // On prépare les données du nouveau projet
        const newHabitTracker = {
            icone: request.body.icone,
            habitname: request.body.habitname,
            user: request.body.user,
        };
 
        // On crée le projet dans la base de données
        const habitTracker = await HabitsTrackers.create(newHabitTracker);
        return response.status(201).send(habitTracker);
 
    } catch (error) {
        // En cas d'erreur, on envoie un message d'erreur
        console.log(error);
        response.status(500).send({ message: error.message });
    }
 });
 

// Route pour RÉCUPÉRER TOUS les projets (GET)
router.get('/', async (request, response) => {
   try {
       // On récupère la liste de tous les projets
       const habitsTrackers = await HabitsTrackers.find();
       return response.status(200).json({
           count: habitsTrackers.length,  // Nombre total de projets
           data: habitsTrackers         // Liste des projets
       })
   } catch (error) {
       // Gestion des erreurs
       console.log(error.message);
       response.status(500).send({message: error.message})
   }
})

// Route pour RÉCUPÉRER UN SEUL projet par son ID (GET)
router.get('/:id', async (request, response) => {
   try {
       const { id } = request.params;  // On récupère l'ID depuis l'URL
       const habitsTrackers = await HabitsTrackers.findById(id);  // On cherche le projet
       return response.status(200).json(habitsTrackers)
   } catch (error) {
       // Gestion des erreurs
       console.log(error.message);
       response.status(500).send({message:error.message})
   }
})

// Route pour MODIFIER un utilisateur (PUT)
router.put('/:id', async (request, response) => {
   try {
       const { id } = request.params  // On récupère l'ID du projet à modifier
       // On met à jour le projet avec les nouvelles données
       const result = await HabitsTrackers.findByIdAndUpdate(id, request.body, {new: true})
       return response.status(200).json(result)
   } catch (error) {
       // Gestion des erreurs
       console.log(error.message);
       response.status(404).send({ message: error.message })
   }
})

// Route pour SUPPRIMER un projet (DELETE)
router.delete('/:id', async (request, response) => {
   try {
       const { id } = request.params  // On récupère l'ID du projet à supprimer
       const habitsTrackers = await HabitsTrackers.findByIdAndDelete(id)  // On supprime le projet

       // Si le projet n'existe pas, on envoie un message d'erreur
       if (!habitsTrackers) {
           response.status(404).json({message:"Ce projet n'existe pas"})
       }

       // Si tout s'est bien passé, on envoie un message de succès
       response.status(200).send({message: "Ce projet a bien été supprimé"})
   } catch (error) {
       // Gestion des erreurs
       console.log(error.message);
       response.status(500).send({message:error.message})
   }
})

// On exporte notre routeur pour l'utiliser dans notre application
export default router;