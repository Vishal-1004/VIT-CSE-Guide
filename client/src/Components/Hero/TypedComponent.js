import React, { useEffect } from "react";
import Typed from "typed.js";

const TypedComponent = () => {
  useEffect(() => {
    const options = {
      strings: ["Handwritten Notes", "Reference Videos", "Question Papers"],
      typeSpeed: 70,
      backSpeed: 50,
      backDelay: 2000,
      loop: true,
    };

    const typed = new Typed(".typed-text", options);

    return () => {
      typed.destroy();
    };
  }, []);
  return <span className="typed-text"></span>;
};

export default TypedComponent;
