import React, { useState, useEffect } from 'react';
import './MyTask.css';
import Loading from '../Loading/Loading';
import useUserTasks from '../../hook/useUserTask';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function MyTask({ userId, filter }) {
  const { tasks, loading, error, setTasks } = useUserTasks(userId);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTaskName, setEditedTaskName] = useState('');
  const [showAllTasks, setShowAllTasks] = useState(false); 
  const navigate = useNavigate();


  if (loading) return <Loading />;
  if (error) return <div>Erreur: {error}</div>;

  if (tasks.length === 0) {
    return <><p>Tu n'as pas encore de tâche en cours.</p></>;
  }

  const completeTask = async (taskId) => {
    try {
      await axios.put(`http://localhost:8080/task/${taskId}`, { isCompleted: true });
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, isCompleted: true } : task
        )
      );
    } catch (error) {
      console.error("Erreur lors de la validation de la tâche :", error);
    }
  };

  const startEditing = (taskId, taskName) => {
    setEditingTaskId(taskId);
    setEditedTaskName(taskName);
  };

  const saveEditedTask = async (taskId) => {
    try {
      await axios.put(`http://localhost:8080/task/${taskId}`, { name: editedTaskName });
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, name: editedTaskName } : task
        )
      );
      setEditingTaskId(null);
    } catch (error) {
      console.error("Erreur lors de l'édition de la tâche :", error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:8080/task/${taskId}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Erreur lors de la suppression de la tâche :", error);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'todo') return !task.isCompleted;
    if (filter === 'completed') return task.isCompleted;
    return true;
  });

  // Limitation à 5 tâches si showAllTasks est false
  const displayedTasks = showAllTasks ? filteredTasks : filteredTasks.slice(0, 4);

  const goToAgenda = async (e) => { // fonction fléché qui permet de rediriger vers l'agenda
    navigate('/agenda');          // en cliquant sur le bouton agenda
  }

  const goToTask = async (taskId) => {
    navigate(`/task/${taskId}`)
  }

  return (
    <>
      {displayedTasks.map((task) => (
        <div className="myTaskBox" key={task._id}  onClick={(e) => {e.stopPropagation(); goToTask(task._id);}}>
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
