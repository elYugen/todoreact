import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TopBar from "../components/TopBar/TopBar";
import axios from "axios";
import Loading from "../components/Loading/Loading";

function DetailProjet() {
  const { id: projectId } = useParams();
  const [project, setProject] = useState(null);
  const [error, setError] = useState(null);

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

  if (error) {
    return <div>{error}</div>;
  }

  if (!project) {
    return <Loading />;
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
              <input className="add" type="button" value="Ajouter" />
            </div>

            <div className="ListTask">
              <ul className="UlListTask">
                {project.tasks && project.tasks.map((task) => (
                  <div className="radioBoutonLabel" key={task._id}>
                    <label htmlFor={task._id}>{task.name}</label>
                    <input type="radio" id={task._id} value={task.name} />
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
