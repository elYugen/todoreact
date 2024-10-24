// J'importe les dépendances et style dont j'ai besoin pour ma page
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import "../assets/css/style.css";
import "../assets/css/login.css";

function Login() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [created, setCreated] = useState(false)
  const navigate = useNavigate();

  return (
      <>
      <div className="loginContainer">
        <h1>ToDo CasseC</h1>
        <div className="loginContainerForm">
          <input type="email" placeholder="Adresse mail" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button onClick="{handleSaveNewUser}" className="loginContainerFormButton">Connexion</button>
          <p> <p>Tu n'as pas de compte ? <a href="register">Inscris toi</a></p></p>
        </div>
      </div>
      </>
  );
};

export default Login;