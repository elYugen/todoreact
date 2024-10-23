import React from 'react';
import './SearchBar.css';

function SearchBar() {
  return (
    <>
      <div class="searchBar">
          <div class="inputWrapper">
              <i class="bi bi-search searchIcon"></i>
              <input type="text" placeholder="Rechercher une tâche..."/>
              {/* <img src="filter.svg" alt="Filtre" id="filter"/> */}
          </div>
      </div>
    </>
  );
};

export default SearchBar;