import React, { useState } from "react";
import "./Register.css";
import { NavLink } from "react-router-dom";

const Register = () => {
  const [passhow, setPassShow] = useState(false);

  return (
    <>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Sign Up</h1>
            <p style={{ textAlign: "center" }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere
              qui odit molestiae ut a optio iure quia accusantium veritatis
              minima.
            </p>
          </div>
          <form>
            <div className="form_input">
              <label htmlFor="fname" className="label-style">
                Name
              </label>
              <input
                type="text"
                name="fname"
                id=""
                placeholder="Enter Your Name"
              />
            </div>
            <div className="form_input">
              <label htmlFor="email" className="label-style">
                Email
              </label>
              <input
                type="email"
                name="email"
                id=""
                placeholder="Enter Your Email Address"
              />
            </div>
            <div className="form_input">
              <label htmlFor="password" className="label-style">
                Password
              </label>
              <div className="two">
                <input
                  type={!passhow ? "password" : "text"}
                  name="password"
                  id=""
                  placeholder="Enter Your password"
                />
                <div
                  className="showpass label-style"
                  onClick={() => setPassShow(!passhow)}
                >
                  {!passhow ? "Show" : "Hide"}
                </div>
              </div>
            </div>
            <button className="btn">Sign Up</button>
            <p>
              Do you have an account? <NavLink to="/login">Login</NavLink>
            </p>
          </form>
        </div>
      </section>
    </>
  );
};

export default Register;
