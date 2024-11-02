import TopBar from "../components/TopBar/TopBar";
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hook/useAuth';


// Import des fichiers CSS pour le style
import "../assets/css/style.css";
import "../assets/css/login.css";

function CreateProject() {

    const [projectname, setProjectname] = useState('');
    const [description, setDescription] = useState('');
    const {user} = useAuth();

    const [created, setCreated] = useState(false);
    const navigate = useNavigate();

    const handleSaveNewProject = () => {

        if(!user || !user._id){
            console.error("Utilisateur non connecté");
            return;
        }
        
        const data = {
            projectname, description, user: user._id
        }
        setCreated(true)

        axios.post('https://todoback-production-2aac.up.railway.app/projects', data)
        .then(() => {
            navigate('/bucketlist')

        })
        .catch((error) => {
            console.log(error);
        })
    }

    return(
        <>
        <section className="containerGeneral generalProjet">
        <TopBar pagename={"Créer un nouveau projet"}/>

        <div className="creerProjet">
        <label>
        Nom du projet : <input className="inputNomProjet" name="inputNomProjet" value={projectname} onChange={(e) => setProjectname(e.target.value)}/>
        </label>

        <label>
        Description du projet : <input className="inputDescriptionProjet" name="inputDescriptionProjet" value={description} onChange={(e) => setDescription(e.target.value)}/>
        </label>

        <input className="addTask" type="button" value="Créer un projet" onClick={handleSaveNewProject}/>
        </div>
        </section>
        </>
    )
}

export default CreateProject;