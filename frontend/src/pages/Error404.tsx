import React from "react";
import logo from "../assets/images/404.jpg";
import "../App.css"
import "../style/error404.css"

const Error404: React.FC = () => {
    return (
        <>
            <p className="error-404-text">Roses are red. Violets are blue.</p>
            <p className="error-404-text">Error 404 just landed for you!</p>
            <img src={logo} alt="404" className="error-404-image"/>
        </>
    );
}

export default Error404;
