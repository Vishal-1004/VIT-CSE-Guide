import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg navbar-dark"
        style={{ backgroundColor: "#516BEB" }}
      >
        <div className="container-fluid">
          <Link className="btn btn-outline-light logo" to="/">
            VIT-CSE-Guide
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item mx-2 dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="/"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Foundation Core
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <ul>
                    <li>
                      <a className="dropdown-item" href="/">
                        Basic Science & Maths
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/">
                        Mega Menu Link
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/">
                        Mega Menu Link
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/">
                        Mega Menu Link
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/">
                        Mega Menu Link
                      </a>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <a className="dropdown-item" href="/">
                        Basic Engineering Sci.
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/">
                        Mega Menu Link
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/">
                        Mega Menu Link
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/">
                        Mega Menu Link
                      </a>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <a className="dropdown-item" href="/">
                        HSM
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/">
                        Mega Menu Link
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/">
                        Mega Menu Link
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/">
                        Mega Menu Link
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/">
                        Mega Menu Link
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="nav-item mx-2 dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="/"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Discipline-Linked
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <ul>
                    <li>
                      <a className="dropdown-item" href="/">
                        Engineering Sci.
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/">
                        Mega Menu Link
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/">
                        Mega Menu Link
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/">
                        Mega Menu Link
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/">
                        Mega Menu Link
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="nav-item mx-2 dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="/"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Discipline Electives
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <ul>
                    <li>
                      <a className="dropdown-item" href="/">
                        Discipline Elective
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/">
                        Mega Menu Link
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/">
                        Mega Menu Link
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/">
                        Mega Menu Link
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/">
                        Mega Menu Link
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="nav-item mx-2 dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="/"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Discipline Core
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <ul>
                    <li>
                      <a className="dropdown-item" href="/">
                        Discipline Core
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/">
                        Mega Menu Link
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/">
                        Mega Menu Link
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/">
                        Mega Menu Link
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/">
                        Mega Menu Link
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li>
                <Link className="btn btn-light" to="/contact">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
