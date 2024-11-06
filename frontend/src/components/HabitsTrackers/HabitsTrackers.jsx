import React, { useEffect } from "react";
import useUserHabits from "../../hook/useHabits";
import Loading from "../Loading/Loading";
import "./HabitsTrackers.css";
import HabitsTracker from "../../pages/HabitsTracker";
import { useState } from "react";
import axios from "axios";

const HabitsTrackers = ({ userId }) => {
  const { habits, loading, error, setHabits } = useUserHabits(userId);
  const [colors, setColors] = useState({});

  // Fonction pour basculer `isCompleted` et les couleurs pour chaque habit
  const toggleHabitCompletion = async (id) => {
    // Basculez les couleurs localement
    const isCurrentlyCompleted = colors[id]?.isCompleted === true;
    const updatedColors = {
      ...colors,
      [id]: {
        backgroundColor: isCurrentlyCompleted ? "#4cc0ee" : "lightgreen",
        borderColor: isCurrentlyCompleted ? "#1464C7" : "green",
        isCompleted: !isCurrentlyCompleted,
      },
    };
    setColors(updatedColors);

    // Envoyer la mise à jour au backend
    try {
      const updatedHabit = await axios.put(`http://localhost:8080/habitstrackers/${id}`, {
        backgroundColor: updatedColors[id].backgroundColor,
        borderColor: updatedColors[id].borderColor,
        isCompleted: updatedColors[id].isCompleted,
      });
      
      // Mettre à jour l'état global des habitudes après modification
      setHabits((prevHabits) =>
        prevHabits.map((habit) =>
          habit._id === id ? { ...habit, isCompleted: updatedHabit.data.isCompleted } : habit
        )
      );
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'habitude :", error);
    }
  };

  if (loading) return <Loading />;
  if (error) return <div>Erreur: {error}</div>;

  return (
    <>
      {habits.map((habit) => (
        <article className="containerBarre" key={habit._id}>
          <div className="boutonsBarre">
            <img
              className="iconeUpdateDelete Ud1"
              src="../../../public/check-solid.svg"
              alt="icone update"
              onClick={() => toggleHabitCompletion(habit._id)}
            />
            <img className="iconeUpdateDelete Ud2" src="../../../public/pencil-solid.svg" alt="icone update" />
            <img className="iconeUpdateDelete Ud3" src="../../../public/xmark-solid.svg" alt="icone update" />
          </div>
          <div
            className="barreTracker"
            style={{
              backgroundColor: colors[habit._id]?.backgroundColor || "#4cc0ee",
              borderColor: colors[habit._id]?.borderColor || "#1464C7",
            }}
          >
            <p className="iconeHabits">{habit.icone}</p>
            <p className="pHabits">{habit.habitname}</p>
            <button className="boutonHabits">
              <img className="iconeHabits" src="plus-solid.svg" alt="plus icon" />
            </button>
          </div>
        </article>
      ))}
    </>
  );
};

export default HabitsTrackers;