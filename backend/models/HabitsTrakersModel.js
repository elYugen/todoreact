import mongoose from "mongoose";

const HabitsTrackersSchema = new mongoose.Schema(
    {
        icone: { type: String, 
            default: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pngegg.com%2Fen%2Fpng-nejwa&psig=AOvVaw0xIIsNER2qFasSuusZBndc&ust=1730299083308000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCJi2q8Xos4kDFQAAAAAdAAAAABAJ' },
        
        habitname: { type: String, required: true, unique: true },
 
        // description projet :
        // doit être du texte
 
        user: { type: String, required: true },
 
    },
 
    {
        // ajoute automatiquement la date de création et de dernière modification
        timestamps: true
    }
 );
 
 // on crée le modèle 'User' à partir de notre schema ci dessus
 // c'est ce modèle qu'on utilisera pour créer, modifier ou rechercher des utilisateurs
 export const HabitsTrackers = mongoose.model('habitsTrackers', HabitsTrackersSchemaSchema);
 