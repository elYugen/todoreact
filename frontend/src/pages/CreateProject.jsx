import TopBar from "../components/TopBar/TopBar";
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hook/useAuth';
import EmojiPicker from 'emoji-picker-react';

// Import des fichiers CSS pour le style
import "../assets/css/style.css";
import "../assets/css/login.css";

function CreateProject() {

    const [projectname, setProjectname] = useState('');
    const [description, setDescription] = useState('');
    const [icone, setIcone] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const {user} = useAuth();

    const [created, setCreated] = useState(false);
    const navigate = useNavigate();

    const handleSaveNewProject = () => {

        if(!user || !user._id){
            console.error("Utilisateur non connecté");
            return;
        }
        
        const data = {
            projectname, description, user: user._id, icone
        }
        setCreated(true)

        axios.post('http://localhost:8080/projects', data)
        .then(() => {
            navigate('/bucketlist')

        })
        .catch((error) => {
            console.log(error);
        })
    }

    function handleReaction() {
        setShowEmojiPicker(!showEmojiPicker);
    }

    function onEmojiClick(emojiObject) {
        setIcone(emojiObject.emoji);
        setShowEmojiPicker(false);
    }

    return(
        <>
        <section className="containerGeneral generalProjet">
        <TopBar pagename={"Créer un nouveau projet"}/>

        <div className="creerProjet">
        <label>
        Nom : * <input className="inputNomProjet" name="inputNomProjet" value={projectname} onChange={(e) => setProjectname(e.target.value)}/>
        </label>

        <div className="icone-input-container">
            <label>
                Icone : <input className="inputEmoji" name="inputNomProjet" value={icone} onChange={(e) => setIcone(e.target.value)}/>
            </label>
            <button className="emoji-button" onClick={handleReaction}>Choisir un emoji</button>
        </div>
        {showEmojiPicker && (
        <EmojiPicker onEmojiClick={onEmojiClick} />
        )}

        <label>
        Description : <input className="inputDescriptionProjet" name="inputDescriptionProjet" value={description} onChange={(e) => setDescription(e.target.value)}/>
        </label>

        <input className="addTask" type="button" value="Créer un projet" onClick={handleSaveNewProject}/>
        </div>
        </section>
        </>
    )
}

export default CreateProject;