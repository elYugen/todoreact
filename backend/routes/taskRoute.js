// On importe les dépendances dont on a besoin
import express from "express" // framework js express pour créer notre application
import {Task} from "../models/taskModel.js"; // notre schéma taches
import { Projects } from '../models/projectModel.js';
import { updateUserXP } from '../utils/xpManager.js'; // xp manager

// On crée un routeur qui va gérer toutes nos routes pour les taches
const router = express.Router();

// Route pour CRÉER une nouvelle tache (POST)
router.post('', async (request, response) => {
    try {
        // On vérifie si tous les champs obligatoires sont remplis
        if (!request.body.name || !request.body.project || !request.body.date || !request.body.contenu || !request.body.author) {
            return response.status(400).send({
                message: "Veuillez fournir tous les champs, bordel",
            });
        }
 
        // On prépare les données de la nouvelle tache
        const newTask = {
            name: request.body.name,
            project: request.body.project,
            date: request.body.date,
            contenu: request.body.contenu,
            author: request.body.author,
        };
 
        // On crée la tache dans la base de données
        const task = await Task.create(newTask);

        // Ajoutez l'ID de la tâche au projet
        await Projects.findByIdAndUpdate(request.body.project, {
            $addToSet: { tasks: task._id } // Ajoutez l'ID de la tâche au tableau des tâches du projet
        });
        return response.status(201).send(task);
 
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
       const tasks = await Task.find();
       return response.status(200).json({
           count: tasks.length,  // Nombre total d'utilisateurs
           data: tasks          // Liste des utilisateurs
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
       const task = await Task.findById(id); 
       return response.status(200).json(task)
   } catch (error) {
       // Gestion des erreurs
       console.log(error.message);
       response.status(500).send({message:error.message})
   }
})

// Route pour MODIFIER un utilisateur (PUT)
router.put('/:id', async (request, response) => {
    try {
        // Extrait l'ID de la tâche des paramètres de la requête
        const { id } = request.params;

        // Met à jour la tâche dans la base de données et récupère la version mise à jour
        const updatedTask = await Task.findByIdAndUpdate(id, request.body, { new: true });

        // Vérifie si la tâche vient d'être complétée
        if (updatedTask.isCompleted) {
            // Trouve le projet associé à cette tâche et peuple ses tâches
            const project = await Projects.findOne({ tasks: id }).populate('tasks');
            
            // Vérifie si toutes les tâches du projet sont complétées
            const allTasksCompleted = project.tasks.every(task => task.isCompleted);
            
            // Si toutes les tâches sont complétées et que le projet n'était pas déjà marqué comme terminé
            if (allTasksCompleted && !project.completed) {
                // Marque le projet comme terminé
                project.completed = true;
                // Sauvegarde les changements du projet
                await project.save();

                // Met à jour l'XP de l'utilisateur associé au projet
                const updatedUser = await updateUserXP(project.user, project.xp);

                // Renvoie une réponse avec les détails de la tâche mise à jour, le niveau et l'XP de l'utilisateur
                return response.status(200).json({
                    message: "Tâche mise à jour et projet fini !",
                    task: updatedTask,
                    userLevel: updatedUser.level,
                    userXP: updatedUser.xp
                });
            }
        }

        // Vérifier si la tâche a été mise à jour avec une nouvelle date d'échéance
        if (updatedTask.date !== request.body.date) {
            // Calculer la date à laquelle la notification doit être envoyée (1 jour avant l'échéance)
            const notificationDate = new Date(updatedTask.date);
            notificationDate.setDate(notificationDate.getDate() - 1);

            // Vérifier si la notification doit être envoyée aujourd'hui
            if (notificationDate.toDateString() === new Date().toDateString()) {
                // Envoyer la notification à tous les abonnés
                await sendNotification(
                    subscriptions,
                    `Rappel : Échéance de la tâche "${updatedTask.name}" demain`
                );
            }
        }

        // Si le projet n'est pas terminé, renvoie simplement la tâche mise à jour
        return response.status(200).json(updatedTask);
    } catch (error) {
        // En cas d'erreur, affiche le message d'erreur dans la console
        console.log(error.message);
        // Envoie une réponse d'erreur au client
        response.status(500).send({ message: error.message });
    }
});

// Route pour SUPPRIMER un utilisateur (DELETE)
router.delete('/:id', async (request, response) => {
   try {
       const { id } = request.params  // On récupère l'ID de l'utilisateur à supprimer. En utilisant { id }, vous dites explicitement : "Extrais-moi la propriété id de l'objet request.params et assigne-la à une variable nommée id" 
       const task = await Task.findByIdAndDelete(id)  // On supprime l'utilisateur

       // Si l'utilisateur n'existe pas, on envoie un message d'erreur
       if (!task) {
           response.status(404).json({message:"Cette tâche n'existe pas"})
       }

       // Si tout s'est bien passé, on envoie un message de succès
       response.status(200).send({message: "Cette tâche à bien été supprimée"})
   } catch (error) {
       // Gestion des erreurs
       console.log(error.message);
       response.status(500).send({message:error.message})
   }
})

router.get('/user/:userId', async (request, response) => {
    try {
        const { userId } = request.params;
        const { query } = request.query;

        const filters = { author: userId };
        if (query) {
            filters.name = { $regex: query, $options: 'i' };  
        }

        const tasks = await Task.find(filters);
        return response.status(200).json({
            count: tasks.length,
            data: tasks
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// On exporte notre routeur pour l'utiliser dans notre application
export default router;