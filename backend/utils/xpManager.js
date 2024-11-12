// Importe le modèle User depuis le fichier userModel.js
import { User } from '../models/userModel.js';

// Définit une fonction asynchrone pour mettre à jour l'XP d'un utilisateur
export const updateUserXP = async (userId, xpGained) => {
    // Recherche l'utilisateur dans la base de données par son ID
    const user = await User.findById(userId);
    
    // Si l'utilisateur n'est pas trouvé, lance une erreur
    if (!user) {
        throw new Error("Utilisateur non trouvé");
    }

    // Ajoute l'XP gagnée à l'XP actuelle de l'utilisateur
    user.xp += xpGained;

    // Boucle pour vérifier si l'utilisateur doit monter de niveau
    while (user.xp >= 100) {
        // Si l'XP est supérieure ou égale à 100, augmente le niveau de 1
        user.level += 1;
        // Soustrait 100 XP pour chaque niveau gagné
        user.xp -= 100;
    }

    // Sauvegarde les modifications de l'utilisateur dans la base de données
    await user.save();

    // Retourne l'objet utilisateur mis à jour
    return user;
};