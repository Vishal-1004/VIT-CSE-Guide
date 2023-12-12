import React from "react";
import { useEffect, useState } from "react";
import { FaArrowCircleUp } from "react-icons/fa";

function ScrollToTopBtn() {
  const [backToTop, setBackToTop] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setBackToTop(true);
      } else {
        setBackToTop(false);
      }
    });
  }, []);

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      {backToTop && (
        <button
          style={{
            position: "fixed",
            bottom: "50px",
            right: "20px",
            background: "transparent",
            border: "none",
            fontSize: "39px",
            color: "black",
          }}
          onClick={scrollUp}
        >
          <FaArrowCircleUp />
        </button>
      )}
    </div>
  );
}

export default ScrollToTopBtn;
