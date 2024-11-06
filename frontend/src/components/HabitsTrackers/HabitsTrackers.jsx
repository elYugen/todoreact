// Importation des dépendances nécessaires
import React, { useEffect, useState } from "react"; // React et ses hooks
import { useParams, useNavigate } from 'react-router-dom';
import useUserHabits from "../../hook/useHabits"; // Hook personnalisé pour gérer les habitudes
import Loading from "../Loading/Loading"; // Composant de chargement
import "./HabitsTrackers.css" // Styles CSS
import axios from "axios"; // Bibliothèque pour faire des requêtes HTTP

// Définition du composant HabitsTrackers qui prend userId comme prop
const HabitsTrackers = ({ userId }) => {
  // Utilisation du hook personnalisé qui nous donne accès aux habitudes de l'utilisateur
  // habits: tableau des habitudes
  // loading: état de chargement
  // error: message d'erreur s'il y en a un
  // setHabits: fonction pour mettre à jour les habitudes
  const { habits, loading, error, setHabits } = useUserHabits(userId);
  const navigate = useNavigate();


  // ----------- Fonction qui gère le clic sur le bouton check pour marquer une habitude comme complétée------------------------//
  const toggleHabitCompletion = async (habit) => {
    // Inverse l'état actuel de isCompleted
    const newIsCompleted = !habit.isCompleted;
    
    try {
      // Envoi d'une requête PUT au serveur pour mettre à jour l'habitude
      // L'URL contient l'ID de l'habitude à modifier
      const response = await axios.put(`http://localhost:8080/habitstrackers/${habit._id}`, {
        isCompleted: newIsCompleted,
      });

      // Si la requête a réussi et qu'on a reçu une réponse
      if (response.data) {
        // Mise à jour de l'état local des habitudes
        setHabits(prevHabits =>
          // On parcourt toutes les habitudes
          prevHabits.map((habite) => {
            // Si c'est l'habitude qu'on vient de modifier
            if (habite._id === response.data._id) {
              // On retourne une nouvelle habitude avec isCompleted mis à jour
              return {
                _id: habite._id,
                habitname: habite.habitname,
                icone: habite.icone,
                isCompleted: newIsCompleted,
              };
            }
            // Sinon on retourne l'habitude sans la modifier
            return habite;
          })
        );
      }
    } catch (error) {
      // En cas d'erreur, on l'affiche dans la console
      console.error("Erreur lors de la mise à jour de l'habitude :", error);
    }
  };


  // Fonction qui retourne les styles CSS en fonction de l'état isCompleted
  const getHabitStyles = (isCompleted) => {
    return {
      // Si isCompleted est true, fond vert clair, sinon bleu clair
      backgroundColor: isCompleted ? "lightgreen" : "#4cc0ee",
      // Si isCompleted est true, bordure verte, sinon bleue
      borderColor: isCompleted ? "green" : "#1464C7",
    };
  };

    // ------------------------ Fonction pour supprimer une habitude ----------------------------------------------------//
    async function handledelete(habit) {
      try {
        await axios.delete(`http://localhost:8080/habitstrackers/${habit._id}`);
        location.reload();
      } catch (error) {
        console.log("Erreur lors de la suppression de l'habitude :", error);
      }
    };

    // ------------------------ Fonction pour éditer une habitude ----------------------------------------------------//

    const goToEdit = async (habitId) => {
      navigate (`/update/habit/${habitId}`)
    }

  // Si les données sont en cours de chargement, on affiche le composant Loading
  if (loading) return <Loading />;
  // Si une erreur s'est produite, on affiche le message d'erreur
  if (error) return <div>Erreur: {error}</div>;

  // Rendu du composant
  return (
    <>
      {/* On parcourt le tableau des habitudes pour créer un article pour chacune */}
      {habits.map((habit) => (
        // Pour chaque habitude, on crée un article avec une clé unique (key)
        <article className="containerBarre" key={habit._id}>
          {/* Div contenant les boutons d'action */}
          <div className="boutonsBarre">
            {/* Bouton check qui appelle toggleHabitCompletion au clic */}
            <img className="iconeUpdateDelete Ud1" src="../../../public/check-solid.svg" alt="icone update" onClick={() => toggleHabitCompletion(habit)}/>
            {/* Bouton pour modifier l'habitude */}
            <img className="iconeUpdateDelete Ud2" src="../../../public/pencil-solid.svg" alt="icone update" onClick={() => goToEdit(habit._id)}/>
            {/* Bouton pour supprimer l'habitude */}
            <img className="iconeUpdateDelete Ud3" src="../../../public/xmark-solid.svg" alt="icone update" onClick={() => handledelete(habit)}/>

          </div>
          {/* Barre principale de l'habitude avec les styles dynamiques */}
          <div className="barreTracker" style={getHabitStyles(habit.isCompleted)}>
            {/* Icône de l'habitude */}
            <p className="iconeHabits">{habit.icone}</p>
            {/* Nom de l'habitude */}
            <p className="pHabits">{habit.habitname}</p>
            {/* Bouton avec icône plus */}
            <button className="boutonHabits">
              <img className="iconeHabits" src="plus-solid.svg" alt="plus icon"/>
            </button>
          </div>
        </article>
      ))}
    </>
  );
};

// Export du composant pour pouvoir l'utiliser ailleurs
export default HabitsTrackers;