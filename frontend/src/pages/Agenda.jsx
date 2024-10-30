// Import des dépendances React et des composants nécessaires
import React, { useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import TopBar from "../components/TopBar/TopBar";
import Calendar from '../components/Calendar/Calendar';
import '../assets/css/agenda.css';
import '../components/MyTask/MyTask.css';

// Exemple de task pour l'affichage avant back
const userTasks = [
  { id: 1, date: '2024-10-28', title: 'chier un coup' },
  { id: 2, date: '2024-10-28', title: 'nourir le mioche' },
  { id: 3, date: '2024-10-29', title: 'faire du backend' },
  { id: 4, date: '2024-10-30', title: 'dire bonjour a type enfermé dans mon garage' },
];

// Composant principal Agenda
function Agenda() {
  // État local pour stocker la date sélectionnée
  // Initialisation avec la date du jour au format YYYY-MM-DD
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  // Fonction appelée quand une date est sélectionnée dans le calendrier
  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  // Filtre les tâches pour n'afficher que celles de la date sélectionnée
  const tasksForSelectedDate = userTasks.filter(task => task.date === selectedDate);

  // Rendu du composant
  return (
    <>
      {/* Barre de navigation supérieure avec le titre "Agenda" */}
      <TopBar pagename={"Agenda"}/>

      {/* Composant Calendrier qui permet la sélection de date */}
      <Calendar onDateSelect={handleDateSelect} />

      {/* Conteneur principal */}
      <div className="container">
        {/* Section des tâches */}
        <div className="tasksContainer">
          {/* En-tête avec le titre et la date sélectionnée */}
          <div className="tasksContainerTitle">
            <h2>Tâches du jour</h2>
            <p className='tasksContainerTitleDate'>{selectedDate}</p>
          </div>

          {/* Affichage conditionnel : tâches ou message "aucune tâche" */}
          {tasksForSelectedDate.length > 0 ? (
            <>
              {/* Map sur les tâches filtrées pour les afficher */}
              {tasksForSelectedDate.map(task => (
                // Boîte individuelle pour chaque tâche
                <div className="myTaskBox" key={task.id}>
                  <div className="myTaskBoxContent">
                    {/* Icône de la tâche */}
                    <div className="myTaskBoxContentIcon" style={{ backgroundColor: "lightgrey"}}>
                      <span>🤹</span>
                    </div>
                    {/* Titre de la tâche */}
                    <div className="myTaskBoxContentTitle">
                      <p>{task.title}</p>
                    </div>
                    {/* Flèche pour voir les détails */}
                    <div className="myTaskBoxSeeDetails">
                      <i className="bi bi-chevron-right"></i>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            // Message affiché quand il n'y a pas de tâches pour la date sélectionnée
            <p>Aucune tâche pour cette date.</p>
          )}
        </div>
      </div>
      <Navbar/>
    </>
  );
}

// Exporte le composant pour l'utiliser dans d'autres fichiers
export default Agenda;