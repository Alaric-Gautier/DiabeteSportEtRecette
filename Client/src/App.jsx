import React, { Fragment, useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/pages/MainLayout";
import Home from "./components/pages/Home";
import Recipe from "./components/pages/Recipe";
import DashboardLayout from "./components/pages/DashboardLayout";
import MyRecipe from "./components/pages/account/dashboard/pages/Myrecipe";
import MySportExercise from "./components/pages/account/dashboard/pages/MySportExercise";
import AuthForm from "./components/forms/AuthForm";
import ConfirmUser from "./components/pages/login/ConfirmUser";
import { AuthContext } from "./utils/context";
import ResetPassword from "./components/pages/login/ResetPassword";
import UserForm from "./components/forms/UserForm";

const App = () => {
    const { isAuth } = useContext(AuthContext);

    return (
        <BrowserRouter>

            <Fragment>

                <Routes>
                    <Route path="/" element={<MainLayout />}>
                        {/* Public routes */}
                        <Route path="/" element={<Home />} />
                        <Route path="recipe" element={<Recipe />} />

                        {/* Auth Route */}
                        <Route path="/auth/:type" element={<AuthForm />} />
                        <Route path="/confirmUser/:confirmationKey" element={<ConfirmUser />} />
                        <Route path="/reset-password/:resetCode" element={<ResetPassword />} />

                        {/* Protected routes */}
                        {/* //TODO Add a protection and redirection */}
                        {/* <Route path="dashboard/" element={isAuth ? <DashboardLayout /> : <Navigate to="/auth/login" />}> */}
                        <Route path="dashboard/" element={<DashboardLayout />}>
                            <Route path=":info" element={<UserForm />} />
                            <Route path="my-recipes" element={<MyRecipe />} />
                            <Route path="my-sport-exercises" element={<MySportExercise />} />
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