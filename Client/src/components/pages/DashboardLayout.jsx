import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useOutlet } from "react-router-dom";
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

    return (

        <div className="dashboard-container">

            <div className={`dashboard-nav ${isMobile ? "mobile" : ""} ${opened ? "opened" : ""} `}>
                <DashboardNav />
            </div>

            <div className={`dashboard-page ${isMobile ? "mobile" : ""} ${opened ? "opened" : ""} `}>
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
