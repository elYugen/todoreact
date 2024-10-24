import TopBar from "../components/TopBar/TopBar";

function Profile() {

    return(
        <>
        <TopBar pagename={"Mon profil"}/>
        <section className="containerGeneral">
            <article className="topBox">
                <img className="profilePic" src="../../public/1201275-200.png" alt="annoying Guy profile pic"/>
                <p>Annoying Guy</p>
                
                <div className="topBoxMini">
                <div>
                    <img className="iconeBoxProfile" src="../../public/certificate-solid.svg" alt="" />
                    <p>Points</p>
                </div>
                <div>
                <img className="iconeBoxProfile" src="../../public/crown-solid.svg" alt="" />
                <p>Niveaux</p>
                </div>
                <div>
                <img className="iconeBoxProfile" src="../../public/shield-solid.svg" alt="" />
                <p>Badges</p>
                </div>
                </div>

            </article>
            
        </section>
        </>
    )
}

export default Profile;