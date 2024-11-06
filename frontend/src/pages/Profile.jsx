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
        if (!user) {
            fetchUserInfo();
        }
    }, [fetchUserInfo]);

    // Si le chargement est en cours, retourner null (ou un composant de chargement)
    if (loading) {
        return <Loading />;
    }

    // S'il y a une erreur, on l'affiche
    if (error) {
        return <div>Erreur: {error}</div>;
    }

    const goToHabits = async (e) => { // fonction fléché qui permet de rediriger vers habitstracker
        navigate('/habitstracker');   // en cliquant sur le bouton Tracker D'habitude
    }

    const goToAgenda = async (e) => { // fonction fléché qui permet de rediriger vers l'agenda
        navigate('/agenda');          // en cliquant sur le bouton agenda
    }

    const goToBucketlist = async (e) => { // fonction fléché qui permet de rediriger vers la bucketlist
        navigate('/bucketlist');          // en cliquant sur le bouton bucketlist
    }


    return (
        <>
            <TopBar />
            <section className="containerGeneral generalProfil">
                <img className='profilePic' src={user.profilePicture} alt="ProfilPicture" />
                <article className="topBox">
                    <p>{user.username}</p>

                    <div className="topBoxMini">
                        <div className="countBox">
                            <img className="iconeBoxProfile" src="../../public/certificate-solid.svg" alt="" />
                            <p>Expérience</p>
                            <p>{user.xp}</p>
                        </div>
                        <div className="countBox">
                            <img className="iconeBoxProfile" src="../../public/crown-solid.svg" alt="" />
                            <p>Niveaux</p>
                            <p>{user.level}</p>
                        </div>
                        <div className="countBox2">
                            <img className="iconeBoxProfile" src="../../public/shield-solid.svg" alt="" />
                            <p>Badges</p>
                            <img src={user.badge} alt="Badge" className="profileBadge" />
                        </div>
                    </div>
                </article>
                <article className="bottomBox">
                    <div className="barreProfil" onClick={goToAgenda}>
                        <div className="profileLink">
                            <i className="bi bi-calendar"></i>
                            <a href="#">Agenda</a>                            
                        </div>

                        <i className="bi bi-chevron-right"></i>
                    </div>

                    <div className="barreProfil" onClick={goToBucketlist}>
                        <div className="profileLink">
                        <i className="bi bi-bucket"></i>
                        <a href="#">Bucketlist</a>
                        </div>
                        <i className="bi bi-chevron-right"></i>
                    </div>

                    <div className="barreProfil" onClick={goToHabits}>
                        <div className="profileLink">
                        <i className="bi bi-person-walking"></i>
                        <a href="#">Habits Trackers</a>
                        </div>

                        <i className="bi bi-chevron-right"></i>
                    </div>

                    <div className="barreProfil">
                        <div className="profileLink">
                        <i className="bi bi-box-arrow-right"></i>
                        <a className="deco" href="/" onClick={handleLogout}>Se deconnecter</a>
                        </div>

                        <i className="bi bi-chevron-right"></i>
                    </div>
                </article>
            </section>
        </>
    )
}

export default Profile;