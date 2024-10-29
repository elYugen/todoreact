import TopBar from "../components/TopBar/TopBar";

function HabitsTacker() {
  return (
      <>
      <TopBar pagename={"Trackeur D'Habitude"}/>
      <section className="containerGeneral">

      <article className="today">
        <h2 className="titreBloc">Aujourd'hui</h2>

        <div className="barreTracker">
          <img className="iconeHabits" src="glass-water-droplet-solid.svg" alt="glass of water icon" />
          <p className="pHabits">Eau</p>
          <button className="boutonHabits"><img className="iconeHabits" src="plus-solid.svg" alt="plus icon"/></button>
        </div>

        <div className="barreTracker">
          <img className="iconeHabits" src="dumbbell-solid.svg" alt="dumbbell icon" />
          <p className="pHabits">Sport</p>
          <button className="boutonHabits"><img className="iconeHabits" src="plus-solid.svg" alt="plus icon"/></button>
        </div>

      </article>

      <article className="thisWeek">
      <h2 className="titreBloc">Cette semaine</h2>

      <div className="barreTracker">
          <img className="iconeHabits" src="shoe-prints-solid.svg" alt="glass of water icon" />
          <p className="pHabits">Pas</p>
          <button className="boutonHabits"><img className="iconeHabits" src="plus-solid.svg" alt="plus icon"/></button>
        </div>

        <div className="barreTracker">
          <img className="iconeHabits" src="moon-solid.svg" alt="glass of water icon" />
          <p className="pHabits">Sommeil</p>
          <button className="boutonHabits"><img className="iconeHabits" src="plus-solid.svg" alt="plus icon"/></button>
        </div>
        
      </article>
      </section>
      </>
  );
};

export default HabitsTacker;