import React, { useEffect } from 'react';
import { useAuth } from '../../hook/useAuth'; // Importation du hook personnalisé pour l'authentification
import Loading from '../Loading/Loading'; // Importation d'un composant de chargement

import './HomeTopBar.css';

function HomeTopBar() {
  // Utilisation du hook useAuth pour obtenir les informations d'utilisateur, l'état de chargement, et les fonctions d'authentification
  const { user, loading, error, fetchUserInfo } = useAuth();

    // Effet pour recharger les infos utilisateur au montage du composant
    useEffect(() => {
      if (!user) {
        fetchUserInfo();
      }
    }, [fetchUserInfo]);

  // Si le chargement est en cours, retourner null (ou un composant de chargement)
  if (loading) {
    return <Loading/>;
  }

  // S'il y a une erreur, on l'affiche
  if (error) {
    return <div>Erreur: {error}</div>;
  }

  return (
    <>
    {/* Affichage conditionnel si l'utilisateur est connecté ou non */}
    {user ? (
    <div className="hometopbar">
      <div className="hometopbarYou">
        <div className="hometopbarLogo">
          <img src={user.profilePicture} alt="ProfilPicture"/>
        </div>
        {/* Si l'utilisateur est connecté, afficher un message de bienvenue avec son nom d'utilisateur */}
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
        {/* Si l'utilisateur n'est pas connecté, afficher un message indiquant qu'il n'est pas connecté */}
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