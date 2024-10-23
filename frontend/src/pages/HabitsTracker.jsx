function HabitsTacker() {
  return (
      <>
      <section className="containerGeneral">
      <h1 className="titrePage">Habits Trackers</h1>

      <article className="today">
        <h2 className="titreBloc">Aujourd'hui</h2>

        <div className="barreTracker">
          <img className="iconeHabits" src="public/glass-water-droplet-solid.svg" alt="glass of water icon" />
          <p className="pHabits">Eau</p>
          <button className="boutonHabits"><img className="iconeHabits" src="public/plus-solid.svg" alt="plus icon"/></button>
        </div>

        <div className="barreTracker">
          <img className="iconeHabits" src="public/dumbbell-solid.svg" alt="dumbbell icon" />
          <p className="pHabits">Sport</p>
          <button className="boutonHabits"><img className="iconeHabits" src="public/plus-solid.svg" alt="plus icon"/></button>
        </div>

      </article>

      <article className="thisWeek">
      <h2 className="titreBloc">Cette semaine</h2>

      <div className="barreTracker">
          <img className="iconeHabits" src="public/shoe-prints-solid.svg" alt="glass of water icon" />
          <p className="pHabits">Pas</p>
          <button className="boutonHabits"><img className="iconeHabits" src="public/plus-solid.svg" alt="plus icon"/></button>
        </div>

        <div className="barreTracker">
          <img className="iconeHabits" src="public/moon-solid.svg" alt="glass of water icon" />
          <p className="pHabits">Sommeil</p>
          <button className="boutonHabits"><img className="iconeHabits" src="public/plus-solid.svg" alt="plus icon"/></button>
        </div>
        
      </article>
      </section>
      </>
  );
};

export default HabitsTacker;