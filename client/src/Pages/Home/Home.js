import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllSubject, userData, deleteSubject } from "../../Services/Apis";
import "./Home.css";
import Testimonial from "../../Components/Testimonial/Testimonial";
import Contactus from "../../Components/Contact/Contact";
import Hero from "../../Components/Hero/Hero";
import Spinner from "react-bootstrap/Spinner";
import { ToastContainer, toast } from "react-toastify";
//import Hero from "../../Components/Hero/Hero";

const Home = () => {
  const [spiner, setSpiner] = useState(false);
  const [activelink, setactivelink] = useState(0);
  const [activeDomain, setActiveDomain] = useState("FCBSAM");
  const [data, setData] = useState([]);

  const [admin, setAdmin] = useState(false);
  const userToken = sessionStorage.getItem("userdbtoken");
  const isLoggedIn = sessionStorage.getItem("loggedIn");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getUserData = await userData({ token: userToken });

        // Set the fetched user data to the component state
        if (getUserData.status === 200) {
          setAdmin(getUserData.data.data.isAdmin);
          //console.log("User is admin : ", admin);
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

  const buttons = {
    "Foundation Core-Basic Sc. & Maths": "FCBSAM",
    "Foundation Core- Basic Engineering Sc": "FCBES",
    "Discipline-Linked": "DL",
    "Discipline Elective": "DE",
    "Discipline Core": "DC",
  };

  const handleDeleteClick = async (index, activeDomain) => {
    try {
      const response = await deleteSubject({
        domain: activeDomain,
        courseId: index,
      });

      if (response.status === 200) {
        toast.success(response.data.message);
        window.location.reload();
      } else {
        toast.error(response.data.error);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleLinkClick = (index) => {
    setactivelink(index);
    //console.log(buttons[Object.keys(buttons)[index]]);
    setActiveDomain(buttons[Object.keys(buttons)[index]]);
  };

  useEffect(() => {
    const fetchData = async () => {
      setSpiner(true);
      const response = await getAllSubject({ domain: activeDomain });
      if (response.status === 200) {
        setSpiner(false);
        //console.log(response.data);
        setData(response.data.content);
        //console.log("Data is: ", data);
      } else {
        console.log(response.data);
      }
    };
    fetchData();
  }, [activeDomain]);

  const handleSyllabusClick = (link) => {
    window.open(link, "_blank");
  };

  return (
    <>
      <ToastContainer />
      <Hero />
      <div className="my-3">
        <div className="container">
          <h1 className="h1-style">Index</h1>
          <p className="p-style">
            Subjects within specific domains undergo changes on an annual basis.
            To enhance your navigation experience, we have provided an index
            that enables you to search for subjects easily. Additionally, we
            offer the syllabus for each subject for the academic year 2021,
            allowing you to view and compare it with your current syllabus.
          </p>
        </div>
        <ul className="nav nav-pills justify-content-center">
          {Object.keys(buttons).map((button, index) => (
            <li
              key={index}
              className={`nav-item ${activelink === index ? "active" : ""}`}
            >
              <Link
                className={`nav-link ${
                  activelink === index ? "active btn-style" : ""
                }`}
                to="/"
                onClick={() => handleLinkClick(index)}
              >
                {button}
              </Link>
            </li>
          ))}
        </ul>

        {spiner ? (
          <div className="text-center my-5" style={{ color: "black" }}>
            Loading <Spinner animation="border" />
          </div>
        ) : (
          <table className="table my-3 table-style container">
            <thead>
              <tr>
                <th>S no.</th>
                <th>Course Title</th>
                <th>Credits</th>
                {admin ? <th>Action</th> : null}
                <th>Syllabus</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((record, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{record.courseTitle}</td>
                  <td>{record.credits}</td>
                  {admin ? (
                    <td>
                      <button
                        className="btn btn-outline-danger py-1 px-2"
                        onClick={() =>
                          handleDeleteClick(record._id, activeDomain)
                        }
                      >
                        Delete
                      </button>
                    </td>
                  ) : null}
                  <td>
                    <button
                      onClick={() => handleSyllabusClick(record.syllabus)}
                      className="btn click-style py-1 px-2"
                    >
                      Click
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div className="my-3 py-3" style={{ backgroundColor: "#516beb" }}>
          <Testimonial />
        </div>

        <div className="py-3">
          <Contactus />
        </div>
      </div>
    </>
  );
};

export default Home;
