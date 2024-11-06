import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar';
import TopBar from "../components/TopBar/TopBar";
import Calendar from '../components/Calendar/Calendar';
import axios from 'axios'; 
import '../assets/css/agenda.css';
import '../components/MyTask/MyTask.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hook/useAuth';

function Agenda() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [userTasks, setUserTasks] = useState([]);
  const [userHabits, setUserHabits] = useState([]);
  const [error, setError] = useState(null);
  //utilise le hook d'auth pour accéder aux données utilisateur
  const { user, fetchUserInfo } = useAuth();
  const navigate = useNavigate();

  // fetch les infos utilisateur 
  useEffect(() => {
    if (!user) {
        fetchUserInfo();
    }
}, [fetchUserInfo]);

// selection date
  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  // récupération des taches de l'utilisateur
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:8080/task');
        console.log("Tâches récupérées :", response.data);
        if (Array.isArray(response.data.data)) {
          setUserTasks(response.data.data);
        } else {
          console.error("La réponse n'est pas un tableau :", response.data);
          setUserTasks([]);
        }
      } catch (err) {
        setError("Erreur lors de la récupération des tâches.");
        console.error("Erreur de récupération des tâches :", err);
      }
    };

    fetchTasks();
  }, []);

  const tasksForSelectedDate = userTasks.filter(task => task.date === selectedDate);

  // récupération des habitudes de l'utilisateur 
  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const response = await axios.get('http://localhost:8080/habitstrackers');
        console.log("Habitudes récupérées :", response.data);
        if (Array.isArray(response.data.data)) {
          setUserHabits(response.data.data);
        } else {
          console.error("La réponse n'est pas un tableau :", response.data);
          setUserHabits([]);
        }
      } catch (err) {
        setError("Erreur lors de la récupération des tâches.");
        console.error("Erreur de récupération des tâches :", err);
      }
    };

    fetchHabits();
  }, []);

  const habitsForSelectedDate = userHabits.filter(task => task.date === selectedDate);

  const goToTask = async (taskId) => {
    navigate(`/task/${taskId}`)
  }

  const goToHabits = async () => {
    navigate('/habitstracker')
  }

  return (
    <>
      <TopBar pagename={"Agenda"}/>
      <Calendar onDateSelect={handleDateSelect} />

      <div className="container">
        <div className="tasksContainer">
          <div className="tasksContainerTitle">
            <h2>Tâches du jour</h2>
            <p className='tasksContainerTitleDate'>{selectedDate}</p>
          </div>

          {error && <p>{error}</p>}
          {Array.isArray(userTasks) && tasksForSelectedDate.length > 0 ? (
            tasksForSelectedDate.map(task => (
              <div className="myTaskBox" key={task._id} onClick={(e) => {e.stopPropagation(); goToTask(task._id);}}>
                <div className="myTaskBoxContent">
                  <div className="myTaskBoxContentIcon" style={{ backgroundColor: "lightgrey" }}>
                    <span>🤹</span>
                  </div>
                  <div className="myTaskBoxContentTitle">
                    <p>{task.name}</p>
                  </div>
                  <div className="myTaskBoxSeeDetails">
                    <i className="bi bi-chevron-right"></i>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Aucune tâche pour cette date.</p>
          )}
        </div>
        <div className="tasksContainer">
          <div className="tasksContainerTitle">
            <h2>Habitudes du jour</h2>
          </div>
          {/* afficher les habitudes qui ont la meme date */}
          {error && <p>{error}</p>}
          {Array.isArray(userHabits) && habitsForSelectedDate.length > 0 ? (
            habitsForSelectedDate.map(habit => (
              <article className="containerBarre" key={habit._id}>
              {/* Barre principale de l'habitude avec les styles dynamiques */}
              <div className="barreTracker">
                {/* Icône de l'habitude */}
                <p className="iconeHabits">{habit.icone}</p>
                {/* Nom de l'habitude */}
                <p className="pHabits">{habit.habitname}</p>
                {/* Bouton avec icône plus */}
                <button className="boutonHabits">
                  <img className="iconeHabits" src="plus-solid.svg" alt="plus icon"/>
                </button>
              </div>
            </article>
            ))
            ) : (
              <p>Aucune habitude pour cette date.</p>
            )}
        </div>
      </div>
      <Navbar/>
    </>
  );
}

export default Agenda;
