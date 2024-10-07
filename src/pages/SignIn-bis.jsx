import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';  
import { login } from '../redux/action';  

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate(); 
  const dispatch = useDispatch();  

  // Vérifier si le token existe dans localStorage au montage du composant
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Si le token existe, restaurer l'utilisateur et rediriger vers /users
      dispatch(login(token)); // Supposons que l'action login peut se faire avec uniquement le token
      navigate('/users');
    }
  }, [dispatch, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/api/v1/user/login', {
        email,
        password,
      });

      // Récupérer le token et l'utilisateur depuis la réponse
      const { token, user } = response.data.body;

      // Stocker le token dans localStorage
      localStorage.setItem('token', token);

      // Stocker le token et l'utilisateur dans Redux
      dispatch(login(token, user));

      // Redirection vers la page des utilisateurs
      navigate('/users');
    } catch (error) {
      setError('Erreur de connexion. Veuillez vérifier vos informations.');
    }
  };

  return (
    <div>
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Se connecter</h1>
          <form onSubmit={handleSubmit}>
            {error && <p className="error-message">{error}</p>}
            <div className="input-wrapper">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Mot de passe</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="input-remember">
              <input
                type="checkbox"
                id="remember-me"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="remember-me">Se souvenir de moi</label>
            </div>
            <button type="submit" className="sign-in-button">Se connecter</button>
          </form>
        </section>
      </main>
    </div>
  );
}

export default SignIn;