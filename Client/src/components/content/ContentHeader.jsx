import { NavLink, useParams } from "react-router-dom";

export default function ContentHeader() {
    const {type} = useParams();
    return(
        <div className="nav-item">
            <NavLink to={`/dashboard/content/${type}/create`} className="nav-link">
                <img src={`/images/dashboard/icons/verified.svg`} alt={`Create my ${type}`} className="link-icon" width="30" />
                <span className="link-text">Créer</span>
            </NavLink>

            <NavLink to={`/dashboard/content/${type}/published`} className="nav-link">
                <img src={`/images/dashboard/icons/verified.svg`} alt={`My published ${type}`} className="link-icon" width="30" />
                <span className="link-text">Publiées</span>
            </NavLink>

            <NavLink to={`/dashboard/content/${type}/waiting`} className="nav-link">
                <img src={`/images/dashboard/icons/unpublished.svg`} alt={`My waiting ${type}`} className="link-icon" width="30" />
                <span className="link-text">En attente de modération</span>
            </NavLink>
        </div>
    )
}