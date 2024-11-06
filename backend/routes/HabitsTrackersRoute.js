// On importe les dépendances dont on a besoin
import express from "express" // framework js express pour créer notre application
import {HabitsTrackers} from "../models/HabitsTrakersModel.js"; // notre schéma projet

// On crée un routeur qui va gérer toutes nos routes pour les utilisateurs
const router = express.Router();

// Route pour CRÉER un nouveau projet (POST)
router.post('', async (request, response) => {
    try {
        // On vérifie si tous les champs obligatoires sont remplis
        if (!request.body.habitname || !request.body.user || !request.body.icone || !request.body.date) {
            return response.status(400).send({
                message: "Veuillez fournir tous les champs, bordel",
            });
        }
 
        // On prépare les données du nouveau projet
        const newHabitTracker = {
            icone: request.body.icone,
            habitname: request.body.habitname,
            user: request.body.user,
            date: request.body.date,
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
        const { id } = request.params;
        const { habitname, date, icone, isCompleted } = request.body;

        // iscompleted est validé seulement si il est dans la requete
        if (isCompleted !== undefined && typeof isCompleted !== 'boolean') {
            return response.status(400).json({
                message: "isCompleted doit être un booléen (true/false)"
            });
        }

        // champ pour les maj pour éviter que iscompleted  sois envoyer si il n'y est pas
        const updateFields = { habitname, date, icone };
        if (isCompleted !== undefined) {
            updateFields.isCompleted = isCompleted;
        }

        const result = await HabitsTrackers.findByIdAndUpdate(
            id,
            updateFields,
            { new: true }
        );

        if (!result) {
            return response.status(404).json({
                message: "Habitude non trouvée"
            });
        }

        return response.status(200).json(result);

    } catch (error) {
        console.error('Erreur lors de la mise à jour :', error.message);
        return response.status(500).json({
            message: "Erreur lors de la mise à jour de l'habitude",
            error: error.message
        });
    }
});

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

// Route pour RÉCUPÉRER les habitudes d'un utilisateur spécifique (GET)
router.get('/user/:userId', async (request, response) => {
    try {
        const { userId } = request.params;
        const habits = await HabitsTrackers.find({ user: userId });
        return response.status(200).json({
            count: habits.length,
            data: habits
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
 });

// On exporte notre routeur pour l'utiliser dans notre application
export default router;