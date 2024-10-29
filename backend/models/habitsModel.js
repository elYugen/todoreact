// on importe mongoose qui nous aide à travailler avec la base de données mongodb
import mongoose from "mongoose";

// on crée un schema qui décrit comment seront stockées les informations des utilisateurs
const TaskSchema = new mongoose.Schema(
   {
       // nom d'utilisateur:
       // doit être du texte (String)
       // est obligatoire (required: true)
       // doit être unique (unique: true)
       name: { type: String, required: true, unique: true },

       // mot de passe:
       // doit être du texte
       // est obligatoire
       category: { type: String },

       // email:
       // doit être du texte
       // est obligatoire
       date: { type: String, required: true },

       // niveau de l'utilisateur:
       // doit être un nombre
       // commence à 1 par défaut quand on crée un nouvel utilisateur
       contenu: { type: String, require: true },

       author: { type: String, require: true }

       }
   ,
   {
       // ajoute automatiquement la date de création et de dernière modification
       timestamps: true
   }
);

// on crée le modèle 'User' à partir de notre schema ci dessus
// c'est ce modèle qu'on utilisera pour créer, modifier ou rechercher des utilisateurs
export const Task  = mongoose.model('task', TaskSchema);