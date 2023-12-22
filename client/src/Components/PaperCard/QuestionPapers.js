import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import { deletePaper, userData } from "../../Services/Apis";

const QuestionPapers = ({ questionPapers, domain, courseTitle }) => {
  const [data, setData] = useState({});
  const userToken = sessionStorage.getItem("userdbtoken");
  const isLoggedIn = sessionStorage.getItem("loggedIn");

  //checking if user is admin or not
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

  const handleDelete = async (domain, title, paperId) => {
    try {
      const response = await deletePaper({
        domain: domain,
        courseTitle: title,
        paperId: paperId,
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

  return (
    <>
      <ToastContainer />
      {questionPapers?.length <= 2 ? (
        <div className="d-flex justify-content-center">
          <div className="card" style={{ width: "25rem" }}>
            <h5 className="card-header">No Content To Display</h5>
            <div className="card-body">
              <h5 className="card-title">Can you help us ?</h5>
              <p className="card-text">
                Currently, there's no question paper here. <br />
                Interested in contributing? Contact us to share your resources!
              </p>
              <Link to="/contact" className="btn btn-outline-primary">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <CarouselStyle>
          <div className="logos">
            <div className="logos-slide">
              {questionPapers?.map((element, index) => (
                <div
                  class="custom-box"
                  key={index}
                  style={{
                    width: "18rem",
                    height: data.isAdmin ? "15rem" : "13rem",
                  }}
                >
                  <div class="card-body d-flex align-items-center justify-content-between flex-column">
                    <h2 class="card-text">
                      {element.examType}&nbsp;
                      {element.examTypeNo === 0
                        ? null
                        : `- ${element.examTypeNo}`}
                    </h2>
                    <div className="d-flex justify-content-between align-items-center">
                      <p>
                        <strong>Slot: &nbsp;</strong>
                      </p>
                      <p>{element.slot}</p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <p>
                        <strong>Year: &nbsp;</strong>
                      </p>
                      <p>{element.year}</p>
                    </div>
                    <button className="btn custome-btn-style btn-outline-primary">
                      <Link
                        className="cutome-link"
                        to={element.paperMaterialLink}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Click Here
                      </Link>
                    </button>
                    <button
                      className="btn custome-btn-style btn-outline-danger my-2"
                      style={{ display: data.isAdmin ? "" : "none" }}
                      onClick={() =>
                        handleDelete(domain, courseTitle, element._id)
                      }
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="logos-slide">
              {questionPapers?.map((element, index) => (
                <div
                  class="custom-box"
                  key={index}
                  style={{
                    width: "18rem",
                    height: data.isAdmin ? "15rem" : "13rem",
                  }}
                >
                  <div class="card-body d-flex align-items-center justify-content-between flex-column">
                    <h2 class="card-text">
                      {element.examType}&nbsp;
                      {element.examTypeNo === 0
                        ? null
                        : `- ${element.examTypeNo}`}
                    </h2>
                    <div className="d-flex justify-content-between align-items-center">
                      <p>
                        <strong>Slot: &nbsp;</strong>
                      </p>
                      <p>{element.slot}</p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <p>
                        <strong>Year: &nbsp;</strong>
                      </p>
                      <p>{element.year}</p>
                    </div>
                    <button className="btn custome-btn-style btn-outline-primary">
                      <a
                        className="cutome-link"
                        href={element.paperMaterialLink}
                      >
                        Click Here
                      </a>
                    </button>
                    <button
                      className="btn custome-btn-style btn-outline-danger my-2"
                      style={{ display: data.isAdmin ? "" : "none" }}
                      onClick={() =>
                        handleDelete(domain, courseTitle, element._id)
                      }
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CarouselStyle>
      )}
    </>
  );
};

const CarouselStyle = styled.section`
  min-height: 0;
  padding: 0 9%;

  .cutome-link {
    text-decoration: none;
  }

  .custome-btn-style:hover {
    .cutome-link {
      color: white !important;
    }
  }

  @keyframes slide {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-100%);
    }
  }

  .custom-box {
    width: 18rem;
    height: 13rem;
    border: 1px solid #000;
    margin: 0 20px; /* Adjusted margin */
    display: flex;
    flex-direction: column; /* Added flex-direction */
    justify-content: space-between; /* Added space-between */
    white-space: normal;
    background-color: white;
  }

  .logos {
    overflow: hidden;
    padding: 30px 0;
    background-color: inherit;
    white-space: nowrap;
  }

  .logos:hover .logos-slide {
    animation-play-state: paused;
  }

  .logos-slide {
    display: inline-flex; /* Updated display property */
    animation: 15s slide infinite linear;
  }
`;

export default QuestionPapers;
