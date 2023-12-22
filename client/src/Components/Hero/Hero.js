import React from "react";
import { TypeAnimation } from "react-type-animation";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  const isLoggedIn = sessionStorage.getItem("loggedIn");

  const handleButtonClick = () => {
    // Navigate to "/login"
    navigate("/login");
  };

  return (
    <HeroStyle>
      <div className="container">
        <div className="row justify-content-md-center align-items-center">
          <div className="col col-lg-5 col-md-6 mx-3 my-2">
            <h1>One Stop Solution for</h1>
            <TypeAnimation
              sequence={[
                // Same substring at the start will only be typed once, initially
                "Study Materials",
                1000,
                "Question Papers",
                1000,
                "Reference Vidoes",
                1000,
              ]}
              speed={50}
              style={{ fontSize: "2em" }}
              repeat={Infinity}
              className="auto-type"
            />
            <br />
            {isLoggedIn ? (
              <h3 className="my-3">Simplifying VIT student learning</h3>
            ) : (
              <button
                className="btn btn-outline-success my-3"
                onClick={handleButtonClick}
              >
                Create Account
              </button>
            )}
          </div>
          <div className="col col-md-6 my-2">
            <img
              style={{ width: "500px" }}
              src="./assets/students.jpg"
              alt="Hero"
            />
          </div>
        </div>
      </div>
    </HeroStyle>
  );
};

const HeroStyle = styled.section`
  min-height: 0;
  .auto-type {
    color: #516beb !important;
  }

  @media (max-width: 768px) {
    img {
      width: 300px !important;
    }
  }
`;

export default Hero;
