import React, { useEffect, useState } from "react";
import useUserHabits from "../../hook/useHabits";
import Loading from "../Loading/Loading";
import "./HabitsTrackers.css"
import axios from "axios";

const HabitsTrackers = ({ userId }) => {
  const { habits, loading, error, setHabits } = useUserHabits(userId);

  // fonction pour basculer `isCompleted` et les couleurs pour chaque habit
  const toggleHabitCompletion = async (habit) => {
    const newIsCompleted = !habit.isCompleted;
    
    try {
      // envoyer la mise à jour au back
      const response = await axios.put(`http://localhost:8080/habitstrackers/${habit._id}`, {
        isCompleted: newIsCompleted,
      });

      // mettre à jour l'état local après confirmation du serveur
      if (response.data) {
        setHabits(prevHabits =>
          prevHabits.map((habit) => {
            if (habit._id === response.data._id) {
              return {
                _id: habit._id,
                habitname: habit.habitname,
                icone: habit.icone,
                isCompleted: newIsCompleted,
              };
            }
            return habits;
          })
        );
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'habitude :", error);
    }
  };

  // fonction pour mettre les styles en fonction de isCompleted
  const getHabitStyles = (isCompleted) => {
    return {
      backgroundColor: isCompleted ? "lightgreen" : "#4cc0ee",
      borderColor: isCompleted ? "green" : "#1464C7",
    };
  };

  if (loading) return <Loading />;
  if (error) return <div>Erreur: {error}</div>;

  return (
    <>
      {habits.map((habit) => (
        <article className="containerBarre" key={habit._id}>
          <div className="boutonsBarre">
            <img className="iconeUpdateDelete Ud1" src="../../../public/check-solid.svg" alt="icone update" onClick={() => toggleHabitCompletion(habit)}/>
            <img className="iconeUpdateDelete Ud2" src="../../../public/pencil-solid.svg" alt="icone update"/>
            <img className="iconeUpdateDelete Ud3" src="../../../public/xmark-solid.svg" alt="icone update"/>
          </div>
          <div className="barreTracker" style={getHabitStyles(habit.isCompleted)}>
            <p className="iconeHabits">{habit.icone}</p>
            <p className="pHabits">{habit.habitname}</p>
            <button className="boutonHabits"><img className="iconeHabits" src="plus-solid.svg" alt="plus icon"/></button>
          </div>
        </article>
      ))}
    </>
  );
};

export default HabitsTrackers;