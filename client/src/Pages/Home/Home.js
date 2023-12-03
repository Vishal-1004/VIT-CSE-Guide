import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [activelink, setactivelink] = useState(0);
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(true);
  const handleclick = (index) => {
    setactivelink(index);
  };

  const buttons = [
    "Foundation Core-Basic Sc. & Maths",
    "Foundation Core- Basic Engineering Sc",
    "Discipline-Linked",
    "Discipline Elective",
    "Discipline Core",
  ];

  const fetchData = async (index) => {
    try {
      const response = await fetch(
        `http://localhost:3000/Data/${buttons[index]}.json`
      );
      const jsonData = await response.json();
      setdata(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    fetchData(activelink);
  }, [activelink]);
  return (
    <div className="my-5">
      <div className="container">
        <h1 className="h1-style">Index</h1>
        <p className="p-style">
          Subjects within specific domains undergo changes on an annual basis.
          To enhance your navigation experience, we have provided an index that
          enables you to search for subjects easily. Additionally, we offer the
          syllabus for each subject for the academic year 2021, allowing you to
          view and compare it with your current syllabus.
        </p>
      </div>
      <ul className="nav nav-pills justify-content-center">
        {buttons.map((button, index) => (
          <li
            key={index}
            className={`nav-item btn ${activelink === index ? "active" : ""}`}
          >
            <Link
              className={`nav-link ${
                activelink === index ? "active btn-style" : ""
              }`}
              to="/"
              onClick={() => handleclick(index)}
            >
              {button}
            </Link>
          </li>
        ))}
      </ul>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="table my-3 table-style">
          <thead>
            <tr>
              {Object.keys(data[0] || {}).map((column, i) => (
                <th key={i}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((record, i) => (
              <tr key={i}>
                {Object.values(record).map((value, j) => (
                  <td key={j}>
                    {j === 3 ? (
                      <Link
                        to={value}
                        className="btn click-style py-1 px-2"
                        target="_blank"
                      >
                        Click
                      </Link>
                    ) : (
                      value
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Home;
