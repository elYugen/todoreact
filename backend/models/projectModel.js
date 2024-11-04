// on importe mongoose qui nous aide à travailler avec la base de données mongodb
import mongoose from "mongoose";

// on crée un schema qui décrit comment seront stockées les informations des utilisateurs
const ProjectSchema = new mongoose.Schema(
   {
       // nom du projet:
       // doit être du texte (String)
       // est obligatoire (required: true)
       // doit être unique (unique: true)
       projectname: { type: String, required: true, unique: true },

       // description projet :
       // doit être du texte
       description: { type: String },

       // récupère les taches de l'utilisateur dans la base de donnée
       tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],

       icone: { type: String, default: '🤹'},

       // le projet est lié à un utilisateur
       user: { type: String, required: true },

       // nombre d'xp que rapporte un projet
       xp: { type: Number, default: 50 }, 

       // si le projet est fini ou pas
       completed: { type: Boolean, default: false }

   },

   {
       // ajoute automatiquement la date de création et de dernière modification
       timestamps: true
   }
);

// on crée le modèle 'User' à partir de notre schema ci dessus
// c'est ce modèle qu'on utilisera pour créer, modifier ou rechercher des utilisateurs
export const Projects = mongoose.model('projects', ProjectSchema);
