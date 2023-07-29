import React, { Fragment, useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./components/pages/public/Home";
import Health from "./components/pages/public/Health";
import About from "./components/pages/public/About";
import Recipe from "./components/pages/public/Recipe";
import Sport from "./components/pages/public/Sport";

import MainLayout from "./components/pages/MainLayout";
import AuthForm from "./components/forms/AuthForm";
import ConfirmUser from "./components/pages/login/ConfirmUser";
import ResetPassword from "./components/pages/login/ResetPassword";
import UserForm from "./components/forms/UserForm";
import Content from "./components/pages/account/dashboard/pages/Content";
import ContentType from "./components/content/ContentType";
import ContentStatus from "./components/content/ContentStatus";
import CheckAuthComponent from "./components/pages/CheckAuthComponent"


const App = () => {
    return (
        <BrowserRouter>

            <Fragment>

                <Routes>
                    <Route path="/" element={<MainLayout />}>
                        {/* Public routes */}
                        <Route path="/" element={<Home />} />
                        <Route path="recipe" element={<Recipe />} />
                        <Route path="sport-exercise" element={<Sport />} />
                        <Route path="health" element={<Health />} />
                        <Route path="about" element={<About />} />

                        {/* Auth Route */}
                        <Route path="/auth/:type/:resetCode?" element={<AuthForm />} />
                        <Route path="/confirmUser/:confirmationKey" element={<ConfirmUser />} />
                        <Route path="/reset-password/:resetCode" element={<ResetPassword />} />

                        {/* Protected routes */}
                        <Route path="dashboard/" element={<CheckAuthComponent/>}>
                            <Route path=":info" element={<UserForm />} />
                            <Route path="content" element={<Content />} >
                                <Route path=":type" element={<ContentType />} />
                                <Route path=":type/:status" element={<ContentStatus />} />
                            </Route>
                            {/* <Route path="my-recipes" element={<MyRecipe />} />
                            <Route path="my-sport-exercises" element={<MySportExercise />} /> */}
                        </Route>

                    <Route path="*" element={<img src="/images/other/404error.jpg" style={{width:"100%"}}/>} />
                    </Route>

                    {/* <Route path="/" element={<MainAdminLayout />}> */}
                    {/* Admin routes */}
                    {/* <Route path="admin/*" element={<Admin />} /> */}
                    {/* </Route> */}

                    {/* //TODO: Add 404 page in the main layout ? */}
                    
                </Routes>

            </Fragment>

        </BrowserRouter >
    );
}

export default App;