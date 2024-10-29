import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Bucketlist.css";

function Bucketlist() {
  // État pour stocker les projets
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  // Fonction pour récupérer les projets depuis l'API
  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:8080/projects');
      setProjects(response.data.data); // Met à jour l'état avec la liste des projets
    } catch (error) {
      console.error("Erreur lors de la récupération des projets :", error);
    }
  };

  // Utilisation de useEffect pour récupérer les projets au chargement du composant
  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="container">
      <div className="bucketlistContainer">
        {/* Boîte pour ajouter un nouveau projet */}
        <div className="bucketlistBox" onClick={() => navigate('/createproject')}>
          <div className="bucketlistBoxContent">
            <div className="bucketlistIconBox" style={{ backgroundColor: "#faeeff"}}>
              <span>➕</span>
            </div>
            <div className="bucketlistBoxTitle" style={{ backgroundColor: "#efefef"}}>
              <div className="bucketlistBoxTitleTitre">
                <p style={{ fontSize: "18px", marginTop: "20px"}}><b>Ajouter un projet</b></p>
              </div>
            </div>
          </div>
        </div>

        {/* Affichage des projets sous forme de cartes */}
        {projects.map((project) => (
          <div className="bucketlistBox" key={project._id}>
            <div className="bucketlistBoxContent">
              <div className="bucketlistIconBox" style={{ backgroundColor: "#efefef" }}>
                <span>📌</span>
              </div>
              <div className="bucketlistBoxTitle" style={{ backgroundColor: "#efefef" }}>
                <div className="bucketlistBoxTitleTitre">
                  <p><b>{project.projectname}</b></p>
                </div>
                <div className="bucketlistBoxTitleRestant">
                  <p>{project.description}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Bucketlist;
