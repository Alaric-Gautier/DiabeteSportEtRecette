import React, { useEffect } from "react";
import { Outlet, useNavigate, useOutlet } from "react-router-dom";
import DashboardNav from "./account/dashboard/DashboardNav";

const DashboardLayout = () => {
    const outlet = useOutlet();
    const navigate = useNavigate();

    useEffect(() => {
        if (outlet === null) {
            navigate("/dashboard/my-account");
        }
    }, [outlet]);

    return (

        <div className="dashboard-container">

            <div className="dashboard-nav">
                <DashboardNav />
            </div>

            <div className="dashboard-page">
                <Outlet />
            </div>

        </div>

    );
};

export default DashboardLayout;
