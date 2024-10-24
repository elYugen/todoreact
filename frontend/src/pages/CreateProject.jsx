import TopBar from "../components/TopBar/TopBar";

function CreateProject() {

    return(
        <>
        <section className="containerGeneral generalProjet">
        <TopBar pagename={"Créer un nouveau projet"}/>

        <div className="creerProjet">
        <label>
        Nom du projet : <input className="inputNomProjet" name="inputNomProjet"/>
        </label>

        <label>
        Description du projet : <input className="inputDescriptionProjet" name="inputDescriptionProjet"/>
        </label>

        <input className="addTask" type="button" value="Créer un projet"/>
        </div>
        </section>
        </>
    )
}

export default CreateProject;