import { useState, useEffect } from 'react';
import axios from 'axios';
const useUserTasks = (userId) => {
    // Déclaration des états avec useState
    const [tasks, setTasks] = useState([]); // Pour stocker les tâches de l'utilisateur
    const [loading, setLoading] = useState(true); // Pour gérer l'état de chargement
    const [error, setError] = useState(null); // Pour gérer les erreurs éventuelles

    // Utilisation de useEffect pour effectuer des actions après le rendu du composant
    useEffect(() => {
        // Fonction asynchrone pour récupérer les tâches de l'utilisateur
        const fetchUserTasks = async () => {
            try {
                // Début du chargement et réinitialisation de l'erreur
                setLoading(true);
                setError(null);
                
                // Requête GET vers l'API pour récupérer les tâches de l'utilisateur
                // withCredentials: true permet d'envoyer les cookies avec la requête
                const response = await axios.get(`http://localhost:8080/task/user/${userId}`, { withCredentials: true });
                
                // Mise à jour de l'état des tâches avec les données reçues
                setTasks(response.data.data);
            } catch (err) {
                // En cas d'erreur, on met à jour l'état d'erreur
                setError(
                    err.response?.data?.message || 
                    "Une erreur est survenue lors de la récupération des projets"
                );
            } finally {
                // Qu'il y ait une erreur ou non, on arrête le chargement
                setLoading(false);
            }
        };
        // Si un userId est fourni, on récupère les tâches
        if (userId) {
            fetchUserTasks();
        } else {
            // Sinon, on réinitialise les tâches et on arrête le chargement
            setTasks([]);
            setLoading(false);
        }
    }, [userId]); // Le useEffect se déclenche à chaque changement de userId
    // Le hook retourne un objet contenant les états et la fonction pour mettre à jour les tâches
    return {
        tasks,
        setTasks,
        loading,
        error,
    };
};
// Exportation du hook personnalisé pour pouvoir l'utiliser dans d'autres composants
export default useUserTasks;