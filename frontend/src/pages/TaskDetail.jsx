import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TopBar from "../components/TopBar/TopBar";
import axios from 'axios';
import "../assets/css/TaskDetail.css";
import Loading from '../components/Loading/Loading';

function TaskDetail() {
    const { id: taskId } = useParams(); // Récupère l'ID de la tâche depuis l'URL
    const [task, setTask] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
  
    useEffect(() => {
      const fetchTaskDetails = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/task/${taskId}`);
          setTask(response.data);
        } catch (error) {
          setError("Une erreur est survenue lors de la récupération des détails de la tâche.");
          console.error("Erreur de récupération de la tâche :", error);
        }
      };
  
      if (taskId) fetchTaskDetails();
    }, [taskId]);
  
    if (error) return <div>{error}</div>;
    if (!task) return <Loading />;
  
    return (
      <>
        <TopBar pagename={"Détails de la Tâche"} />
        <section className="containerGeneral">
          <h2 className="titreTache">{task.name}</h2>
  
          <article className="bordureBloc">
            <div className="divDescriptionTache">
              <h3>Description</h3>
              <p>{task.contenu}</p>
            </div>
            <div className="divCategorieTache">
              <h3>Catégorie</h3>
              <p>{task.category}</p>
            </div>
            <div className="divDateTache">
              <h3>Date</h3>
              <p>{task.date}</p>
            </div>
          </article>
  
          <div className="taskActions">
            <button onClick={() => handleComplete(taskId)}>Valider</button>
            <button onClick={() => navigate(`/edit-task/${taskId}`)}>Éditer</button>
            <button onClick={() => handleDelete(taskId)}>Supprimer</button>
          </div>
        </section>
      </>
    );
  
    // Marque la tâche comme complétée
    async function handleComplete(id) {
      try {
        await axios.put(`http://localhost:8080/task/${id}`, { isCompleted: true });
        setTask({ ...task, isCompleted: true });
        alert("Tâche marquée comme complétée !");
      } catch (error) {
        setError("Erreur lors de la validation de la tâche.");
      }
    }
  
    // Supprime la tâche et redirige vers la page de liste des tâches
    async function handleDelete(id) {
      try {
        await axios.delete(`http://localhost:8080/task/${id}`);
        alert("Tâche supprimée avec succès !");
        navigate("/mytasks");
      } catch (error) {
        setError("Erreur lors de la suppression de la tâche.");
      }
    }
  }
  
  export default TaskDetail;