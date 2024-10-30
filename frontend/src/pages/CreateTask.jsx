import TopBar from "../components/TopBar/TopBar";
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../hook/useAuth";


function CreateTask() {

    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [date, setDate] = useState('')
    const [contenu, setContenu] = useState('')
    const [created, setCreated] = useState(false)

      // Hook pour la navigation - permet de rediriger l'utilisateur
  const navigate = useNavigate();

  const { user } = useAuth();

  // Fonction qui s'exécute quand on clique sur le bouton "Créer un compte"
  const handleSaveNewTask = () => {
    // On prépare les données à envoyer au serveur
    const data = {
      name, category, date, contenu, author: user._id, //on associe la tâche a l'utilisateur co 
    }
    setCreated(true) // On indique que la création est en cours
    
    // Requête POST vers notre serveur pour créer le compte
    axios.post('http://localhost:8080/task', data)
    .then(() => {
      // Si la création réussit, on redirige vers la page d'accueil
      console.log(data);
      
      navigate('/')
    })
    .catch((error) => {
      // Si une erreur survient, on l'affiche dans la console
      console.log("data", data);
      console.log(error);  
    })
  }
    
    return(
        <>
         <section className="containerGeneral generalTask">
        <TopBar pagename={"Créer une nouvelle tâche"}/>

        <div className="creerTask">
        <label className="labelTask">
        Nom de la tâche : <input value={name} onChange={(e) => setName(e.target.value)} className="inputNomTask" name="inputNomTask"/>
        </label>

        <label className="labelTask">

        Catégorie : <br></br>
        <div>
        <input value={category} onChange={(e) => setCategory(e.target.value)} className="addTask buttonTask" type="text" ></input>
        </div>
        </label>

        <label className="optionTask" for="selectProjet">Selectionnez un projet</label>
        <select name="selectProjet" id="selectProjet">
            <option value="projet 1">Projet 1</option>
            <option value="projet 2">Projet 2</option>
            <option value="projet 3">Projet 3</option>
            <option value="projet 4">Projet 4</option>
        </select>

        <label className="labelTask">
        Date : <input value={date} onChange={(e) => setDate(e.target.value)} type="Date" className="inputCategorie" name="inputCategorie"/>
        </label>

        <label className="labelTask">
        Contenu : <input value={contenu} onChange={(e) => setContenu(e.target.value)} className="inputDescriptionTask" name="inputDescriptionTask"/>
        </label>

        <input onClick={handleSaveNewTask} className="addTask" type="button" value="Créer une tâche"/>
        </div>
        </section>
        </>
    )
}

export default CreateTask;