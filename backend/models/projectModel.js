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

       user: { type: String, required: true },

   },

   {
       // ajoute automatiquement la date de création et de dernière modification
       timestamps: true
   }
);

// on crée le modèle 'User' à partir de notre schema ci dessus
// c'est ce modèle qu'on utilisera pour créer, modifier ou rechercher des utilisateurs
export const Projects = mongoose.model('projects', ProjectSchema);
