import React from "react";
import { NavLink } from "react-router-dom";
import "../Register/Register.css";

const Login = () => {
  return (
    <>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Welcome Back, Log In</h1>
            <p style={{ textAlign: "center" }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
              illum veniam tempora eaque nulla accusantium, similique est
              deleniti voluptatibus placeat.
            </p>
          </div>
          <form>
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
            <button className="btn">Login</button>
            <p>
              Don't have an account? <NavLink to="/register">Sign up</NavLink>
            </p>
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;
