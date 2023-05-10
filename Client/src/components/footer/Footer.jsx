import { NavLink } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useSelector } from "react-redux";
import { toggleMenu } from "../../store/menu/menuToggle.slice";

const Footer = () => {
    const isMobile = useMediaQuery({ query: "(max-width: 576px)" });

    return (
        <footer className="footer">

            <div className={`footer-container ${isMobile ? "mobile" : ""} `}>

                <div className="footer-logo">
                    <NavLink to="/" className="footer-logo" onClick={() => window.scrollTo(0, 0)}>
                        <img src="/images/logos/logo-horizontal-black.png" alt="logo-color" width="300" />
                    </NavLink>
                </div>

                {/* //TODO: Add link to linkedin and malt profiles */}

                <div className="social-container">

                    <div className="social-item">
                        <a href="https://www.linkedin.com/in/alaric-gautier/" className="social-link">
                            <img src="/images/social-icons/linkedin.svg" alt="linkedin" width="30" />
                            <span>Alaric Gautier</span>
                        </a>
                    </div>

                    <div className="social-item">
                        <a href="/" className="social-link">
                            <img src="/images/social-icons/linkedin.svg" alt="linkedin" width="30" />
                            <span>Yannick Graffi</span>
                        </a>
                    </div>

                    <div className="social-item">
                        <a href="/" className="social-link">
                            <img src="/images/social-icons/linkedin.svg" alt="linkedin" width="30" />
                            <span>Jérémie Verbeke</span>
                        </a>
                    </div>

                </div>

                <div className="professional-container">

                    <div className="professional-item">
                        <a href="/" className="professional-link">
                            <img src="/images/professional-icons/malt.svg" alt="malt" width="30" />
                            <span>Jérémie Verbeke</span>
                        </a>
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


