import React from 'react';
import { Link } from "react-router-dom";
import './Navbar.css';

function Navbar() {
  return (
    <>
    <nav className="navbar">
      <ul className="navbarItem">
        <li className="navbarLink navbarLinkActive"><a href="/"><i class="bi bi-house-door"></i>_</a></li>
        <li className="navbarLink"><a href="#"><i class="bi bi-calendar4"></i></a></li>
        <li className="navbarLink"><a href="detailprojet"><i class="bi bi-plus-circle"></i></a></li>
        <li className="navbarLink"><a href="habitstracker"><i class="bi bi-star"></i></a></li>
        <li className="navbarLink"><a href="login"><i class="bi bi-person"></i></a></li>
      </ul>
    </nav>
    </>
  );
};

export default Navbar;