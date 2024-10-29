// J'importe les composants et styles dont j'ai besoin pour ma page
import React, { useState } from 'react'; // Ajout de l'import de useState
import Navbar from "../components/Navbar/Navbar"
import HomeTopBar from "../components/HomeTopBar/HomeTopBar"
import SearchBar from "../components/SearchBar/SearchBar";
import CategoriesBox from "../components/CategoriesBox/CategoriesBox"
import MyTask from "../components/MyTask/MyTask"
import "../assets/css/home.css"
import Loading from "../components/Loading/Loading";
import { useAuth } from '../hook/useAuth'; // Hook pour récupérer les infos liées à l'identification

function Home() {
    // Extraction des fonctionnalités d'authentification depuis le hook useAuth
    const { 
      user,     // Informations de l'utilisateur connecté
      loading,  // État de chargement
      error,    // Messages d'erreur éventuels
      login,    // Fonction de connexion
      logout    // Fonction de déconnexion 
    } = useAuth();

    // État pour gérer l'onglet actif des tâches
    const [activeTab, setActiveTab] = useState('todo');

    // Fonction pour rendre les tâches en fonction de l'onglet actif
    const renderTasks = () => {
        switch(activeTab) {
            case 'todo':
                return (
                    <>
                        <MyTask />
                        <MyTask />
                        <MyTask />
                    </>
                );
            case 'completed':
                return (
                    <>
                        <MyTask />
                        <MyTask />
                    </>
                );
            case 'all':
                return <MyTask />;
            default:
                return null;
        }
    };

  return (
      <>
       {/* Rendu conditionnel basé sur l'état de connexion grâce à un if simplifié */}
      {user ? (
        // Interface pour utilisateur connecté
        <>
      {/* Je fais une instance de mon composant pour l'intégrer à ma page */}
      <HomeTopBar/>
      <div className="container">
        <SearchBar/> 

        {/* Liste des catégories */}
        <div className="homeContainer">
          <div className="homeTop">
              <h3>Projet en cours</h3>
              <a href="#">Voir tout</a>
          </div>
          <div className="homeCategoriesBox">
            <CategoriesBox/>
            <CategoriesBox/>
            <CategoriesBox/>
          </div>
        </div> 

        {/* Liste des tâches */}
        <div className="homeContainer">
          <div className="homeTop">
            <h3>Tâches du jour</h3>
          </div>
          {/* Nouvelle section pour les onglets de tâches */}
          <div className="homeTaskStateList">
            <button className={`${activeTab === 'todo' ? 'homeTaskStateActive' : 'homeTaskState'}`} onClick={() => setActiveTab('todo')}>À Faire</button>
            <button className={`${activeTab === 'completed' ? 'homeTaskStateActive' : 'homeTaskState '}`} onClick={() => setActiveTab('completed')}>Compléter</button>
            <button className={`${activeTab === 'all' ? 'homeTaskStateActive' : 'homeTaskState '}`} onClick={() => setActiveTab('all')}>Tout</button>
          </div>
          {/* Affichage des tâches en fonction de l'onglet actif */}
          {renderTasks()}
        </div>

      </div>
      
      <Navbar/>
      </>
      ) : (
        // Page d'accueil pour utilisateur non connecté
      <>
      <div className="homeBody">
      <div className="homePage">
        <div className="homeLogo">
            <img src="logo.png" alt="Logo"/>
            <p>La ToDo qui te prend par les <strong>boules</strong></p>
        </div>
        <a href="/login">
        <button className="homeDisconnectButton">Commencer</button>
        </a>
      </div>
      </div>
      </>
      )}
      </>
  );
};

export default Home;