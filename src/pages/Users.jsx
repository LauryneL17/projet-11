import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';  
import { getUser } from '../redux/action';  
import axios from 'axios'; 
import '../styles/styles.css';

function Users() {
  const [isEditing, setIsEditing] = useState(false);
  const [newNickname, setNewNickname] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();  
  const navigate = useNavigate();
  const token = useSelector(state => state.auth.token);
  const userData = useSelector(state => state.auth.user);  

  useEffect(() => {
    if (!userData) {
      setError("Aucune donnée utilisateur trouvée. Veuillez vous connecter.");
      navigate('/signin');
    }
  }, [navigate, userData]);

 
  const handleEditName = () => {
    setIsEditing(true);
    setNewNickname(userData?.userName || '');
  };

 
  const handleCancel = () => {
    setIsEditing(false);
    setNewNickname('');
  };

  
  const handleSave = async () => {
    if (!token) {
      setError("Token non trouvé, veuillez vous reconnecter.");
      return;
    }

    try {
      await axios.put('http://localhost:3001/api/v1/user/profile', {
        userName: newNickname,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });


      dispatch(getUser(userData.firstName, userData.lastName, newNickname));
      setIsEditing(false);
      setNewNickname('');
    } catch (error) {
      setError('Erreur lors de la mise à jour du pseudo.');
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!userData) {
    return <p>Chargement des données utilisateur...</p>;
  }

  return (
    <div>
      <main className="main bg-dark">
        <div className="header">
          <h1>Welcome back<br />{userData.firstName} {userData.lastName}!</h1>
          {isEditing ? (
            <div className="edit-name-form">
              <input
                type="text"
                value={newNickname}
                onChange={(e) => setNewNickname(e.target.value)}
                placeholder="Enter new nickname"
              />
              <button onClick={handleSave} className="edit-button">Save</button>
              <button onClick={handleCancel} className="edit-button">Cancel</button>
            </div>
          ) : (
            <button onClick={handleEditName} className="edit-button">Edit Name</button>
          )}
        </div>
        <h2 className="sr-only">Accounts</h2>

        
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Checking (x8349)</h3>
            <p className="account-amount">$2,082.79</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>

        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Savings (x6712)</h3>
            <p className="account-amount">$10,928.42</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>

        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
            <p className="account-amount">$184.30</p>
            <p className="account-amount-description">Current Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Users;
