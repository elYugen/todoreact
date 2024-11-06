import mongoose from "mongoose";

const HabitsTrackersSchema = new mongoose.Schema(
    {
        icone: { type: String, required: true },
        
        habitname: { type: String, required: true, unique: true },
 
        // description projet :
        // doit être du texte
        date: { type: String, required: true },
 
        user: { type: String, required: true },

        // backgroundColor: { type: String, default: "#4cc0ee" },
        
        // borderColor: { type: String, default: "#1464C7" },

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
 