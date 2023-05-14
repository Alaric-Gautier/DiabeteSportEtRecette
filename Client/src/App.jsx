import React, { Fragment } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/pages/MainLayout";
import Home from "./components/pages/Home";
import DashboardLayout from "./components/pages/DashboardLayout";
import MyAccount from "./components/pages/account/dashboard/pages/MyAccount";
import MyRecipe from "./components/pages/account/dashboard/pages/Myrecipe";
import MySportExercise from "./components/pages/account/dashboard/pages/MySportExercise";

const App = () => {
    return (
        <BrowserRouter>

            <Fragment>

                <Routes>
                    <Route path="/" element={<MainLayout />}>
                        {/* Public routes */}
                        <Route path="/" element={<Home />} />

                        {/* Protected routes */}
                        {/* //TODO Add a protection and redirection */}
                        <Route path="dashboard/:page" element={<DashboardLayout />}>
                            <Route path="my-account" element={<MyAccount />} />
                            <Route path="my-recipes" element={<MyRecipe />} />
                            <Route path="my-sport-exercises" element={<MySportExercise />} />
                            <Route path="delete" element={<h1>Delete</h1>} />
                        </Route>

                    </Route>

                    {/* <Route path="/" element={<MainAdminLayout />}> */}
                    {/* Admin routes */}
                    {/* <Route path="admin/*" element={<Admin />} /> */}
                    {/* </Route> */}

                    {/* //TODO: Add 404 page in the main layout ? */}
                    <Route path="*" element={<h1>404</h1>} />
                </Routes>

            </Fragment>

        </BrowserRouter>
    );
}

export default App;