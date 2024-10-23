function detailProjet() {
  return (

    <>
    <section className="containerGeneral">
    <h1 className="titrePage">Détails du projet</h1>
    <h2 className="titreBloc titreProjet">Voyage au Japon</h2>

    <article className="bordureBloc">
      <div className="divDescriptionProjet">
      <h2 className="titreBloc">Description</h2>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos reprehenderit necessitatibus est deleniti optio velit iusto magnam placeat doloribus distinctio non aspernatur odio provident soluta, sequi aliquid fugiat voluptatem unde.</p>
      </div>
    </article>

    <article className="bordureBloc2">
      <div className="divBlocListeTaches">
      <div className="titreBoutonTask">
      <h2 className="titreBloc">Liste des tâches</h2>
      <input className="addTask" type="button" value="Add Task"/>
      </div>

      <div className="ListTask">
      <ul className="UlListTask">

        <div className="radioBoutonLabel">
        <label htmlFor="tache1">Super tâche 1</label>
        <input type="radio" id="projet1" value="tache1"/>
        </div>

        <div className="radioBoutonLabel">
        <label htmlFor="tache1">Super tâche 1</label>
        <input type="radio" id="projet1" value="tache1"/>
        </div>
        
        <div className="radioBoutonLabel">
        <label htmlFor="tache1">Super tâche 1</label>
        <input type="radio" id="projet1" value="tache1"/>
        </div>
        
        <div className="radioBoutonLabel">
        <label htmlFor="tache1">Super tâche 1</label>
        <input type="radio" id="projet1" value="tache1"/>
        </div>
        
        <div className="radioBoutonLabel">
        <label htmlFor="tache1">Super tâche 1</label>
        <input type="radio" id="projet1" value="tache1"/>
        </div>
        
      </ul>
      </div>
      </div>
    </article>

    </section>
    </>

  );
};

export default detailProjet;