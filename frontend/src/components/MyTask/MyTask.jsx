import React, { useState } from 'react';
import './MyTask.css';
import Loading from '../Loading/Loading';
import useUserTasks from '../../hook/useUserTask';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function MyTask({ userId, filter }) {
  const { tasks, loading, error, setTasks } = useUserTasks(userId);
  const [showAllTasks, setShowAllTasks] = useState(false); 
  const navigate = useNavigate();

  if (loading) return <Loading />;
  if (error) return <div>Erreur: {error}</div>;

  if (tasks.length === 0) {
    return <><p>Tu n'as pas encore de tâche en cours.</p></>;
  }

  // Fonction pour obtenir la date du jour au format XX-XX-XXXX
  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getDate().toString().padStart(2, '0')}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getFullYear()}`;
  };

  // Date du jour
  const today = formatDate(new Date());

  // Filtrage des tâches en fonction du filtre et de la date
  const filteredTasks = tasks.filter((task) => {
    const taskDate = formatDate(task.date); // Date de la tâche formatée

    if (filter === 'todo') return !task.isCompleted && taskDate === today;
    if (filter === 'completed') return task.isCompleted;
    return true;
  });

  // Limitation à 4 tâches si showAllTasks est false
  const displayedTasks = showAllTasks ? filteredTasks : filteredTasks.slice(0, 4);

  const goToAgenda = () => { 
    navigate('/agenda');          
  }

  // Fonction pour gérer la mise à jour de l'état "complété" de la tâche
  const toggleTaskCompletion = async (taskId, currentStatus) => {
    console.log(`Toggle task completion for taskId: ${taskId}, currentStatus: ${currentStatus}`);
    try {
      // Envoyer la mise à jour au backend
      await axios.put(`http://localhost:8080/tasks/${taskId}`, {
        isCompleted: !currentStatus
      }, { withCredentials: true })
      .then(() => {
        console.log("Mise à jour réussie !");
      });

      // Mettre à jour l'état local des tâches après la mise à jour
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, isCompleted: !currentStatus } : task
        ) //...task est appelé un opérateur de décomposition (ou spread operator). Il est utilisé pour copier toutes les propriétés de l'objet task dans un nouvel objet.Cela signifie que nous créons un nouvel objet qui contient toutes les mêmes propriétés que task. 
        
      );
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la tâche:", error);
      if (error.response) {
        console.log("Erreur de réponse:", error.response.status, error.response.data);
      } else {
        console.log("Erreur de requête:", error.message);
      }
    }
  };

  return (
    <>
      {displayedTasks.map((task) => (
        <div className="myTaskBox" key={task._id}>
          <div className="myTaskBoxContent">
            {/* Checkbox pour marquer la tâche comme complétée ou non */}
            <input
              type="checkbox"
              checked={task.isCompleted}
              onChange={() => toggleTaskCompletion(task._id, task.isCompleted)}
              className="myTaskCheckbox"
            />

            <div className="myTaskBoxContentTitle">
              <p><b>{task.name}</b></p>
            </div>
            <div className="myTaskBoxSeeDetails">
              <i className="bi bi-chevron-right"></i>
            </div>
          </div>
        </div>
      ))}
      
      {/* Lien "Voir tout" si plus de 5 tâches et showAllTasks est false */}
      {!showAllTasks && filteredTasks.length > 4 && (
        <button onClick={goToAgenda} className="seeAllButton">Voir tout</button>
      )}
    </>
  );
}

export default MyTask;
