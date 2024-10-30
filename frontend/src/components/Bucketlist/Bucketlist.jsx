import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Bucketlist.css";
import { useAuth } from "../../hook/useAuth";

function Bucketlist() {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth();

  const fetchProjects = async () => {
    try {
      // Récupère les projets liés à l'utilisateur connecté
      const response = await axios.get(`http://localhost:8080/projects?userId=${user._id}`);
      setProjects(response.data.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des projets :", error);
    }
  };

  useEffect(() => {
    if (user) fetchProjects();
  }, [user]);

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
