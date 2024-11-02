import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar';
import TopBar from "../components/TopBar/TopBar";
import Calendar from '../components/Calendar/Calendar';
import axios from 'axios'; 
import '../assets/css/agenda.css';
import '../components/MyTask/MyTask.css';

function Agenda() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [userTasks, setUserTasks] = useState([]);
  const [error, setError] = useState(null);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('https://todoback-production-2aac.up.railway.app/task');
        console.log("Tâches récupérées :", response.data); // Vérifiez le format ici
        // Accédez à response.data.data pour obtenir le tableau des tâches
        if (Array.isArray(response.data.data)) {
          setUserTasks(response.data.data);
        } else {
          console.error("La réponse n'est pas un tableau :", response.data);
          setUserTasks([]); // Ou gérez l'erreur comme vous le souhaitez
        }
      } catch (err) {
        setError("Erreur lors de la récupération des tâches.");
        console.error("Erreur de récupération des tâches :", err);
      }
    };

    fetchTasks();
  }, []);

  const tasksForSelectedDate = userTasks.filter(task => task.date === selectedDate);

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
              <div className="myTaskBox" key={task._id}>
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
      </div>
      <Navbar/>
    </>
  );
}

export default Agenda;
