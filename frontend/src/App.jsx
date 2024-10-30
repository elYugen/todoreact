// On importe les dépendances nécessaires pour le projet
import { React } from 'react'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from './hook/useAuth';

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
import Agenda from './pages/Agenda';
import Bucketlist from './pages/Bucketlist';
import CreateHabit from "./pages/CreateHabit";

// On importe le style global qui sera appliqué à l'ensemble de l'application
import './assets/css/style.css'


function App() {

  return (
    <>
    <AuthProvider>
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
          <Route path="create/project" element={<CreateProject/>}/>
          <Route path="create/task" element={<CreateTask/>}/>
          <Route path="profile" element={<Profile/>}/>
          <Route path="details/project/:id" element={<DetailProjet/>} />
          <Route path="habitstracker" element={<HabitsTracker/>} />
          <Route path="agenda" element={<Agenda/>} />
          <Route path="bucketlist" element={<Bucketlist/>} />
          <Route path="login" element={<Login/>} />
          <Route path="register" element={<Register/>} />
          <Route path="create/habit" element={<CreateHabit/>} />


          {/* Le path * correspond à l'erreur 404, si une page est inexistante ou introuvable */}
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </AuthProvider>
    </>
  )
}

export default App
