import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TopBar from "../components/TopBar/TopBar";
import axios from "axios";
import Loading from "../components/Loading/Loading";
import { useNavigate } from 'react-router-dom';

function DetailProjet() {
  const { id: projectId } = useParams();
  const [project, setProject] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/projects/${projectId}`);
        setProject(response.data);
      } catch (error) {
        setError("Une erreur est survenue lors de la récupération des détails du projet.");
        console.error("Erreur de récupération du projet :", error);
      }
    };

    if (projectId) fetchProjectDetails();
  }, [projectId]);

  const handleTaskCompletion = async (taskId, isCompleted) => {
    try {
      await axios.put(`http://localhost:8080/task/${taskId}`, { isCompleted });
      
      // Mettre à jour l'état local du projet
      setProject(prevProject => ({
        ...prevProject,
        tasks: prevProject.tasks.map(task => 
          task._id === taskId ? { ...task, isCompleted } : task
        )
      }));
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la tâche :", error);
      setError("Une erreur est survenue lors de la mise à jour de la tâche.");
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!project) {
    return <Loading />;
  }

  const goToAdd = async () => {
    navigate(`/create/task`)
  }

  return (
    <>
      <TopBar pagename={"Détails du projet"} /> 
      <section className="containerGeneral">
        <h2 className="titreProjet">{project.projectname}</h2>

        <article className="bordureBloc">
          <div className="divDescriptionProjet">
            <h3>Description</h3>
            <p>{project.description.length > 0 ? project.description : "Pas de description"}</p>
          </div>
        </article>

        <article className="bordureBloc">
          <div className="divBlocListeTaches">
            <div className="titreBoutonTask">
              <h3>Liste des tâches</h3>
              <input className="add" type="button" value="Ajouter" onClick={goToAdd} />
            </div>

            <div className="ListTask">
              <ul className="UlListTask">
                {project.tasks && project.tasks.map((task) => (
                  <div className="checkboxLabel" key={task._id}>
                    <label htmlFor={task._id}>
                      <input type="checkbox" id={task._id} checked={task.isCompleted} onChange={(e) => handleTaskCompletion(task._id, e.target.checked)}/>
                      {task.name}
                    </label>
                  </div>
                ))}
              </ul>
            </div>
          </div>
        </article>
      </section>
    </>
  );
}

export default DetailProjet;