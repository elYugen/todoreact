// Importe le modèle User depuis le fichier userModel.js
import { User } from '../models/userModel.js';

export const updateUserBadges = async (userId) => {
    // Recherche l'utilisateur dans la base de données par son ID
    const user = await User.findById(userId);

    // Si l'utilisateur n'est pas trouvé, lance une erreur
    if (!user) {
        throw new Error("Utilisateur non trouvé");
    }

    // Définit le badge en fonction du niveau de l'utilisateur
    if (user.level >= 1 && user.level < 2) {
        user.badge = "newbie.avif";
    } else if (user.level >= 2 && user.level < 3) {
        user.badge = "badge1.jpg";
    } else if (user.level >= 3 && user.level < 4) {
        user.badge = "badge2.jpg";
    } else if (user.level >= 4 && user.level < 5) {
        user.badge = "badge3.jpg";
    } else if (user.level >= 5 && user.level < 6) {
        user.badge = "badge4.jpg";
    } else if (user.level >= 6) {
        user.badge = "badge5.jpg";
    }

    // Sauvegarde les modifications de l'utilisateur dans la base de données
    await user.save();

    // Retourne l'objet utilisateur mis à jour
    return user;
};