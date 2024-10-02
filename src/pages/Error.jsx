import React from "react";
import { Link } from "react-router-dom";
import "../styles/error.css"
import errorImage from "../assets/404-bis.png";

function Error() {
  return (
    <div className="error-wrapper">
      <img src={errorImage} alt="404" className="error-image" />
      <p className="error-subtitle">
        Oups! La page que vous demandez n’existe pas.
      </p>
      <p className="changement-pages">
        <Link to="/">Retourner à la page d'accueil</Link>
      </p>
    </div>
  );
}

export default Error;
