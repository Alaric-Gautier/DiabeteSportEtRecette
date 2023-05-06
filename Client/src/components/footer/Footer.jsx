import { NavLink } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-logo">
                    <NavLink to="/" className="footer-logo" onClick={() => window.scrollTo(0, 0)}>
                        <img src="/images/logos/logo-horizontal-black.png" alt="logo-color" width="300" />
                    </NavLink>
                </div>
                <div className="footer-content">
                    <p className="footer-content-text">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.
                    </p>
                    <div className="footer-content-social">
                        <section className="section">
                            <h3 className="section-title">Social</h3>
                            <ul className="section-list">
                                <li className="list-item">
                                    <NavLink to="/" className="item-link">
                                        <img src="/images/icons/linkedin.svg" alt="linkedin" width="30" />
                                        <span className="link-text">LinkedIn 1</span>
                                    </NavLink>
                                </li>
                                <li className="list-item">
                                    <NavLink to="/" className="item-link">
                                        <img src="/images/icons/linkedin.svg" alt="linkedin" width="30" />
                                        <span className="link-text">LinkedIn 2</span>
                                    </NavLink>
                                </li>
                                <li className="list-item">
                                    <NavLink to="/" className="item-link">
                                        <img src="/images/icons/github.svg" alt="github" width="30" />
                                        <span className="link-text">GitHub 1</span>
                                    </NavLink>
                                </li>
                                <li className="list-item">
                                    <NavLink to="/" className="item-link">
                                        <img src="/images/icons/github.svg" alt="github" width="30" />
                                        <span className="link-text">GitHub 2</span>
                                    </NavLink>
                                </li>
                                <li className="list-item">
                                    <NavLink to="/" className="item-link">
                                        <img src="/images/icons/malt.svg" alt="malt" width="30" />
                                        <span className="link-text">Malt 1</span>
                                    </NavLink>
                                </li>
                            </ul>
                        </section>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;


