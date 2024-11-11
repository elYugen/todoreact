import React, { useState, useEffect } from 'react';
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

  // Fonction pour obtenir la date au format "YYYY-MM-DD"
  const formatDate = (date) => {
    const d = new Date(date);
    d.setMinutes(d.getMinutes() + d.getTimezoneOffset());
    return d.toISOString().split('T')[0]; // Format "YYYY-MM-DD"
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

  const goToTask = (taskId) => {
    navigate(`/task/${taskId}`)
  }

  // Fonction pour gérer la mise à jour de l'état "complété" de la tâche
  const toggleTaskCompletion = async (taskId, currentStatus) => {
    try {
      // Envoyer la mise à jour au backend
      await axios.put(`http://localhost:8080/tasks/${taskId}`, {
        isCompleted: !currentStatus
      }, { withCredentials: true });

      // Mettre à jour l'état local des tâches après la mise à jour
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, isCompleted: !currentStatus } : task
        )
      );
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la tâche:", error);
    }
  };

  return (
    <>
      {displayedTasks.map((task) => (
        <div className="myTaskBox" key={task._id} onClick={() => goToTask(task._id)}>
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
      
      {/* Lien "Voir tout" si plus de 4 tâches et showAllTasks est false */}
      {!showAllTasks && filteredTasks.length > 4 && (
        <button onClick={goToAgenda} className="seeAllButton">Voir tout</button>
      )}
    </>
  );
}

export default MyTask;
