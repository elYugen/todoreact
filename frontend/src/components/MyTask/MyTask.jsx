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

  // Limitation à 5 tâches si showAllTasks est false
  const displayedTasks = showAllTasks ? filteredTasks : filteredTasks.slice(0, 4);

  const goToAgenda = async (e) => { 
    navigate('/agenda');          
  }

  const goToTask = async (taskId) => {
    navigate(`/task/${taskId}`)
  }

  return (
    <>
      {displayedTasks.map((task) => (
        <div className="myTaskBox" key={task._id} onClick={(e) => { e.stopPropagation(); goToTask(task._id); }}>
          <div className="myTaskBoxContent">
            <div className="myTaskBoxContentIcon" style={{ backgroundColor: "lightgrey" }}>
              <span>🤹</span>
            </div>

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
