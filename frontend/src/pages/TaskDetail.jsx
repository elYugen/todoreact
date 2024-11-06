import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TopBar from "../components/TopBar/TopBar";
import axios from 'axios';
import "../assets/css/TaskDetail.css";
import Loading from '../components/Loading/Loading';

function TaskDetail() {
    const { id: taskId } = useParams();
    const [task, setTask] = useState(null);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedTask, setEditedTask] = useState({});
    const navigate = useNavigate();
  
    useEffect(() => {
      const fetchTaskDetails = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/task/${taskId}`);
          setTask(response.data);
          setEditedTask(response.data);
        } catch (error) {
          setError("Une erreur est survenue lors de la récupération des détails de la tâche.");
          console.error("Erreur de récupération de la tâche :", error);
        }
      };
  
      if (taskId) fetchTaskDetails();
    }, [taskId]);
  
    if (error) return <div>{error}</div>;
    if (!task) return <Loading />;

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setEditedTask(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (e) => {
      const { checked } = e.target;
      handleComplete(taskId, checked);
    };

    const saveEditedTask = async () => {
      try {
        await axios.put(`http://localhost:8080/task/${taskId}`, editedTask);
        setTask(editedTask);
        setIsEditing(false);
        alert("Tâche mise à jour avec succès !");
      } catch (error) {
        console.error("Erreur lors de l'édition de la tâche :", error);
        setError("Erreur lors de la mise à jour de la tâche.");
      }
    };

    return (
      <>
        <TopBar pagename={"Détails de la Tâche"} />
        <section className="containerGeneral">
          {isEditing ? (
            <>
              <input type="text" name="name" value={editedTask.name} onChange={handleInputChange} className="editInput"/>
              <article className="bordureBloc">
                <div className="divDescriptionTache">
                  <h3>Description</h3>
                  <textarea name="contenu" value={editedTask.contenu} onChange={handleInputChange} className="editTextarea"/>
                </div>
                <div className="divCategorieTache">
                  <h3>Catégorie</h3>
                  <input type="text" name="category" value={editedTask.category} onChange={handleInputChange} className="editInput"/>
                </div>
                <div className="divDateTache">
                  <h3>Date</h3>
                  <input type="date" name="date" value={editedTask.date} onChange={handleInputChange} className="editInput"/>
                </div>
              </article>
              <div className="taskActions">
                <button onClick={saveEditedTask}>Enregistrer</button>
                <button onClick={() => setIsEditing(false)}>Annuler</button>
              </div>
            </>
          ) : (
            <>
              <h2 className="titreTache">{task.name}</h2>
              <article className="bordureBloc">
                <div className="divDescriptionTache">
                  <h3>Description</h3>
                  <p>{task.contenu}</p>
                </div>
                <div className="divCategorieTache">
                  <h3>Catégorie</h3>
                  <p>{task.category && task.category.length > 0 ? task.category : "Aucun projet"}</p>
                </div>
                <div className="divDateTache">
                  <h3>Date</h3>
                  <p>{task.date}</p>
                </div>
              </article>
              <div className="taskActions">
                <label>
                  <input type="checkbox" checked={task.isCompleted} onChange={handleCheckboxChange}/>
                  Tâche complétée
                </label>
                <button onClick={() => setIsEditing(true)}>Éditer</button>
                <button onClick={() => handleDelete(taskId)}>Supprimer</button>
              </div>
            </>
          )}
        </section>
      </>
    );
  
    async function handleComplete(id, isCompleted) {
      try {
        await axios.put(`http://localhost:8080/task/${id}`, { isCompleted });
        setTask({ ...task, isCompleted });
        alert(isCompleted ? "Tâche marquée comme complétée !" : "Tâche marquée comme non complétée !");
      } catch (error) {
        setError("Erreur lors de la mise à jour de l'état de la tâche.");
      }
    }
  
    async function handleDelete(id) {
      try {
        await axios.delete(`http://localhost:8080/task/${id}`);
        alert("Tâche supprimée avec succès !");
        navigate("/");
      } catch (error) {
        setError("Erreur lors de la suppression de la tâche.");
      }
    }
  }
  
  export default TaskDetail;