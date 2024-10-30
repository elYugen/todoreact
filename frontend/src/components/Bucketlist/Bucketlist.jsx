import React from "react";
import useUserProjects from "../../hook/useUserProjects";
import Loading from "../Loading/Loading";
import "./Bucketlist.css";

const Bucketlist = ({ userId }) => {
  const { projects, loading, error } = useUserProjects(userId);

  if (loading) return <Loading/>;
  if (error) return <div>Erreur: {error}</div>;

  return (
    <>
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
    </>
  );
};

export default Bucketlist;
