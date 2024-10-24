// J'importe les dépendances et style dont j'ai besoin pour ma page
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import "../assets/css/style.css";
import "../assets/css/login.css";

function Register() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [created, setCreated] = useState(false)
  const navigate = useNavigate();

  const handleSaveNewUser = () => {
    const data = {
      username, email, password 
    }
    setCreated(true)
    axios.post('http://localhost:8080/users', data)
    .then(() => {
      navigate('/')
    })
    .catch((error) => {
      console.log(error);  
    })
  }

  return (
      <>
      <div className="loginContainer">
        <h1>ToDo CasseC</h1>
        <div className="loginContainerForm">
          <input type="text" placeholder="Nom d'utilisateur" value={username} onChange={(e) => setUsername(e.target.value)} />
          <input type="email" placeholder="Adresse mail" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button onClick={handleSaveNewUser} className="loginContainerFormButton">Créer un compte</button>
          <p>Tu as déjà un compte ? <a href="login">Connecte toi</a></p>
        </div>
      </div>
      </>
  );
};

export default Register;