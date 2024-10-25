// J'importe les dépendances et style dont j'ai besoin pour ma page
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hook/useAuth';

import "../assets/css/style.css";
import "../assets/css/login.css";


function Login() {
  const { login, error } = useAuth();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password });
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
      <>
      <div className="loginContainer">
        <h1>ToDo CasseC</h1>
        <form className="loginContainerForm">
          <input type="email" placeholder="Adresse mail" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit" className="loginContainerFormButton">Connexion</button>
          <p>Tu n'as pas de compte ? <a href="register">Inscris toi</a></p>
        </form>
      </div>
      </>
  );
};

export default Login;