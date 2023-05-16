import React from "react";
import { useMediaQuery } from "react-responsive";

const MyAccount = () => {
    const isMobile = useMediaQuery({ query: "(max-width: 576px)" });

    console.log("MyAccount from MyAccount.jsx");

    return (
        <div className="page-item">
            <h1>Mon compte</h1>
        </div>
    );
}

export default MyAccount;