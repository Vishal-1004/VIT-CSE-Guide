import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
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
        console.log("All user Testimonials: ", alltestimonial.data.dataArray);
        setTestimonialData(alltestimonial.data.dataArray);
      }
    };

    fetchData();
  }, []);

  return (
    <CarouselStyle className="container">
      <h1 className="text-center my-3" style={{ color: "white" }}>
        Testimonial
      </h1>
      {spiner ? (
        <div className="text-center my-5" style={{ color: "white" }}>
          Loading <Spinner animation="border" />
        </div>
      ) : (
        <Carousel
          additionalTransfrom={0}
          arrows={true}
          autoPlay={true}
          autoPlaySpeed={1000}
          centerMode={true}
          className=""
          containerClass="container-with-dots"
          dotListClass=""
          draggable
          focusOnSelect={false}
          infinite={false}
          itemClass=""
          keyBoardControl
          minimumTouchDrag={80}
          pauseOnHover
          renderArrowsWhenDisabled={true}
          renderButtonGroupOutside={false}
          renderDotsOutside={false}
          responsive={{
            desktop: {
              breakpoint: {
                max: 3000,
                min: 1024,
              },
              items: 3,
              partialVisibilityGutter: 40,
            },
            mobile: {
              breakpoint: {
                max: 464,
                min: 0,
              },
              items: 1,
              partialVisibilityGutter: 30,
            },
            tablet: {
              breakpoint: {
                max: 1024,
                min: 464,
              },
              items: 2,
              partialVisibilityGutter: 30,
            },
          }}
          rewind={true}
          rewindWithAnimation={false}
          rtl={false}
          shouldResetAutoplay={true}
          showDots={true}
          sliderClass=""
          slidesToSlide={1}
          swipeable={true}
        >
          {testimonialData?.map((message, index) => (
            <div
              class="card"
              key={index}
              style={{ width: "20rem", height: "13rem" }}
            >
              <div class="card-body">
                <p class="card-text">{message.msg}</p>
                <h6 class="card-subtitle mb-2 text-muted text-center">
                  - {message.fname}
                </h6>
              </div>
            </div>
          ))}
        </Carousel>
      )}
    </CarouselStyle>
  );
};

const CarouselStyle = styled.section`
  min-height: 0;
  h1 {
    font-size: 2.5rem !important;
    font-weight: 400 !important;
  }

  .react-multi-carousel-item {
    width: 350px !important;
  }

  .card-body {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
  }
`;

export default Testimonial;
