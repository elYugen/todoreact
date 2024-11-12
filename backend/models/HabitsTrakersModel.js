import mongoose from "mongoose";

const HabitsTrackersSchema = new mongoose.Schema(
    {
        // icone :
        // doit être du texte
        icone: { type: String, required: true },
        
        // nom de l'habitude :
        // doit être du texte
        habitname: { type: String, required: true, unique: true },
 
        // date :
        // doit être du texte
        date: { type: String, required: true },
 
        // auteur:
        // doit être du texte
        user: { type: String, required: true },

        // si une tache est complété
        // doit être un booleen
        isCompleted: { type: Boolean, default: false },
 
    },
 
    {
        // ajoute automatiquement la date de création et de dernière modification
        timestamps: true
    }
 );
 
 // on crée le modèle 'User' à partir de notre schema ci dessus
 // c'est ce modèle qu'on utilisera pour créer, modifier ou rechercher des utilisateurs
 export const HabitsTrackers = mongoose.model('habitsTrackers', HabitsTrackersSchema);
 