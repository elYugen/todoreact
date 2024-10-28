import React from 'react';
import './MyTask.css';

function MyTask() {
  return (
    <div className="myTaskBox">
      <div className="myTaskBoxContent">
        <div className="myTaskBoxContentIcon" style={{ backgroundColor: "lightgrey"}}>
        <span>🤹</span>
        </div>
        <div className="myTaskBoxContentTitle">
          <p>Ma super tâche</p>
        </div>
        <div className="myTaskBoxSeeDetails">
          <i className="bi bi-chevron-right"></i>
        </div>
      </div>
    </div>
  );
};

export default MyTask;