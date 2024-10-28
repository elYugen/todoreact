import React from 'react';
import './TopBar.css';

// Je donne un paramètre "pagename" qui sera un "props", une propriété passable entre fichier
function TopBar({ pagename }) {
  return (
    <>
    <div className="topbar">
      <div className="topbarInfo">
        <div className="topbarLogo">
          <a href="/"><i className="bi bi-arrow-left"></i></a>
        </div>
        {/* Voici mon props "pagename", quand ce composant sera appelé sur une autre page,
            il suffira de lui donner le paramètre "pagename" pour afficher le nom de la page */}
        <h3>{pagename}</h3>
      </div>
      <div className="topbarNotif">
        <i className="bi bi-bell"></i>
      </div>
    </div>
    </>
  );
};

export default TopBar;