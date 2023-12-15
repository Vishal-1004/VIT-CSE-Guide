import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import { userData } from "../../Services/Apis";

const Navbar = () => {
  const [data, setData] = useState({});
  const userToken = sessionStorage.getItem("userdbtoken");
  const isLoggedIn = sessionStorage.getItem("loggedIn");

  const handleLogoutClick = () => {
    sessionStorage.clear();
    window.location.reload();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getUserData = await userData({ token: userToken });
        if (getUserData.status === 200) {
          // Set the fetched user data to the component state
          setData(getUserData.data.data);
          console.log("User data is: ", data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    // Check if the user is logged in before making the API call
    if (isLoggedIn) {
      fetchData();
    }
  }, [isLoggedIn, userToken]);

  return (
    <div>
      <nav
        className="navbar navbar-expand-lg navbar-dark"
        style={{ backgroundColor: "#516BEB" }}
      >
        <div className="container">
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
                      <Link className="dropdown-item" to="/">
                        Basic Science & Maths
                      </Link>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/">
                        Engineering Chemistry
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/">
                        Calculus
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/">
                        Differential Equa. & Transforms
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/">
                        Complex Variables & Linear Alg.
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/">
                        Probability & Statistics
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/">
                        Engineering Physics
                      </a>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <Link className="dropdown-item" to="/">
                        Basic Engineering Sci.
                      </Link>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/">
                        Computer Programming: Python
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/">
                        Structured & Object-Oriented Programming
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/">
                        Computer Programming: Java
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/">
                        Basic Electronics
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/">
                        Basic Electrical Engineering
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
                      <Link className="dropdown-item" to="/">
                        Engineering Science
                      </Link>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/">
                        Digital Systems Design
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/">
                        Microprocessors and Microcontrollers
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/">
                        Discrete Mathematics and Graph Theory
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
                      <Link className="dropdown-item" to="/">
                        Discipline Elective
                      </Link>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/">
                        Machine Learning
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/">
                        Internet and Web Programming
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/">
                        Digital Image Processing
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
                      <Link className="dropdown-item" to="/">
                        Discipline Core
                      </Link>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/">
                        Data Structures and Algorithms
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/">
                        Design and Analysis of Algorithms
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/">
                        Computer Architecture and Organization
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/">
                        Software Engineering
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/">
                        Database Systems
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/">
                        Operating Systems
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/">
                        Theory of Computation
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/">
                        Embedded Systems
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/">
                        Artificial Intelligence
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/">
                        Compiler Design
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/">
                        Computer Networks
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/">
                        Cryptography and Network Security
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {isLoggedIn ? (
                data.isAdmin ? (
                  <li className="nav-item mx-5 dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="/"
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <CgProfile style={{ fontSize: "28px" }} />
                    </a>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown"
                    >
                      <ul>
                        <li className="exception">
                          <Link className="dropdown-item" to="/messages">
                            Messages
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="/users">
                            Users
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="/addsubject">
                            Add Subject
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="dropdown-item"
                            to="/addstudymaterial"
                          >
                            Add Study Material
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="dropdown-item logout-btn"
                            onClick={handleLogoutClick}
                          >
                            Logout
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                ) : (
                  <li className="nav-item mx-5 dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="/"
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <CgProfile style={{ fontSize: "28px" }} />
                    </a>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown"
                    >
                      <ul>
                        <li className="exception">
                          <Link className="dropdown-item" to="/contact">
                            Contact Us
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="dropdown-item logout-btn"
                            onClick={handleLogoutClick}
                          >
                            Logout
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                )
              ) : (
                <li>
                  <Link className="btn btn-outline-light" to="/login">
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
