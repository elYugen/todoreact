import TopBar from "../components/TopBar/TopBar";

function CreateTask() {

    return(
        <>
         <section className="containerGeneral generalTask">
        <TopBar pagename={"Créer une nouvelle tâche"}/>

        <div className="creerTask">
        <label className="labelTask">
        Nom de la tâche : <input className="inputNomTask" name="inputNomTask"/>
        </label>

        <label className="labelTask">
        Catégorie : <br></br>
        <div>
        <input className="addTask buttonTask" type="button" value="Agenda"/>
        <input className="addTask buttonTask" type="button" value="Projet"/>
        </div>
        </label>

        <label className="optionTask" for="selectProjet">Selectionnez un projet</label>
        <select name="selectProjet" id="selectProjet">
            <option value="projet 1">Projet 1</option>
            <option value="projet 2">Projet 2</option>
            <option value="projet 3">Projet 3</option>
            <option value="projet 4">Projet 4</option>
        </select>

        <label className="labelTask">
        Date : <input type="Date" className="inputCategorie" name="inputCategorie"/>
        </label>

        <label className="labelTask">
        Description : <input className="inputDescriptionTask" name="inputDescriptionTask"/>
        </label>

        <input className="addTask" type="button" value="Créer une tâche"/>
        </div>
        </section>
        </>
    )
}

export default CreateTask;