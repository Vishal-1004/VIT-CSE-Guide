import React, { useState,useEffect } from "react";

const Home = () => {
  const [activelink,setactivelink]=useState(0);
  const [data,setdata]=useState([]);
  const [loading,setloading]=useState(true);
  const handleclick=(index)=>{
    setactivelink(index);
  }

  const buttons = [
    "Displine Core",
    "Discipline Elective",
    "Discipline-Linked",
    "Foundation Core-Basic Sc. & Maths",
    "Foundation Core- Basic Engineering Sc",
  ];

  const fetchData = async (index) => {
    try {
      const response = await fetch(`http://localhost:3000/${buttons[index]}.json`);
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
  return(
  <div>
      <ul className="nav nav-pills justify-content-center">
        {buttons.map((button, index) => (
          <li key={index} className={`nav-item btn ${activelink === index ? 'active' : ''}`}>
            <a className={`nav-link ${activelink === index ? 'active' : ''}`} href="#" onClick={() => handleclick(index)}>
              {button}
            </a>
          </li>
        ))}
      </ul>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="table">
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
                  <td key={j}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
  </div>
  );
}

export default Home;
