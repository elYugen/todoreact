import React, { useState } from 'react';
import './MyTask.css';
import Loading from '../Loading/Loading';
import useUserTasks from '../../hook/useUserTask';
import { useNavigate } from 'react-router-dom';

function MyTask({ userId, filter }) {
  const { tasks, loading, error, setTasks } = useUserTasks(userId);
  const [showAllTasks, setShowAllTasks] = useState(false);
  const navigate = useNavigate();

  if (loading) return <Loading />;
  if (error) return <div>Erreur: {error}</div>;

  if (tasks.length === 0) {
    return <p>Tu n'as pas encore de tâche en cours.</p>;
  }

  // Fonction pour obtenir la date au format YYYY-MM-DD
  const formatDate = (date) => {
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  };

  // Date du jour au format YYYY-MM-DD
  const today = formatDate(new Date());

  // Filtrage des tâches
  const filteredTasks = tasks.filter((task) => {
    const taskDate = formatDate(task.date);
    
    if (filter === 'todo') {
      return !task.isCompleted && taskDate === today;
    }
    if (filter === 'completed') {
      return task.isCompleted;
    }
    return taskDate === today; // Par défaut, montre uniquement les tâches du jour
  });

  // Limitation à 4 tâches si showAllTasks est false
  const displayedTasks = showAllTasks ? filteredTasks : filteredTasks.slice(0, 4);

  const goToAgenda = () => {
    navigate('/agenda');
  };

  const goToTask = (taskId) => {
    navigate(`/task/${taskId}`);
  };

  return (
    <>
      {displayedTasks.map((task) => (
        <div 
          className="myTaskBox" 
          key={task._id} 
          onClick={(e) => { 
            e.stopPropagation(); 
            goToTask(task._id); 
          }}
        >
          <div className="myTaskBoxContent">
            <div 
              className="myTaskBoxContentIcon" 
              style={{ backgroundColor: "lightgrey" }}
            >
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
      
      {!showAllTasks && filteredTasks.length > 4 && (
        <button onClick={goToAgenda} className="seeAllButton">
          Voir tout
        </button>
      )}
    </>
  );
}

export default MyTask;