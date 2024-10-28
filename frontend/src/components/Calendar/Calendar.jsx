import React, { useState } from 'react';
import './Calendar.css';

const generateDates = (numDays, startDate = new Date()) => {
  return Array.from({ length: numDays }, (_, i) => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    return date;
  });
};

const Calendar = ({ onDateSelect }) => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const dates = generateDates(30);

  const handleDateClick = (date) => {
    const formattedDate = date.toISOString().split('T')[0];
    setSelectedDate(formattedDate);
    onDateSelect(formattedDate);
  };

  return (
    <div className="horizontal-date-picker">
      {dates.map((date) => (
        <div
          key={date.toISOString()}
          className={`date-item ${date.toISOString().split('T')[0] === selectedDate ? 'selected' : ''}`}
          onClick={() => handleDateClick(date)}
        >
          <span className="day-name">{date.toLocaleDateString('fr-FR', { weekday: 'short' })}</span>
          <span className="day-number">{date.getDate()}</span>
        </div>
      ))}
    </div>
  );
};

export default Calendar;
