import React from 'react';
import { Link } from "react-router-dom";
import './Navbar.css';

function Navbar() {
  return (
    <>
    <nav className="navbar">
      <ul className="navbarItem">
        <li className="navbarLink navbarLinkActive"><a href="/"><i class="bi bi-house-door"></i></a></li>
        <li className="navbarLink"><a href="agenda"><i class="bi bi-calendar4"></i></a></li>
        <li className="navbarLink"><a href="create/task"><i class="bi bi-plus-circle"></i></a></li>
        <li className="navbarLink"><a href="habitstracker"><i class="bi bi-star-fill"></i></a></li>
        <li className="navbarLink"><a href="bucketlist"><i class="bi bi-bucket"></i></a></li>
        <li className="navbarLink"><a href="profile"><i class="bi bi-person"></i> </a></li>
      </ul>
    </nav>
    </>
  );
};

export default Navbar;