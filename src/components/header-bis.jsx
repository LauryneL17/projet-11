import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../redux/action';  
import '../styles/styles.css';
import logo from '../assets/logo-min.png';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();  // Initialisation de useNavigate => redirection
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user); 

  const handleLogout = () => {
    dispatch(logout());  
    localStorage.removeItem('token');  
    navigate('/signin');  
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
        <Link className="main-nav-item" to="/users">
              <i className="fa fa-user-circle"></i>
              {user ? user.userName : ''} {/* Assuming user.userName exists */}
            </Link>
        {token ? (
          <>
            <span className="main-nav-item">
              <i className="fa fa-user-circle"></i>
              {user ? `${user.firstName} ${user.lastName}` : 'User'}
            </span>
            <Link onClick={handleLogout} className="main-nav-item" to="#">
              <i className="fa fa-user-circle"></i>
              Sign Out
            </Link>
          </>
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
