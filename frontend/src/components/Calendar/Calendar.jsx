import React from 'react';
import FullCalendar from '@fullcalendar/react'; // Doit être importé depuis le package
import dayGridPlugin from '@fullcalendar/daygrid'; // Plugin du calendrier pour la vue mensuelle
import './Calendar.css';

function Calendar() {
  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      weekends={true}
      events={[
        { title: 'event 1', date: '2023-10-24' },
        { title: 'event 2', date: '2023-10-25' }
      ]}
    />
  );
}

export default Calendar;
