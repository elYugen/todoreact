import TopBar from "../components/TopBar/TopBar";
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hook/useAuth';
import EmojiPicker from 'emoji-picker-react';
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Loading from "../components/Loading/Loading";


// Import des fichiers CSS pour le style
import "../assets/css/style.css";
import "../assets/css/login.css";

function UpdateHabit() {

    const { id: habitId } = useParams();
    const [habits, setHabits] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [editedHabit, setEditedHabit] = useState({});
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [icone, setIcone] = useState('');
    
  
    useEffect(() => {
      const fetchHabitDetails = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/habitstrackers/${habitId}`);
          setHabits(response.data);
          setEditedHabit(response.data);
        } catch (error) {
          setError("Une erreur est survenue lors de la récupération des détails de l'habitude.");
          console.error("Erreur de récupération de l'habitude :", error);
        }
      };
  
      if (habitId) fetchHabitDetails();
    }, [habitId]);
  
    if (error) return <div>{error}</div>;
    if (!habits) return <Loading />;

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setEditedHabit(prev => ({ ...prev, [name]: value }));
      console.log("Valeur de editedHabit après mise à jour :", { ...editedHabit, [name]: value });
      
    };


    const saveEditedHabit = async () => {
      try {
        await axios.put(`http://localhost:8080/habitstrackers/${habitId}`, editedHabit);
        setHabits(editedHabit);
        navigate('/habitstracker');
      } catch (error) {
        console.error("Erreur lors de l'édition de l'habitude :", error);
        setError("Erreur lors de la mise à jour de l'habitude.");
      }
    };

    function handleReaction() {
        setShowEmojiPicker(!showEmojiPicker);
    }

    function onEmojiClick(emojiObject) {
        setIcone(emojiObject.emoji);
        setEditedHabit(prev => ({ ...prev, icone: emojiObject.emoji }));
        setShowEmojiPicker(false);
    }

    return(
        <>
        <section className="containerGeneral generalProjet">
        <TopBar pagename={"Mettre à jour l'habitude"}/>

        <div className="creerProjet">
        <label>
        Nom de l'habitude : <input className="inputNomProjet" name="habitname" value={editedHabit.habitname} onChange={handleInputChange}/>
        </label>

        <label>
        isCompleted : <input className="inputNomProjet inputIsCompleted" name="isCompleted" value={editedHabit.isCompleted} onChange={handleInputChange}/>
        </label>
        
        <div className="icone-input-container">
            <label>
                Icone : <input className="inputEmoji" name="icone" value={editedHabit.icone} onChange={handleInputChange}/>
            </label>
            <button className="emoji-button" onClick={handleReaction}>Choisir un emoji</button>
        </div>
        {showEmojiPicker && (
        <EmojiPicker onEmojiClick={onEmojiClick} />
        )}


        <label className="labelTask">
        Date : <input value={editedHabit.date} onChange={handleInputChange} type="Date" className="inputCategorie" name="date"/>
        </label>

        <input className="addTask" type="button" value="Modifier le tracker" onClick={saveEditedHabit}/>
        </div>
        </section>
        </>
    )
}

export default UpdateHabit;