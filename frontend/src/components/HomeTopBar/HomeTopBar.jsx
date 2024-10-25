import React from 'react';
import { useAuth } from '../../hook/useAuth';
import Loading from '../Loading/Loading';

import './HomeTopBar.css';

function HomeTopBar() {
  const { user, loading, error, login, logout } = useAuth();
  if (loading) {
    return <Loading/>;
  }

  // S'il y a une erreur, on l'affiche
  if (error) {
    return <div>Erreur: {error}</div>;
  }

  return (
    <>
    {user ? (
    <div className="hometopbar">
      <div className="hometopbarYou">
        <div className="hometopbarLogo">
          <img src={user.profilePicture} alt="ProfilPicture"/>
        </div>
        <h3>Bonjour, {user.username}</h3>
      </div>
      <div className="hometopbarNotif">
      <a onClick={() => {window.location.reload}}><i className="bi bi-bell"></i></a>
      </div>
    </div>
    ) : (
    <div className="hometopbar">
      <div className="hometopbarYou">
        <div className="hometopbarLogo">
          <img src="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg" alt="ProfilPicture"/>
        </div>
        <h3>Vous n'êtes pas connecté</h3>
      </div>
      <div className="hometopbarNotif">
      <a onClick={() => {window.location.reload}}><i className="bi bi-bell"></i></a>
      </div>
    </div>
    )}
    </>
  );
};

export default HomeTopBar;