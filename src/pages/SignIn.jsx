import React, { useState, useEffect, useCallback } from 'react'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';  
import { login, getUser } from '../redux/action';  

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate(); 
  const dispatch = useDispatch();  


  const fetchUserData = useCallback(async (token) => {
    try {
      const response = await axios.post('http://localhost:3001/api/v1/user/profile', {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { firstName, lastName, userName } = response.data.body;

     
      dispatch(getUser(firstName, lastName, userName));
      navigate('/users');
      
    } catch (error) {
      setError('Erreur lors de la récupération des données utilisateur.');
      navigate('/signin'); 
    }
  }, [dispatch, navigate]);

  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(login(token));
      fetchUserData(token); 
    }
  }, [dispatch, fetchUserData]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/api/v1/user/login', {
        email,
        password,
      });

      
      const { token, user } = response.data.body;

   
      localStorage.setItem('token', token);

    
      dispatch(login(token, user));

      
      await fetchUserData(token);
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
