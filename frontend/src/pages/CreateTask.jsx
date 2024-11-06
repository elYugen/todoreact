import TopBar from "../components/TopBar/TopBar";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../hook/useAuth";
import Loading from "../components/Loading/Loading";

function CreateTask() {
  const [name, setName] = useState('');
  const [projectId, setProjectId] = useState('');
  const [date, setDate] = useState('');
  const [contenu, setContenu] = useState('');
  const [projects, setProjects] = useState([]); 
  const { user } = useAuth();
  const navigate = useNavigate();


  useEffect(() => {
    if (user) { // Vérification que user est défini
      axios.get(`http://localhost:8080/projects/user/${user._id}`)
        .then(response => setProjects(response.data.data))
        .catch(error => console.error("Erreur de chargement des projets:", error));
    }
  }, [user]);

  // Enregistrer une tâche avec l'ID du projet sélectionné
  const handleSaveNewTask = () => {
    const data = {
      name, project: projectId, date, contenu, author: user._id,
    };
    console.log("Données envoyées :", data);
    axios.post('http://localhost:8080/task', data)
      .then(() => navigate('/'))
      .catch(error => console.error("Erreur lors de la création de la tâche:", error));
  };

  if (!user) return <Loading/>;

  return (
    <section className="containerGeneral generalTask">
      <TopBar pagename={"Créer une nouvelle tâche"} />

      <div className="creerTask">
        <label className="labelTask">
          Nom de la tâche : <input value={name} onChange={(e) => setName(e.target.value)} className="inputNomTask" />
        </label>

        <label className="labelTask">
          Projet :
          <div>
            {projects.map(project => (
              <button key={project._id} onClick={() => setProjectId(project._id)} className={`addTask buttonTask ${projectId === project._id ? 'buttonTaskActive' : ''}`}>
                {project.projectname}
              </button>
            ))}
          </div>
        </label>

        <label className="labelTask">
          Date : <input value={date} onChange={(e) => setDate(e.target.value)} type="Date" className="inputCategorie" />
        </label>
            <br />
        <label className="labelTask">
          Contenu : <input value={contenu} onChange={(e) => setContenu(e.target.value)} className="inputDescriptionTask" />
        </label>

        <input onClick={handleSaveNewTask} className="addTask" type="button" value="Créer une tâche" />
      </div>
    </section>
  );
}

export default CreateTask;
