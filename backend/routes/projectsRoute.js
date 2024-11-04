// On importe les dépendances dont on a besoin
import express from "express" // framework js express pour créer notre application
import {Projects} from "../models/projectModel.js"; // notre schéma projet

// On crée un routeur qui va gérer toutes nos routes pour les utilisateurs
const router = express.Router();

// Route pour CRÉER un nouveau projet (POST)
router.post('', async (request, response) => {
    try {
        // On vérifie si tous les champs obligatoires sont remplis
        if (!request.body.projectname || !request.body.user) {
            return response.status(400).send({
                message: "Veuillez fournir tous les champs, bordel",
            });
        }
 
        // On prépare les données du nouveau projet
        const newProject = {
            projectname: request.body.projectname,
            description: request.body.description,
            user: request.body.user,
            icone: request.body.icone,
            xp: 50,
        };
 
        // On crée le projet dans la base de données
        const project = await Projects.create(newProject);
        return response.status(201).send(project);
 
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
       const { userId } = request.query; // Récupére userId depuis la requête
       const query = userId ?  {user:userId} : {};  //filtre user si userId est fourni
       const projects = await Projects.find(query);
       return response.status(200).json({
           count: projects.length,  // Nombre total de projets
           data: projects         // Liste des projets
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
       const projet = await Projects.findById(id).populate('tasks');  // On cherche le projet
       return response.status(200).json(projet)
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
       const result = await Projects.findByIdAndUpdate(id, request.body, {new: true})
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
       const projet = await Projects.findByIdAndDelete(id)  // On supprime le projet

       // Si le projet n'existe pas, on envoie un message d'erreur
       if (!projet) {
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

// Route pour RÉCUPÉRER les projets d'un utilisateur spécifique (GET)
router.get('/user/:userId', async (request, response) => {
    try {
        const { userId } = request.params;
        const { query } = request.query;

        const filters = { user: userId };
        if (query) {
          filters.projectname = { $regex: query, $options: 'i' };  
        }
        const projects = await Projects.find(filters).populate('tasks');
        
        const projectsWithTaskInfo = projects.map(project => {
            const totalTasks = project.tasks.length;
            const completedTasks = project.tasks.filter(task => task.isCompleted).length;
            return {
                ...project.toObject(),
                taskCount: totalTasks,
                completedTaskCount: completedTasks
            };
        });

        return response.status(200).json({
            count: projectsWithTaskInfo.length,
            data: projectsWithTaskInfo
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

 // ROUTE pour la barre de recherche, qui affiche un resultat en fonction de l'entrée et de l'id utilisateur
// On exporte notre routeur pour l'utiliser dans notre application
export default router;