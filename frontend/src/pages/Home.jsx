// J'importe les composants et style dont j'ai besoin pour ma page
import Navbar from "../components/Navbar/Navbar"
import HomeTopBar from "../components/HomeTopBar/HomeTopBar"
import SearchBar from "../components/SearchBar/SearchBar";
import CategoriesBox from "../components/CategoriesBox/CategoriesBox"
import MyTask from "../components/MyTask/MyTask"
import "../assets/css/home.css"
import Loading from "../components/Loading/Loading";

function Home() {

  // Titre de la page
  document.title = "ToDo CasseCouille - Accueil";

  return (
      <>
      {/* Je fais une instance de mon composant pour l'intégrer à ma page*/}
      <HomeTopBar/>
      <div className="container">
        <SearchBar/> 

        {/* Liste des catégories */}
        <div className="homeContainer">
          <div className="homeTop">
              <h3>Catégories</h3>
              <a href="#">Voir tout</a>
          </div>
          <CategoriesBox/>
        </div> 

        {/* Liste des tâches */}
        <div className="homeContainer">
          <div className="homeTop">
            <h3>Tâches du jour</h3>
            {/* <a href="#">Voir tout</a> */}
          </div>
          <div className="homeTaskStateList">
            <button class="homeTaskStateActive">À Faire</button>
            <button class="homeTaskState">Compléter</button>
            <button class="homeTaskState">Reviewing</button>
          </div>
          <MyTask/>
          <MyTask/>
          <MyTask/>
        </div>

      </div>
      
      <Navbar/>
      </>
  );
};

export default Home;