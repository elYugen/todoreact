import { useAuth } from '../hook/useAuth';
import { useNavigate } from 'react-router-dom';
import TopBar from "../components/TopBar/TopBar";

function Profile() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async (e) => {
        e.preventDefault(); // Empêche le comportement par défaut du lien
        await logout(); // Appelle la fonction de déconnexion
        navigate('/'); // Redirige vers la page d'accueil
    };

    return(
        <>
        <TopBar/>
        <section className="containerGeneral generalProfil">
        <img className="profilePic" src="../../public/1201275-200.png" alt="annoying Guy profile pic"/>
            <article className="topBox">
                <p>Annoying Guy</p>
                
                <div className="topBoxMini">
                <div className="countBox">
                    <img className="iconeBoxProfile" src="../../public/certificate-solid.svg" alt="" />
                    <p>Points</p>
                    <p>212</p>
                </div>
                <div className="countBox">
                <img className="iconeBoxProfile" src="../../public/crown-solid.svg" alt="" />
                <p>Niveaux</p>
                <p>5</p>
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