import Navbar from "../components/Navbar/Navbar";
import Bucketliste from "../components/Bucketlist/Bucketlist"
import TopBar from "../components/TopBar/TopBar";
import { useAuth } from '../hook/useAuth';
import Loading from "../components/Loading/Loading";
import { useNavigate } from 'react-router-dom';

function Bucketlist() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
    // Pendant que les informations d'authentification chargent, affiche un message de chargement
    if (authLoading) return <Loading/>;
  
    // Vérifie que l’utilisateur est bien défini avant de rendre le composant `Bucketliste`
    if (!user) return <div>Utilisateur non authentifié.</div>;

  return (
    <>
    <TopBar pagename={"Ma Bucketlist"}/>
    <div className="container">
      <div className="bucketlistContainer">
        {/* Boîte pour ajouter un nouveau projet */}
        <div className="bucketlistBox" onClick={() => navigate('/create/project')}>
          <div className="bucketlistBoxContent">
            <div className="bucketlistIconBox" style={{ backgroundColor: "#faeeff"}}>
              <span>➕</span>
            </div>
            {/* <div className="bucketlistBoxTitle" style={{ backgroundColor: "#efefef"}}>
              <div className="bucketlistBoxTitleTitre">
                <p style={{ fontSize: "18px", marginTop: "20px"}}><b>Ajouter un projet</b></p>
              </div>
            </div> */}
          </div>
        </div>
        <Bucketliste userId={user._id} />
      </div>
      </div>
      <Navbar/>
    </>
  );
}

export default Bucketlist;
