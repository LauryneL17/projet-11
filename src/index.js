// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';  // Assurez-vous que ce chemin est correct
import Error404 from "./pages/Error";
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import Users from './pages/Users';
import Header from './components/Header';
import Footer from './components/Footer';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>  {/* Assurez-vous que le store est passé ici */}
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/users" element={<Users />} />
          <Route path="/404" element={<Error404/>} />
          <Route path="*" element={<Error404 />} />
        </Routes>
        <Footer />
      </Router>
    </Provider>
  </React.StrictMode>
);
