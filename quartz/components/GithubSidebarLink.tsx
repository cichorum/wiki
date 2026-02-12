import { QuartzComponentConstructor } from "./types"

export default (() => {
    function GithubSidebarLink() {
        return (
            <div className="github-sidebar-link">
                <a href="https://github.com/cichorum" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    <img src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/github.svg" alt="GitHub"/>
                </a>
            </div>
        );
    }

    GithubSidebarLink.css = `
        .github-sidebar-link {
            margin-top: auto;
            padding: 1rem 0;
            display: flex;
            justify-content: center;

            transition: opacity 0.3s ease, transform 0.2s ease;
            opacity: 0.5;
            transform: scale(1);
        }

        .github-sidebar-link:hover {
            opacity: 0.8;
            transform: scale(1.1);
        }

        .github-sidebar-link img {
            width: 40px;
            height: 40px;

            filter: invert(0.5) sepia(1) saturate(5) hue-rotate(175deg);
        }
    `;

    return GithubSidebarLink
}) satisfies QuartzComponentConstructor
