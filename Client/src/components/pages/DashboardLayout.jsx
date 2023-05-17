import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useOutlet, useParams } from "react-router-dom";
import DashboardNav from "./account/dashboard/DashboardNav";
import { useMediaQuery } from "react-responsive";

const DashboardLayout = () => {
    const outlet = useOutlet();
    const navigate = useNavigate();
    const isMobile = useMediaQuery({ query: "(max-width: 576px)" });
    const [opened, setOpened] = useState(false);

    useEffect(() => {
        if (outlet === null) {
            navigate("/dashboard/my-account");
        }
    }, [outlet]);

    const changeBackground = () => {
        const page = location.pathname.split("/")[2];
        switch (page) {
            case "my-account":
                return "url(../../../images/dashboard/backgrounds/myAccount.jpg)";
            case "my-recipes":
                return "url(../../../images/dashboard/backgrounds/myRecipes.jpg)";
            case "my-sport-exercises":
                return "url(../../../images/dashboard/backgrounds/mySportExercises.jpg)";
            default:
                return "url(../../../images/dashboard/backgrounds/myAccount.jpg)";
        }
    };

    const style = isMobile ? { background: "none" } : { background: changeBackground() };

    const removeOpenedClass = () => {
        if (opened) {
            setOpened(false);
        }
    };

    return (

        <div className="dashboard-container">

            <div className={`dashboard-nav ${isMobile ? "mobile" : ""} ${opened ? "opened" : ""} `}>
                <DashboardNav
                    removeOpenedClass={removeOpenedClass}
                />
            </div>

            <div className={`dashboard-page ${isMobile ? "mobile" : ""} ${opened ? "opened" : ""} `} style={style}>
                <Outlet />
            </div>

            {isMobile ? (
                <div className={`burger-menu ${opened ? "opened" : ""} `} onClick={() => setOpened(!opened)}>
                    <span className="line line-1" />
                    <span className="line line-2" />
                    <span className="line line-3" />
                </div>
            ) : null
            }

        </div>

    );
};

export default DashboardLayout;
