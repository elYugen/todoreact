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
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [date, setDate] = useState('')

    const [created, setCreated] = useState(false);
    const navigate = useNavigate();

    const handleSaveNewHabit = () => {
        const data = {
            icone, habitname, user: user._id, date,
        }
        setCreated(true)

        axios.post('https://todoback-production-2aac.up.railway.app/habitstrackers', data)
        .then(() => {
            navigate('/habitstracker')

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
        <TopBar pagename={"Tracker une habitude"}/>

        <div className="creerProjet">

        <label>
        Icone : <input className="inputNomProjet" name="inputNomProjet" value={icone} onChange={(e) => setIcone(e.target.value)}/>
        <button onClick={handleReaction}>Choisir un emoji</button>
    {showEmojiPicker && (
        <EmojiPicker onEmojiClick={onEmojiClick} />
    )}
        </label>

        <label>
        Nom de l'habitude : <input className="inputNomProjet" name="inputNomProjet" value={habitname} onChange={(e) => setHabitName(e.target.value)}/>
        </label>

        <label className="labelTask">
        Date : <input value={date} onChange={(e) => setDate(e.target.value)} type="Date" className="inputCategorie" name="inputCategorie"/>
        </label>

        <input className="addTask" type="button" value="Créer le tracker" onClick={handleSaveNewHabit}/>
        </div>
        </section>
        </>
    )
}

export default CreateHabit;