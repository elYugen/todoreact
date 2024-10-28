import React from 'react';
import './CategoriesBox.css';

function CategoriesBox() {
  return (
    <div className="categorieBox" style={{ backgroundColor: "#4cc0ee"}}>
      <div className="categorieBoxTop">
        <div className="categorieIconBox" style={{ backgroundColor: "#3e9ee0"}}>
          <span>🤹</span>
        </div>
        <i className="bi bi-arrow-right"></i>
      </div>
      <div className="categorieBoxInfo">
        <h4>Nom Categorie</h4>
        <p>2 Tâches</p>
      </div>
      <div className="categorieBoxProgress">
        <div className="progress-container">
          <div className="progress-bar" style={{width: "20%"}}></div>
        </div>
        <p>2/10</p>
      </div>
    </div>
  );
};

export default CategoriesBox;