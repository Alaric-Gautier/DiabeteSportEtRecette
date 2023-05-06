import React, { Fragment } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/pages/MainLayout";
import Home from "./components/pages/Home";

const App = () => {
    return (
        <BrowserRouter>

            <Fragment>

                <Routes>
                    <Route path="/" element={<MainLayout />}>
                        {/* Public routes */}
                        <Route path="/" element={<Home />} />
                    </Route>
                </Routes>

            </Fragment>

        </BrowserRouter>
    );
}

export default App;