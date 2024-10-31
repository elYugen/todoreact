import React from 'react';
import './CategoriesBox.css';
import Loading from '../Loading/Loading';
import useUserProjects from '../../hook/useUserProjects';
import { useNavigate } from 'react-router-dom';

function CategoriesBox( {userId} ) {
  const { projects, loading, error } = useUserProjects(userId);
  const navigate = useNavigate();

  if (loading) return <Loading/>;
  if (error) return <div>Erreur: {error}</div>;

  if (projects.length === 0) {
    return <><p>Tu n'as pas encore de projet en cours.</p></>;
  }

  return (
    <>
    {projects.map((project) => (
    <div className="categorieBox" style={{ backgroundColor: "#4cc0ee"}} key={project._id} onClick={() => navigate(`/details/project/${project._id}`)}>
      <div className="categorieBoxTop">
        <div className="categorieIconBox" style={{ backgroundColor: "#3e9ee0"}}>
          <span>🤹</span>
        </div>
        <i className="bi bi-arrow-right"></i>
      </div>
      <div className="categorieBoxInfo">
      <p><b>{project.projectname}</b></p>
        {/* <p>2/10 Tâches</p> */}
      </div>
      <div className="categorieBoxProgress">
        <div className="progress-container">
          <div className="progress-bar" style={{width: "20%"}}></div>
        </div>
        <p>2/10</p>
      </div>
    </div>
    ))}
    </>);
};

export default CategoriesBox;