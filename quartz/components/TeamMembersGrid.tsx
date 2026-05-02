import { QuartzComponentConstructor } from "./types"

export default (() => {
  function TeamMembersGrid() {
    return (
        <div>
            <h2 style="font-size: 1.4rem;">The Students</h2>
            <div class="team-grid">
                <div class="team-card">
                    <img class="profile" src="/static/team-members/tumi-oguntola.jpg" alt="Oluwatumininu Oguntola"/>
                    <div class="team-info">
                        <h3>Oluwatumininu (Tumi) Oguntola</h3>
                        <p><strong>Role:</strong> Oracle of the Infinite (Technical Architect)</p>
                        <p><strong>Email:</strong> oguntola@unc.edu</p>
                        <div class="social-links">
                            <a href="https://www.linkedin.com/in/tumio/" target="_blank" rel="noopener noreferrer">
                                <img src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/linkedin.svg" alt="LinkedIn"/>
                            </a>
                            <a href="https://github.com/PR0C355" target="_blank" rel="noopener noreferrer">
                                <img src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/github.svg" alt="GitHub"/>
                            </a>
                        </div>
                    </div>
                </div>

                <div class="team-card">
                    <img class="profile" src="/static/team-members/chandon-jarrett.jpg" alt="Chandon Jarrett"/>
                    <div class="team-info">
                        <h3>Chandon Jarrett</h3>
                        <p><strong>Role:</strong> Guardian of The Reserve (Lead Developer)</p>
                        <p><strong>Email:</strong> chandonj@unc.edu</p>
                        <div class="social-links">
                            <a href="https://www.linkedin.com/in/chandon-jarrett/" target="_blank" rel="noopener noreferrer">
                                <img src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/linkedin.svg" alt="LinkedIn"/>
                            </a>
                            <a href="https://github.com/ChandonJarrett" target="_blank" rel="noopener noreferrer">
                                <img src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/github.svg" alt="GitHub"/>
                            </a>
                        </div>
                    </div>
                </div>

                <div class="team-card">
                    <img class="profile" src="/static/team-members/sarah-threewits.jpg" alt="Sarah Threewits"/>
                    <div class="team-info">
                        <h3>Sarah Threewits</h3>
                        <p><strong>Role:</strong> Maîtresse de la Machine (Project Manager)</p>
                        <p><strong>Email:</strong> s3wits@unc.edu</p>
                        <div class="social-links">
                            <a href="https://www.linkedin.com/in/sarah-threewits-a08840296/" target="_blank" rel="noopener noreferrer">
                                <img src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/linkedin.svg" alt="LinkedIn"/>
                            </a>
                            <a href="https://github.com/sarah3wits" target="_blank" rel="noopener noreferrer">
                                <img src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/github.svg" alt="GitHub"/>
                            </a>
                        </div>
                    </div>
                </div>

                <div class="team-card">
                    <img class="profile" src="/static/team-members/topher-roberts.jpg" alt="Christopher Roberts"/>
                    <div class="team-info">
                        <h3>Christopher Roberts</h3>
                        <p><strong>Role:</strong> Agent of Innovation (Solutions Engineer)</p>
                        <p><strong>Email:</strong> csrob@unc.edu</p>
                        <div class="social-links">
                            <a href="https://github.com/tophersroberts" target="_blank" rel="noopener noreferrer">
                                <img src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/github.svg" alt="GitHub"/>
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
        padding: 1.25rem;
        align-items: flex-start;

        border: 1px solid var(--gray);
        border-radius: 25px;

        background-color: var(--light);
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

        filter: invert(0.5) sepia(1) saturate(5) hue-rotate(175deg);

        transition: opacity 0.3s ease, transform 0.2s ease;
        opacity: 0.7;
        transform: scale(1);
    }
        
    .social-links img:hover {
        opacity: 1;
        transform: scale(1.1);
    }
  `;
 
  return TeamMembersGrid
}) satisfies QuartzComponentConstructor
