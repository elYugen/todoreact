import React from "react";
import useUserHabits from "../../hook/useHabits";
import Loading from "../Loading/Loading";
import "./HabitsTrackers.css";
import HabitsTracker from "../../pages/HabitsTracker";

const HabitsTrackers = ({ userId }) => {
  const { habits, loading, error } = useUserHabits(userId);

  if (loading) return <Loading/>;
  if (error) return <div>Erreur: {error}</div>;

  return (
    <>
      {habits.map((habit) => (
        
        <>
        <div className="barreTracker" key={habit._id}>
          <p className="iconeHabits">{habit.icone}</p>
          <p className="pHabits">{habit.habitname}</p>
          <button className="boutonHabits"><img className="iconeHabits" src="plus-solid.svg" alt="plus icon"/></button>
        </div>
        </>
        ))}
    </>
  );
};

export default HabitsTrackers;
