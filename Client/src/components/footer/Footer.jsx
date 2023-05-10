import { NavLink } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="footer">

            <div className="footer-container">

                <div className="footer-logo">
                    <NavLink to="/" className="footer-logo" onClick={() => window.scrollTo(0, 0)}>
                        <img src="/images/logos/logo-horizontal-black.png" alt="logo-color" width="300" />
                    </NavLink>
                </div>

                {/* //TODO: Add link to linkedin and malt profiles */}

                <div className="social-container">

                    <div className="social-item">
                        <NavLink to="/" className="social-link">
                            <img src="/images/social-icons/linkedin.svg" alt="linkedin" width="30" />
                            <span>LinkedIn 1</span>
                        </NavLink>
                    </div>

                    <div className="social-item">
                        <NavLink to="/" className="social-link">
                            <img src="/images/social-icons/linkedin.svg" alt="linkedin" width="30" />
                            <span>LinkedIn 2</span>
                        </NavLink>
                    </div>

                    <div className="social-item">
                        <NavLink to="/" className="social-link">
                            <img src="/images/social-icons/linkedin.svg" alt="linkedin" width="30" />
                            <span>LinkedIn 3</span>
                        </NavLink>
                    </div>

                </div>

                <div className="professional-container">

                    <div className="professional-item">
                        <NavLink to="/" className="professional-link">
                            <img src="/images/professional-icons/malt.svg" alt="malt" width="30" />
                            <span>Profil Malt</span>
                        </NavLink>
                    </div>

                </div>

                <div className="legal-container">

                    <div className="legal-item">
                        <NavLink to="/legal" className="legal-link">
                            <span>Mentions légales</span>
                        </NavLink>
                    </div>

                    <div className="legal-item">
                        <NavLink to="/privacy" className="legal-link">
                            <span>Politique de confidentialité</span>
                        </NavLink>
                    </div>

                </div>

            </div>

        </footer>
    );
};

export default Footer;


