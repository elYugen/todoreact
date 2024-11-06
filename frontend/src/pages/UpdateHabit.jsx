import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import EmojiPicker from 'emoji-picker-react';
import TopBar from "../components/TopBar/TopBar";
import Loading from "../components/Loading/Loading";
import "../assets/css/style.css";
import "../assets/css/login.css";

function UpdateHabit() {
  const { id: habitId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [habitname, setHabitname] = useState('');
  const [date, setDate] = useState('');
  const [icone, setIcone] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  useEffect(() => {
    const fetchHabit = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/habitstrackers/${habitId}`);
        const { habitname, date, icone } = response.data;
        setHabitname(habitname);
        setDate(date);
        setIcone(icone);
        setLoading(false);
      } catch (error) {
        setError("Erreur lors de la récupération de l'habitude");
        setLoading(false);
      }
    };

    fetchHabit();
  }, [habitId]);

  const handleInputChange = (setter) => (e) => setter(e.target.value);

  const handleEmojiSelect = (emojiObject) => {
    setIcone(emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/habitstrackers/${habitId}`, {
        habitname,
        date,
        icone,
      });
      navigate('/habitstracker');
    } catch (error) {
      setError("Erreur lors de la mise à jour de l'habitude");
    }
  };

  if (loading) return <Loading />;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="containerGeneral generalProjet">
      <TopBar pagename="Mettre à jour l'habitude" />
      
      <form className="creerProjet" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            Nom de l'habitude :
            <input className="inputNomProjet" value={habitname} onChange={handleInputChange(setHabitname)} required/>
          </label>
        </div>

        <div className="form-group">
          <label>
            Date :
            <input type="date" className="inputCategorie" value={date} onChange={handleInputChange(setDate)} required/>
          </label>
        </div>

        <div className="icone-input-container">
          <label>
            Icone :
            <input className="inputEmoji"value={icone} readOnly/>
          </label>
          <button type="button" className="emoji-button" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
            Choisir un emoji
          </button>
        </div>

        {showEmojiPicker && (
          <div className="emoji-picker-container">
            <EmojiPicker onEmojiClick={handleEmojiSelect} />
          </div>
        )}

        <button type="submit" className="addTask">
          Mettre à jour l'habitude
        </button>
      </form>
    </div>
  );
}

export default UpdateHabit;
