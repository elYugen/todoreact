import { useAuth } from '../hook/useAuth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from "../components/TopBar/TopBar";
import Loading from '../components/Loading/Loading';

function Profile() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async (e) => {
        e.preventDefault(); // Empêche le comportement par défaut du lien
        await logout(); // Appelle la fonction de déconnexion
        navigate('/'); // Redirige vers la page d'accueil
    };

     

        //utilise le hook d'auth pour accéder aux données utilisateur
        const { user, loading, error, fetchUserInfo } = useAuth();
    
        useEffect(() => {
            if(!user) {
                fetchUserInfo();
            }
        }, [fetchUserInfo]);

        // Si le chargement est en cours, retourner null (ou un composant de chargement)
  if (loading) {
    return <Loading/>;
  }

  // S'il y a une erreur, on l'affiche
  if (error) {
    return <div>Erreur: {error}</div>;
  }
        

    

    return(
        <>
        <TopBar/>
        <section className="containerGeneral generalProfil">
        <img className='profilePic' src={user.profilePicture} alt="ProfilPicture"/>
            <article className="topBox">
              <h3>Bonjour, {user.username}</h3>
                
                <div className="topBoxMini">
                <div className="countBox">
                    <img className="iconeBoxProfile" src="../../public/certificate-solid.svg" alt="" />
                    <p>Points</p>
                    <p>212</p>
                </div>
                <div className="countBox">
                <img className="iconeBoxProfile" src="../../public/crown-solid.svg" alt="" />
                <p>Niveaux</p>
                <p>{user.level }</p>
                </div>
                <div className="countBox2">
                <img className="iconeBoxProfile" src="../../public/shield-solid.svg" alt="" />
                <p>Badges</p>
                <p>3</p>
                </div>
                </div>
            </article>
            <article className="bottomBox">
                <div className="barreTracker barreProfil">
                <a href="#">Agenda</a>
                </div>

                <div className="barreTracker barreProfil">
                <a href="#">Projets</a>
                </div>

                <div className="barreTracker barreProfil">
                <a href="#">Habits Trackers</a>
                </div>
            </article>

            <a className="deco" href="/" onClick={handleLogout}>Se deconnecter</a>
            
        </section>
        </>
    )
}

export default Profile;