import React, { useState, useEffect } from 'react';
import './MyTask.css';
import Loading from '../Loading/Loading';
import useUserTasks from '../../hook/useUserTask';
import axios from 'axios';

function MyTask({ userId, filter }) {
  const { tasks, loading, error, setTasks } = useUserTasks(userId);
  const [editingTaskId, setEditingTaskId] = useState(null); // ID de la tâche en cours d'édition
  const [editedTaskName, setEditedTaskName] = useState(''); // Nouveau nom de la tâche
  

  if (loading) return <Loading />;
  if (error) return <div>Erreur: {error}</div>;

  // Fonction pour marquer une tâche comme complétée
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

  // Fonction pour commencer l'édition d'une tâche
  const startEditing = (taskId, taskName) => {
    setEditingTaskId(taskId); // Définit la tâche en cours d'édition
    setEditedTaskName(taskName); // Définit le nom actuel de la tâche dans le champ d'édition
  };

  // Fonction pour enregistrer les modifications de la tâche
  const saveEditedTask = async (taskId) => {
    try {
      await axios.put(`http://localhost:8080/task/${taskId}`, { name: editedTaskName });
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, name: editedTaskName } : task
        )
      );
      setEditingTaskId(null); // Quitte le mode édition
    } catch (error) {
      console.error("Erreur lors de l'édition de la tâche :", error);
    }
  };

  // Fonction pour supprimer une tâche
  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:8080/task/${taskId}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Erreur lors de la suppression de la tâche :", error);
    }
  };

  // Filtrage des tâches en fonction du filtre actif
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'todo') return !task.isCompleted;
    if (filter === 'completed') return task.isCompleted;
    return true;
  });

  return (
    <>
      {filteredTasks.map((task) => (
        <div className="myTaskBox" key={task._id}>
          <div className="myTaskBoxContent">
            <div className="myTaskBoxContentIcon" style={{ backgroundColor: "lightgrey" }}>
              <span>🤹</span>
            </div>

            {/* Affichage de la tâche, soit en mode lecture, soit en mode édition */}
            <div className="myTaskBoxContentTitle">
              {editingTaskId === task._id ? (
                <input 
                  value={editedTaskName} 
                  onChange={(e) => setEditedTaskName(e.target.value)} 
                />
              ) : (
                <p><b>{task.name}</b></p>
              )}
            </div>

            {/* Boutons d'action */}
            <div className="myTaskActions">
              {editingTaskId === task._id ? (
                <>
                  <button onClick={() => saveEditedTask(task._id)}>Enregistrer</button>
                  <button onClick={() => setEditingTaskId(null)}>Annuler</button>
                </>
              ) : (
                <>
                  {!task.isCompleted && (
                    <button onClick={() => completeTask(task._id)}>Valider</button>
                  )}
                  <button onClick={() => startEditing(task._id, task.name)}>Éditer</button>
                  <button onClick={() => deleteTask(task._id)}>Supprimer</button>
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default MyTask;
