import React from 'react';
import './SearchBar.css';
import { useState, useEffect, useCallback } from "react";
import useSearch from "../../hook/useSearch";
import Loading from "../../components/Loading/Loading";

const SearchBar = ({ userId }) => {
  const { projects, task, loading, error, searchByUserId } = useSearch(userId);
  const [query, setQuery] = useState("");

  const handleSearch = useCallback(() => {
    const timer = setTimeout(() => {
      searchByUserId(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query, searchByUserId]);

  useEffect(() => {
    handleSearch();
  }, [query, handleSearch]);

  return (
    <>
    <div style={{ position: "relative" }}>
      <div className="searchBar">
          <div className="inputWrapper">
              <i className="bi bi-search searchIcon"></i>
              <input type="text" placeholder="Rechercher une tâche, ou un projet..." value={query} onChange={(e) => setQuery(e.target.value)}/>
              {/* <img src="filter.svg" alt="Filtre" id="filter"/> */}
          </div>
      </div>

      {query && ( 
        <div style={{ position: "absolute", top: "100%", left: 0,  width: "100%", backgroundColor: "white", border: "1px solid #ccc", borderRadius: "4px", zIndex: 10,  maxHeight: "200px", overflowY: "auto", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)"
        }}>
          {loading && <Loading/>}
          {error && <p style={{ padding: "8px" }}>{error}</p>}
          {!loading && !error && (
            <>
              <div style={{ padding: "8px" }}>
                {projects.length ? projects.map((project) => (
                  <p key={project._id} style={{ margin: "4px 0" }}>{project.projectname} - <strong style={{ fontSize: "10px" }}>Projet</strong></p>
                )) : <>Aucun projet trouvé</>}
              </div>
              <div style={{ padding: "8px" }}>
                {task.length ? task.map((task) => (
                  <p key={task._id} style={{ margin: "4px 0" }}>{task.name} - <strong style={{ fontSize: "10px" }}>Tâche</strong></p>
                )) : <>Aucune tâche trouvé</>}
              </div>
            </>
          )}
        </div>
      )}
      </div>
    </>
  );
};

export default SearchBar;