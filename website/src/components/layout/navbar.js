import React from 'react';
import { Link } from "gatsby"

const Navbar = ({ version }) => {
  return (
    <nav className="Navbar">
      <div className="Navbar__titleContainer">
        <h1 className="Navbar__title">
          <Link to="/">react-persian-date-picker</Link>
        </h1>
        <span className="Navbar__version">{version}</span>
      </div>
      <ul className="Navbar__list">
        <li className="Navbar__listItem">
          <Link to="/docs">Docs</Link>
        </li>
        <li className="Navbar__listItem">
          <Link to="/docs">Github</Link>
        </li>
      </ul>
    </nav>
  )
};

export { Navbar };
