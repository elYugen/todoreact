import React from 'react';
import './HomeTopBar.css';

function HomeTopBar() {
  return (
    <>
    <div className="hometopbar">
      <div className="hometopbarYou">
        {/* <div className="hometopbarLogo">
          <img src="favicon.png" alt="ProfilPicture"/>
        </div> */}
        <h3>Bonjour, User</h3>
      </div>
      <div className="hometopbarNotif">
        <i className="bi bi-bell"></i>
      </div>
    </div>
    </>
  );
};

export default HomeTopBar;