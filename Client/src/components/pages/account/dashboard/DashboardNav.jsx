import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";

const DashboardNav = ({ removeOpenedClass }) => {

    return (
        <Fragment>

            <div className="nav-page">

                <div className="nav-item">
                    <NavLink to="/dashboard/my-account" className="nav-link" onClick={removeOpenedClass}>
                        <img src="/images/dashboard/icons/account.svg" alt="My account" className="link-icon" width="30" />
                        <span className="link-text">Mon compte</span>
                    </NavLink>
                </div>

                <div className="nav-item">
                    <NavLink to="/dashboard/security" className="nav-link" onClick={removeOpenedClass}>
                        <img src="/images/dashboard/icons/security.svg" alt="Security" className="link-icon" width="30" />
                        <span className="link-text">Sécurité</span>
                    </NavLink>
                </div>

                <div className="nav-item">
                    <NavLink to="/dashboard/content" className="nav-link" onClick={removeOpenedClass}>
                        <img src="/images/dashboard/icons/content.svg" alt="Content" className="link-icon" width="30" />
                        <span className="link-text">Mes Contenus</span>
                    </NavLink>
                </div>

                {/* <div className="nav-item">
                    <NavLink to="/dashboard/content/action/" className="nav-link" onClick={removeOpenedClass}>
                        <img src="/images/dashboard/icons/notifications.svg" alt="Notifications" className="link-icon" width="30" />
                        <span className="link-text">Créer</span>
                    </NavLink>
                </div> */}

            </div>

            <div className="nav-delete">

                <div className="nav-item">
                    <NavLink to="/dashboard/delete-account" className="nav-link" onClick={() => { removeOpenedClass(); window.scrollTo(0, 0); }}>
                        <img src="/images/dashboard/icons/delete.svg" alt="Delete account" className="link-icon" />
                        <span className="link-text">Supprimer mon compte</span>
                    </NavLink>
                </div>

            </div>

        </Fragment >
    );
}

export default DashboardNav;