import TopBar from "../components/TopBar/TopBar";
import Navbar from "../components/Navbar/Navbar";
import HabitsTrackers from "../components/HabitsTrackers/HabitsTrackers";
import { useAuth } from '../hook/useAuth';
import Loading from "../components/Loading/Loading";
import { useNavigate } from 'react-router-dom';

function HabitsTacker() {

  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
    // Pendant que les informations d'authentification chargent, affiche un message de chargement
    if (authLoading) return <Loading/>;
  
    // Vérifie que l’utilisateur est bien défini avant de rendre le composant `Bucketliste`
    if (!user) return <div>Utilisateur non authentifié.</div>;

  return (
      <>
      <TopBar pagename={"Tracker d'habitude"}/>
      <section className="containerGeneral">

      <article className="today">
        <h2 className="titreBloc">Habitudes du jour</h2>

      <HabitsTrackers userId={user._id} />

      </article>
      </section>
      <Navbar/>
      </>
  );
};

export default HabitsTacker;