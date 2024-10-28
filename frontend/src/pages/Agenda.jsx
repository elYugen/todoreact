import React, { useState } from 'react';
import TopBar from "../components/TopBar/TopBar";
import Calendar from '../components/Calendar/Calendar';
import '../assets/css/agenda.css';
import '../components/MyTask/MyTask.css';

const userTasks = [
  { id: 1, date: '2024-10-28', title: 'lblblblblbl' },
  { id: 2, date: '2024-10-28', title: 'manger une pomme' },
  { id: 3, date: '2024-10-29', title: 'faire du backend' },
  { id: 4, date: '2024-10-30', title: 'chier un coup' },
];

function Agenda() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  // Filtrer les tâches pour la date sélectionnée
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

        {tasksForSelectedDate.length > 0 ? (
          <>
            {tasksForSelectedDate.map(task => (
              <div className="myTaskBox" key={task.id}>
                <div className="myTaskBoxContent">
                  <div className="myTaskBoxContentIcon" style={{ backgroundColor: "lightgrey"}}>
                  <span>🤹</span>
                  </div>
                  <div className="myTaskBoxContentTitle">
                    <p>{task.title}</p>
                  </div>
                  <div className="myTaskBoxSeeDetails">
                    <i class="bi bi-chevron-right"></i>
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <p>Aucune tâche pour cette date.</p>
        )}
    </div>

      </div>
    </>
  );
}

export default Agenda;
