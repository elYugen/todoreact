// On importe les dépendances dont on a besoin
import express from "express" // framework js express pour créer notre application
import {Task} from "../models/taskModel.js"; // notre schéma utilisateur

// On crée un routeur qui va gérer toutes nos routes pour les utilisateurs
const router = express.Router();

// Route pour CRÉER un nouvel utilisateur (POST)
router.post('', async (request, response) => {
    try {
        // On vérifie si tous les champs obligatoires sont remplis
        if (!request.body.name || !request.body.category || !request.body.date || !request.body.contenu || !request.body.author) {
            return response.status(400).send({
                message: "Veuillez fournir tous les champs, bordel",
            });
        }
 
        // On prépare les données du nouvel utilisateur
        const newTask = {
            name: request.body.name,
            category: request.body.category,
            date: request.body.date,
            contenu: request.body.contenu,
            author: request.body.author,
        };
 
        // On crée l'utilisateur dans la base de données
        const task = await Task.create(newTask);
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
       const task = await Task.findById(id);  // On cherche l'utilisateur
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
       const { id } = request.params  // On récupère l'ID de l'utilisateur à modifier
       // On met à jour l'utilisateur avec les nouvelles données
       const result = await Task.findByIdAndUpdate(id, request.body, {new: true})
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

<<<<<<< HEAD
// Route pour RÉCUPÉRER les tasks d'un utilisateur spécifique (GET)
router.get('/user/:userId', async (request, response) => {
    try {
        const { userId } = request.params;
        const task = await Task.find({ author: userId });
        return response.status(200).json({
            count: task.length,
            data: task
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
 });

=======
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

  
>>>>>>> origin/main
// On exporte notre routeur pour l'utiliser dans notre application
export default router;