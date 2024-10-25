import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import Mois from "../components/Mois/Mois";
import "../assets/css/home.css";

function Agenda() {
  // Liste des mois pour l'affichage
  const months = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

  // États pour gérer l'année et le mois sélectionnés
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // Année par défaut = année actuelle
  const [selectedMonth, setSelectedMonth] = useState(null); // Pas de mois sélectionné par défaut

  // Gestionnaire pour changer l'année
  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
    setSelectedMonth(null); // Réinitialiser le mois sélectionné si l'année change
  };

  // Gestionnaire pour changer le mois
  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  return (
    <>
      <h1 className='agendaTitle'>Agenda</h1>

      {/* Sélection de l'année */}
      <div className='SelectYears'>
        <label htmlFor="yearSelect">Sélectionnez l'année : &nbsp; </label>
        <select id="yearSelect" value={selectedYear} onChange={handleYearChange}>
          {/* Affiche les options des années, de 2020 à 2030 */}
          {Array.from({ length: 11 }, (_, i) => 2020 + i).map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>

      {/* Sélection du mois */}
      <div className='SelectMonths'>
        <label htmlFor="monthSelect">Sélectionnez le mois : &nbsp; </label>
        <select id="monthSelect" value={selectedMonth || ''} onChange={handleMonthChange}>
          <option value="" disabled>-- Choisir un mois --</option>
          {/* Affiche les options des mois */}
          {months.map((month, index) => (
            <option key={index} value={index}>{month}</option>
          ))}
        </select>
      </div>

      {/* Affichage du calendrier si un mois est sélectionné */}
      
      {selectedMonth !== null && (
        <div className='calendarBox'>
  <div className="calendarContainer">
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      weekends={true}
      initialDate={`${selectedYear}-${String(Number(selectedMonth) + 1).padStart(2, '0')}-01`}
      events={[
        { title: 'event 1', date: `${selectedYear}-10-24` },
        { title: 'event 2', date: `${selectedYear}-10-25` }
      ]}
    />
  </div>
  </div>
)}
        
    </>
  );
}

export default Agenda;
