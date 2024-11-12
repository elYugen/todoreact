// Importe le modèle User depuis le fichier userModel.js
import { User } from '../models/userModel.js';

// Définit une fonction asynchrone pour mettre à jour les badges d'un utilisateur
export const updateUserBadges = async (userId) => {
    // Recherche l'utilisateur dans la base de données par son ID
    const user = await User.findById(userId);

    // Si l'utilisateur n'est pas trouvé, lance une erreur
    if (!user) {
        throw new Error("Utilisateur non trouvé");
    }

    // Définit le badge en fonction du niveau de l'utilisateur
    if (user.level >= 1 && user.level < 2) { // si le niveau de l'utilisateur est supérieur ou égal 1 et qu'il est inférieur a 2
        user.badge = "newbie.avif";          // alors on attribue newbie.avif

    } else if (user.level >= 2 && user.level < 3) { // si le niveau de l'utilisateur est supérieur ou égal 2 et qu'il est inférieur a 3
        user.badge = "badge1.jpg";                  // alors on attribue badge1.jpg

    } else if (user.level >= 3 && user.level < 4) { // si le niveau de l'utilisateur est supérieur ou égal 3 et qu'il est inférieur a 4
        user.badge = "badge2.jpg";                  // alors on attribue badge2.jpg

    } else if (user.level >= 4 && user.level < 5) { // si le niveau de l'utilisateur est supérieur ou égal 4 et qu'il est inférieur a 5
        user.badge = "badge3.jpg";                  // alors on attribue badge3.jpg

    } else if (user.level >= 5 && user.level < 6) { // si le niveau de l'utilisateur est supérieur ou égal 1 et qu'il est inférieur a 2
        user.badge = "badge4.jpg";                  // alors on attribue badge4.jpg

    } else if (user.level >= 6) { // si le niveau de l'utilisateur est supérieur ou égal a 6
        user.badge = "badge5.jpg";// alors on attribue badge5.jpg
    }

    // Sauvegarde les modifications de l'utilisateur dans la base de données
    await user.save();

    // Retourne l'objet utilisateur mis à jour
    return user;
};