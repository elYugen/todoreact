import React from 'react';
import { useAuth } from '../../hook/useAuth';

import './HomeTopBar.css';

function HomeTopBar() {
  const { user, loading, error, login, logout } = useAuth();
  if (loading) {
    return <div>Chargement...</div>;
  }

  // S'il y a une erreur, on l'affiche
  if (error) {
    return <div>Erreur: {error}</div>;
  }

  return (
    <>
    <div className="hometopbar">
      <div className="hometopbarYou">
        {/* <div className="hometopbarLogo">
          <img src="favicon.png" alt="ProfilPicture"/>
        </div> */}
        {user ? (
        <h3>Bonjour, User</h3>
        ) : (
          <h3>Vous n'êtes pas connecté</h3>
        )}
      </div>
      <div className="hometopbarNotif">
        <i className="bi bi-bell"></i>
      </div>
    </div>
    </>
  );
};

export default HomeTopBar;