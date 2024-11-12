// On importe React car c'est un composant React
import React from "react";

// On importe `useNavigate` de React Router pour la navigation programmatique
import { useNavigate } from "react-router-dom";

// On importe le fichier CSS pour le style de ce composant
import './Mytask.css';

// On importe un composant `Loading` qui est utilisé lors du chargement des tâches
import Loading from "../components/Loading/Loading";

// On importe un hook personnalisé `useUserTasks` pour récupérer les tâches de l'utilisateur
import useUserTasks from "../hook/useUserTask";

// Fonction principale qui définit le composant `MyTask`
function MyTask({ userId }) {
  
  // On utilise le hook `useUserTasks` pour récupérer les tâches, le statut de chargement, et les erreurs pour un `userId` donné
  const { tasks, loading, error } = useUserTasks(userId);

  // On crée un objet `navigate` avec `useNavigate()` pour la navigation entre les pages
  const navigate = useNavigate();

  // Si les tâches sont en cours de chargement, on retourne le composant `Loading` pour indiquer le statut
  if (loading) return <Loading />;
  
  // Si une erreur est survenue, on affiche le message d'erreur
  if (error) return <div>Erreur: {error}</div>;

  // Le rendu principal du composant
  return (
    <div className="taskList">
      {tasks.map((task) => ( // On boucle sur chaque tâche dans `tasks` pour les afficher
        <div 
          key={task._id} // Chaque tâche doit avoir une clé unique, ici `_id` est utilisé comme clé
          className="myTaskBox" 
          onClick={() => navigate(`/task/${task._id}`)} // Lorsque l'utilisateur clique, il est redirigé vers la page de détail de la tâche
        >
          <div className="myTaskBoxContent">
            
            {/* Icone représentant la tâche, ici un émoji 🤹 est utilisé */}
            <div className="myTaskBoxContentIcon" style={{ backgroundColor: "lightgrey" }}>
              <span>🤹</span>
            </div>
            
            {/* Titre de la tâche */}
            <div className="myTaskBoxContentTitle">
              <p><b>{task.name}</b></p> {/* Affiche le nom de la tâche en gras */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// On exporte le composant `MyTask` pour l'utiliser dans d'autres parties de l'application
export default MyTask;
