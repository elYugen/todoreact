import TopBar from "../components/TopBar/TopBar";
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hook/useAuth';
import EmojiPicker from 'emoji-picker-react';


// Import des fichiers CSS pour le style
import "../assets/css/style.css";
import "../assets/css/login.css";

function CreateHabit() {

    const [icone, setIcone] = useState('');
    const [habitname, setHabitName] = useState('');
    const {user} = useAuth('');

    const [created, setCreated] = useState(false);
    const navigate = useNavigate();

    const handleSaveNewHabit = () => {
        const data = {
            icone, habitname, user: user._id
        }
        setCreated(true)

        axios.post('http://localhost:8080/projects', data)
        .then(() => {
            navigate('/habitstracker')

        })
        .catch((error) => {
            console.log(error);
        })
    }

    function handleReaction() {
//attraper le code de l'émoji
const emojiData = EmojiClickData;
//envoyer l'émoji comme valeur de l'input

return <input className="inputNomProjet" name="inputNomProjet" value={icone} onChange={(e) => setIcone(e.target.value)}/>
    }

    return(
        <>
        <section className="containerGeneral generalProjet">
        <TopBar pagename={"Tracker une habitude"}/>

        <div className="creerProjet">

        <label>
        Icone : <input className="inputNomProjet" name="inputNomProjet" value={icone} onChange={(e) => setIcone(e.target.value)}/>
        <EmojiPicker reactionsDefaultOpen={true} onReactionClick={handleReaction}/>
        </label>

        <label>
        Nom de l'habitude : <input className="inputNomProjet" name="inputNomProjet" value={habitname} onChange={(e) => setHabitName(e.target.value)}/>
        </label>


        <input className="addTask" type="button" value="Créer le tracker" onClick={handleSaveNewHabit}/>
        </div>
        </section>
        </>
    )
}

export default CreateHabit;