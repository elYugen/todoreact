import mongoose from "mongoose";

const HabitsTrackersSchema = new mongoose.Schema(
    {
        icone: { type: String, required: true },
        
        habitname: { type: String, required: true, unique: true },
 
        // description projet :
        // doit être du texte
        date: { type: String, required: true },
 
        user: { type: String, required: true },
 
    },
 
    {
        // ajoute automatiquement la date de création et de dernière modification
        timestamps: true
    }
 );
 
 // on crée le modèle 'User' à partir de notre schema ci dessus
 // c'est ce modèle qu'on utilisera pour créer, modifier ou rechercher des utilisateurs
 export const HabitsTrackers = mongoose.model('habitsTrackers', HabitsTrackersSchema);
 