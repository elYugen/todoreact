// On importe mongoose qui nous aide à travailler avec la base de données MongoDB
import mongoose from "mongoose";

// On crée un schema qui décrit comment seront stockées les informations des tâches
const TaskSchema = new mongoose.Schema(
   {
       // Nom de la tâche :
       // Doit être du texte (String)
       // Est obligatoire (required: true)
       // Doit être unique (unique: true)
       name: { type: String, required: true, unique: true },

       // Catégorie de la tâche :
       // Doit être du texte
       category: { type: String },

       // Date de la tâche :
       // Doit être du texte
       // Est obligatoire
       date: { type: String, required: true },

       // Contenu de la tâche :
       // Doit être du texte
       // Est obligatoire
       contenu: { type: String, required: true },

       // Auteur de la tâche :
       // Doit être du texte
       // Est obligatoire
       author: { type: String, required: true },

       // Statut de complétion :
       // Doit être un booléen
       // Par défaut, la tâche n'est pas complétée
       isCompleted: { type: Boolean, default: false }
   },
   {
       // Ajoute automatiquement la date de création et de dernière modification
       timestamps: true
   }
);

// On crée le modèle 'Task' à partir de notre schema ci-dessus
// C'est ce modèle qu'on utilisera pour créer, modifier ou rechercher des tâches
export const Task = mongoose.model('Task', TaskSchema);
