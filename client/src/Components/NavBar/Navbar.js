import React, { useEffect, useState } from "react";
import { getAllSubject } from "../../Services/Apis";
import "./Navbar.css";
import { CgProfile } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import { userData } from "../../Services/Apis";

const Navbar = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({});
  const [dataFCBSAM, setDataFCBSAM] = useState([]);
  const [dataFCBES, setDataFCBES] = useState([]);
  const [dataDL, setDataDL] = useState([]);
  const [dataDC, setDataDC] = useState([]);
  const [dataDE, setDataDE] = useState([]);
  const userToken = sessionStorage.getItem("userdbtoken");
  const isLoggedIn = sessionStorage.getItem("loggedIn");

  const handleLinkClick = (record, domain) => {
    // You can pass the data as state using the 'state' property
    navigate("/studymaterial", { state: { courseData: record, domain } });
  };

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
          //console.log("User data is: ", data);
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

  useEffect(() => {
    const fetchData = async (domain) => {
      const response = await getAllSubject({ domain });
      if (response.status === 200) {
        if (domain === "FCBSAM") {
          setDataFCBSAM(response.data.content);
        } else if (domain === "FCBES") {
          setDataFCBES(response.data.content);
        } else if (domain === "DL") {
          setDataDL(response.data.content);
        } else if (domain === "DC") {
          setDataDC(response.data.content);
        } else {
          setDataDE(response.data.content);
        }
      } else {
        console.log(response.data);
      }
    };
    fetchData("FCBSAM");
    fetchData("FCBES");
    fetchData("DL");
    fetchData("DE");
    fetchData("DC");
  }, []);

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
                    {dataFCBSAM?.map((record, i) => (
                      <li key={i}>
                        <button
                          className="dropdown-item"
                          onClick={() => handleLinkClick(record, "FCBSAM")}
                        >
                          {record.courseTitle}
                        </button>
                      </li>
                    ))}
                  </ul>
                  <ul>
                    <li>
                      <Link className="dropdown-item" to="/">
                        Basic Engineering Sci.
                      </Link>
                    </li>
                    {dataFCBES?.map((record, i) => (
                      <li key={i}>
                        <button
                          className="dropdown-item"
                          onClick={() => handleLinkClick(record, "FCBES")}
                        >
                          {record.courseTitle}
                        </button>
                      </li>
                    ))}
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
                    {dataDL?.map((record, i) => (
                      <li key={i}>
                        <button
                          className="dropdown-item"
                          onClick={() => handleLinkClick(record, "DL")}
                        >
                          {record.courseTitle}
                        </button>
                      </li>
                    ))}
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
                    {dataDE?.map((record, i) => (
                      <li key={i}>
                        <button
                          className="dropdown-item"
                          onClick={() => handleLinkClick(record, "DE")}
                        >
                          {record.courseTitle}
                        </button>
                      </li>
                    ))}
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
                    {dataDC?.map((record, i) => (
                      <li key={i}>
                        <button
                          className="dropdown-item"
                          onClick={() => handleLinkClick(record, "DC")}
                        >
                          {record.courseTitle}
                        </button>
                      </li>
                    ))}
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
                          <Link className="dropdown-item" to="/addpaper">
                            Add Paper
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="/addrefvdo">
                            Add Ref Video
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
