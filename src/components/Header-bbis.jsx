import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';  // Import de useNavigate pour la redirection
import { logout } from '../redux/action';  // Assurez-vous que ce chemin est correct
import '../styles/styles.css';
import logo from '../assets/logo-min.png';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();  // Initialisation de useNavigate pour la redirection
  const token = useSelector((state) => state.auth.token);

  const handleLogout = () => {
    dispatch(logout());  // Déconnexion via Redux
    localStorage.removeItem('token');  // Suppression du token de localStorage
    navigate('/signin');  // Redirection vers la page de connexion
  };

  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="Argent Bank Logo" className="logo-img" />
        <h1 className="header-title">Argent Bank - Home Page</h1>
      </div>
      <nav className="main-nav">
        <Link className="main-nav-logo" to="/">
          <img
            src={logo}
            alt="Argent Bank Logo"
            className="main-nav-logo-image"
          />
          <span className="sr-only">Argent Bank</span>
        </Link>
        {token ? (
          <Link onClick={handleLogout} className="main-nav-item" to="#">
            <i className="fa fa-user-circle"></i>
            Sign Out
          </Link>
        ) : (
          <Link className="main-nav-item" to="/signin">
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;