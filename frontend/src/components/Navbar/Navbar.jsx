import React, { useState } from 'react';
import { Link } from "react-router-dom";
import "./Navbar.css"

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="navbar">
      <ul className="navbarItem">
        <li className="navbarLink navbarLinkActive"><a href="/"><i className="bi bi-house-door"></i></a></li>
        <li className="navbarLink"><a href="agenda"><i className="bi bi-calendar4"></i></a></li>
        <li className="navbarLink deroulant" onMouseEnter={() => setIsDropdownOpen(true)} onMouseLeave={() => setIsDropdownOpen(false)}>
          <a href="#"><i className="bi bi-plus-circle"></i></a>
          <ul className={`sous ${isDropdownOpen ? 'visible' : ''}`}>
            <li><a href="create/task"><i className="bi bi-check2-square"></i>Tâche</a></li>
            <li><a href="create/project"><i className="bi bi-folder"></i>Projet</a></li>
            <li><a href="create/habit"><i className="bi bi-alarm"></i>Habitude</a></li>
          </ul>
        </li>
        <li className="navbarLink"><a href="bucketlist"><i className="bi bi-bucket"></i></a></li>
        <li className="navbarLink"><a href="profile"><i className="bi bi-person"></i></a></li>
      </ul>
    </nav>
  );
};

export default Navbar;