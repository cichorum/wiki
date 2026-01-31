import { QuartzComponentConstructor } from "./types"

export default (() => {
  function TeamMembersGrid() {
    return (
        <div>
            <h2 style="font-size: 1.4rem;">The Students</h2>
            <div class="team-grid">
                <div class="team-card">
                    <img class="profile" src="https://media.licdn.com/dms/image/v2/D4E03AQGOsMtezdkHQQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1728526922914?e=1771459200&v=beta&t=WZy0SEK__BV-tPGqH0UG2fJ0DMneZqu55HOcH2YFOM8" alt="Team Member"/>
                    <div class="team-info">
                        <h3>Oluwatumininu (Tumi) Oguntola</h3>
                        <p><strong>Role:</strong> Oracle of The Infinite (Technical Architect)</p>
                        <p><strong>Email:</strong> oguntola@unc.edu</p>
                        <div class="social-links">
                            <a href="https://www.linkedin.com/in/tumio/" target="_blank">
                                <img class="white-icon" src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/linkedin.svg" alt="LinkedIn"/>
                            </a>
                            <a href="https://github.com/PR0C355" target="_blank">
                                <img class="white-icon" src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/github.svg" alt="GitHub"/>
                            </a>
                        </div>
                    </div>
                </div>

                <div class="team-card">
                    <img class="profile" src="https://media.licdn.com/dms/image/v2/D4E03AQEcDF4dXMIIrg/profile-displayphoto-scale_400_400/B4EZk10eP9GcAg-/0/1757544573571?e=1771459200&v=beta&t=kvksqgxN2waA1PKd_7WAtrVWeQ8uWYdaVetoeZZE410" alt="Team Member"/>
                    <div class="team-info">
                        <h3>Chandon Jarrett</h3>
                        <p><strong>Role:</strong> Guardian of The Reserve (Lead Developer)</p>
                        <p><strong>Email:</strong> chandonj@unc.edu</p>
                        <div class="social-links">
                            <a href="https://www.linkedin.com/in/chandon-jarrett/" target="_blank">
                                <img class="white-icon"src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/linkedin.svg" alt="LinkedIn"/>
                            </a>
                            <a href="https://github.com/ChandonJarrett" target="_blank">
                                <img class="white-icon"src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/github.svg" alt="GitHub"/>
                            </a>
                        </div>
                    </div>
                </div>

                <div class="team-card">
                    <img class="profile" src="https://media.licdn.com/dms/image/v2/D4E03AQFnITZcinexyg/profile-displayphoto-scale_400_400/B4EZml5XzUKgAg-/0/1759424904896?e=1771459200&v=beta&t=mY28eSanRnqh2wIH1I9NDS9OcjO_Dc3Ea_Ify-pglFU" alt="Team Member"/>
                    <div class="team-info">
                        <h3>Sarah Threewits</h3>
                        <p><strong>Role:</strong> Maîtresse de la Machine (Project Manager)</p>
                        <p><strong>Email:</strong> s3wits@unc.edu</p>
                        <div class="social-links">
                            <a href="https://www.linkedin.com/in/sarah-threewits-a08840296/" target="_blank">
                                <img class="white-icon" src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/linkedin.svg" fill="white" alt="LinkedIn"/>
                            </a>
                            <a href="https://github.com/sarah3wits" target="_blank">
                                <img class="white-icon" src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/github.svg" alt="GitHub"/>
                            </a>
                        </div>
                    </div>
                </div>

                <div class="team-card">
                    <img class="profile" src="https://avatars.githubusercontent.com/u/144399345?v=4" alt="Team Member"/>
                    <div class="team-info">
                        <h3>Christopher Roberts</h3>
                        <p><strong>Role:</strong> Custodian of Innovation (Solutions Engineer)</p>
                        <p><strong>Email:</strong> csrob@unc.edu</p>
                        <div class="social-links">
                            <a href="https://github.com/tophersroberts" target="_blank">
                                <img class="white-icon" src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/github.svg" alt="GitHub"/>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
 
  TeamMembersGrid.css = `
    .team-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1.5rem;
        margin-top: 1.5rem;
    }

    .team-card {
        display: flex;
        gap: 1rem;
        align-items: flex-start;
        border: 1px solid #4b9cd3;
        border-radius: 25px;
        padding: 1.25rem;
        background-color: #202022;
    }

    .team-card img.profile {
        width: 96px;
        height: 96px;
        border-radius: 50%;
        object-fit: cover;
        flex-shrink: 0;
    }

    .team-info {
        flex: 1;
        min-width: 0;
    }

    .team-info h3 {
        margin: 0;
    }

    .team-info p {
        margin: 0.25rem 0;
    }

    .social-links {
        margin-top: 0.5rem;
        display: flex;
        gap: 0.5rem;
    }

    .social-links img {
        width: 35px;
        height: 35px;
    }

    .white-icon {
        filter: brightness(0) invert(1);    
    }
  `
 
  return TeamMembersGrid
}) satisfies QuartzComponentConstructor