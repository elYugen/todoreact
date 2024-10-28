import React from 'react';
import './SearchBar.css';

function SearchBar() {
  return (
    <>
      <div className="searchBar">
          <div className="inputWrapper">
              <i className="bi bi-search searchIcon"></i>
              <input type="text" placeholder="Rechercher une tâche..."/>
              {/* <img src="filter.svg" alt="Filtre" id="filter"/> */}
          </div>
      </div>
    </>
  );
};

export default SearchBar;