// Import des dépendances nécessaires de React 
import React, { useState } from 'react';
// Import du fichier CSS pour les styles
import './Calendar.css';

// Fonction utilitaire qui génère un tableau de dates
// numDays: nombre de jours à générer
// startDate: date de départ (par défaut: date d'aujourd'hui)
const generateDates = (numDays, startDate = new Date()) => {
  // Crée un tableau avec numDays éléments
  return Array.from({ length: numDays }, (_, i) => {
    // Pour chaque élément, crée une nouvelle date
    const date = new Date(startDate);
    // Ajoute i jours à la date de départ
    date.setDate(date.getDate() + i);
    return date;
  });
};

// Composant principal Calendar
// onDateSelect: fonction callback appelée quand une date est sélectionnée
const Calendar = ({ onDateSelect }) => {
  // État local pour stocker la date sélectionnée
  // useState initialise la date avec la date du jour au format YYYY-MM-DD
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  
  // Génère 30 dates à partir d'aujourd'hui
  const dates = generateDates(30);

  // Fonction appelée quand l'utilisateur clique sur une date
  const handleDateClick = (date) => {
    // Convertit la date au format YYYY-MM-DD
    const formattedDate = date.toISOString().split('T')[0];
    // Met à jour l'état local
    setSelectedDate(formattedDate);
    // Appelle la fonction callback fournie par le parent
    onDateSelect(formattedDate);
  };

  // Rendu du composant
  return (
    // Conteneur principal avec classe CSS pour le style horizontal
    <div className="horizontal-date-picker">
      {/* Map sur le tableau de dates pour créer les éléments du calendrier */}
      {dates.map((date) => (
        <div
          // Clé unique requise par React pour les listes
          key={date.toISOString()}
          // Classes CSS: 'date-item' toujours présente
          // 'selected' ajoutée uniquement si la date est sélectionnée
          className={`date-item ${date.toISOString().split('T')[0] === selectedDate ? 'selected' : ''}`}
          // Gestionnaire de clic sur une date
          onClick={() => handleDateClick(date)}
        >
          {/* Affiche le nom du jour en format court en français */}
          <span className="day-name">
            {date.toLocaleDateString('fr-FR', { weekday: 'short' })}
          </span>
          {/* Affiche le numéro du jour */}
          <span className="day-number">{date.getDate()}</span>
        </div>
      ))}
    </div>
  );
};

// Exporte le composant pour l'utiliser dans d'autres fichiers
export default Calendar;