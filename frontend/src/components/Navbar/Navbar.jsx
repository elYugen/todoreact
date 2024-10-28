import React from 'react';
import { Link } from "react-router-dom";
import './Navbar.css';

function Navbar() {
  return (
    <>
    <nav className="navbar">
      <ul className="navbarItem">
        <li className="navbarLink navbarLinkActive"><a href="/"><i className="bi bi-house-door"></i></a></li>
        <li className="navbarLink"><a href="agenda"><i className="bi bi-calendar4"></i></a></li>
        <li className="navbarLink"><a href="create/task"><i className="bi bi-plus-circle"></i></a></li>
        <li className="navbarLink"><a href="habitstracker"><i className="bi bi-star-fill"></i></a></li>
        <li className="navbarLink"><a href="bucketlist"><i className="bi bi-bucket"></i></a></li>
        <li className="navbarLink"><a href="profile"><i className="bi bi-person"></i> </a></li>
      </ul>
    </nav>
    </>
  );
};

export default Navbar;