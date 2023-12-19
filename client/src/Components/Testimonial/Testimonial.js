import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Spinner from "react-bootstrap/Spinner";
import { getTestimonials } from "../../Services/Apis";

const Testimonial = () => {
  const [spiner, setSpiner] = useState(false);
  const [testimonialData, setTestimonialData] = useState([]);

  /*const userToken = sessionStorage.getItem("userdbtoken");
  const isLoggedIn = sessionStorage.getItem("loggedIn");*/

  useEffect(() => {
    const fetchData = async () => {
      setSpiner(true);
      const alltestimonial = await getTestimonials({
        request: true,
      });
      if (alltestimonial.status === 200) {
        setSpiner(false);
        //console.log("All user Testimonials: ", alltestimonial.data.dataArray);
        setTestimonialData(alltestimonial.data.dataArray);
        //console.log("Testimonial is: ", alltestimonial);
      }
    };

    fetchData();
  }, []);

  return (
    <CarouselStyle className="px-3">
      <h1 className="text-center my-3" style={{ color: "white" }}>
        Testimonial
      </h1>
      {spiner ? (
        <div className="text-center my-5" style={{ color: "white" }}>
          Loading <Spinner animation="border" />
        </div>
      ) : (
        <div className="logos">
          <div className="logos-slide">
            {testimonialData?.map((message, index) => (
              <div
                class="custom-box"
                key={index}
                style={{ width: "18rem", height: "13rem" }}
              >
                <div class="card-body d-flex align-items-center justify-content-between flex-column">
                  <p class="card-text">{message.msg}</p>
                  <h6 class="card-subtitle mb-2 text-muted text-center">
                    - {message.fname}
                  </h6>
                </div>
              </div>
            ))}
          </div>
          <div className="logos-slide">
            {testimonialData?.map((message, index) => (
              <div
                class="custom-box"
                key={index}
                style={{ width: "18rem", height: "13rem" }}
              >
                <div class="card-body d-flex align-items-center justify-content-between flex-column">
                  <p class="card-text">{message.msg}</p>
                  <h6 class="card-subtitle mb-2 text-muted text-center">
                    - {message.fname}
                  </h6>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </CarouselStyle>
  );
};

const CarouselStyle = styled.section`
  min-height: 0;
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
    animation: 30s slide infinite linear;
  }
`;

export default Testimonial;
