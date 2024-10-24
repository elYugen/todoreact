// On importe les dépendances nécessaires pour le projet
import { React } from 'react'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// On importe les pages que l'on veut ajouter à notre Router et donc à notre application
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import DetailProjet from "./pages/DetailProjet";
import HabitsTracker from "./pages/HabitsTracker";
import CreateProject from './pages/CreateProject';
import CreateTask from './pages/CreateTask';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';

// On importe le style global qui sera appliqué à l'ensemble de l'application
import './assets/css/style.css'


function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        {/* Layout va permettre le rendu de l'ensemble des pages */}
        <Route path="/" element={<Layout />}>

          {/* On définit quel page sera l'index de notre application */}
          <Route index element={<Home />} />

          {/* On définit l'ensemble des pages de notre projet,
              la propriété path correspond à la route attribué (localhost/maroute)
              la propriété element correspond à la page que l'on importe */}
          {/* <Route path="coucou" element={<Blogs />} /> */}
          <Route path="detailprojet" element={<DetailProjet/>}/>
          <Route path="habitstracker" element={<HabitsTracker/>}/>
          <Route path="createproject" element={<CreateProject/>}/>
          <Route path="createtask" element={<CreateTask/>}/>
          <Route path="profile" element={<Profile/>}/>
          <Route path="detailprojet" element={<DetailProjet/>} />
          <Route path="habitstracker" element={<HabitsTracker/>} />
          <Route path="login" element={<Login/>} />
          <Route path="register" element={<Register/>} />

          {/* Le path * correspond à l'erreur 404, si une page est inexistante ou introuvable */}
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
