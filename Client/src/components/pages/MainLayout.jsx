import React, { Fragment } from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
    return (
        <Fragment>
            <main className="main">

                <Header />

                <div className="container">
                    <Outlet />
                </div>

                <Footer />

            </main>

        </Fragment>
    );
}

export default MainLayout;