import React from "react";
import "./Bucketlist.css";

function Bucketlist() {
  return (
    <>
      <div className="container">
        <div className="bucketlistContainer">
        {/* Box d'ajout à la bucketlist */}
        <div className="bucketlistBox">
          <div className="bucketlistBoxContent">
            <div className="bucketlistIconBox" style={{ backgroundColor: "#faeeff"}}>
              <span>➕</span>
            </div>
            {/* <div className="bucketlistBoxTitle" style={{ backgroundColor: "#efefef"}}>
              <div className="bucketlistBoxTitleTitre">
                <p style={{ fontSize: "18px", marginTop: "20px"}}><b>Ajouter</b></p>
              </div>
            </div> */}
          </div>
        </div>

        {/* Nouvelle box ajouté à chaque fois que l'utilisateur créer une liste */}
        <div className="bucketlistBox">
          <div className="bucketlistBoxContent">
            <div className="bucketlistIconBox" style={{ backgroundColor: "#efefef"}}>
              <span>🤹</span>
            </div>
            <div className="bucketlistBoxTitle" style={{ backgroundColor: "#efefef"}}>
              <div className="bucketlistBoxTitleTitre">
                <p><b>Titre Categ</b></p>
              </div>
              <div className="bucketlistBoxTitleRestant">
                <p>Tâche : 10</p>
              </div>
            </div>
          </div>
        </div>

        </div>
      </div>

    </>
  );
}

export default Bucketlist;
