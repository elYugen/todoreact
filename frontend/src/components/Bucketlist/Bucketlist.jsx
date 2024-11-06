import React from "react";
import useUserProjects from "../../hook/useUserProjects";
import Loading from "../Loading/Loading";
import "./Bucketlist.css";
import { useAuth } from "../../hook/useAuth";
import { useNavigate } from "react-router-dom";

const Bucketlist = ({ userId }) => {
  const { projects, loading, error } = useUserProjects(userId);
  const navigate = useNavigate();

  if (loading) return <Loading/>;
  if (error) return <div>Erreur: {error}</div>;

  const limiteNomProjet = (name) => {
    if (name.length > 18) {
      return name.substring(0, 13) + "..";
    }
    return name;
  };

  return (
    <>
      {projects.map((project) => (
        <div className="bucketlistBox" key={project._id} onClick={() => navigate(`/details/project/${project._id}`)}>
          <div className="bucketlistBoxContent">
            <div className="bucketlistIconBox" style={{ backgroundColor: "#efefef" }}>
              <span>{project.icone}</span>
            </div>
            <div className="bucketlistBoxTitle" style={{ backgroundColor: "#efefef" }}>
              <div className="bucketlistBoxTitleTitre">
                <p><b>{limiteNomProjet(project.projectname)}</b></p>
              </div>
              <div className="bucketlistBoxTitleRestant">
                {/* <p>{project.description}</p> */}
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Bucketlist;
