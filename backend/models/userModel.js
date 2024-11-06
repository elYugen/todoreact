// on importe mongoose qui nous aide à travailler avec la base de données mongodb
import mongoose from "mongoose";

import {updateUserBadges} from "../utils/badgeManager.js"

// on crée un schema qui décrit comment seront stockées les informations des utilisateurs
const UserSchema = new mongoose.Schema(
   {
       // nom d'utilisateur:
       // doit être du texte (String)
       // est obligatoire (required: true)
       // doit être unique (unique: true)
       username: { type: String, required: true, unique: true },

       // mot de passe:
       // doit être du texte
       // est obligatoire
       password: { type: String, required: true },

       // email:
       // doit être du texte
       // est obligatoire
       email: { type: String, required: true },

       // niveau de l'utilisateur:
       // doit être un nombre
       // commence à 1 par défaut quand on crée un nouvel utilisateur
       level: { type: Number, default: 1 },

       // xp de l'utilisateur:
       // doit être un nombre
       // commence à 1 par défaut quand on crée un nouvel utilisateur
       xp: { type: Number, default: 0 },
       
       // image de profil:
       // doit être du texte (String)
       // avec une valeur par défaut
       profilePicture: { 
           type: String, 
           default: 'https://mycrazystuff.com/20695-width_1000/decapsuleur-testicules.jpg' 
       },

       badge: {
        type: String,
        default: 'newbie.avif'
       }
   },
   {
       // ajoute automatiquement la date de création et de dernière modification
       timestamps: true
   }
);

// Middleware pre-save
UserSchema.pre('save', async function(next) {
    // Si le niveau a changé
    if (this.isModified('level')) {
        await updateUserBadges(this);
    }
    next();
});

// on crée le modèle 'User' à partir de notre schema ci dessus
// c'est ce modèle qu'on utilisera pour créer, modifier ou rechercher des utilisateurs
export const User = mongoose.model('user', UserSchema);
