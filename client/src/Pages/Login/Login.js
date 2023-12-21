import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { sentOtpFunction } from "../../Services/Apis";
import Spinner from "react-bootstrap/Spinner";
import "../Register/Register.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [spiner, setSpiner] = useState(false);

  const navigate = useNavigate();

  //const navigate = useNavigate();

  const sendOtp = async (e) => {
    e.preventDefault();

    if (email === "") {
      toast.error("Enter Your College Email !");
    } else if (!email.includes("@")) {
      // for testing purpose we are keeping it as "@" but later it should be "@vitstudent.ac.in"
      toast.error("Enter Valid Email !");
    } else {
      setSpiner(true);
      const data = {
        email: email,
      };
      //console.log(data);
      const response = await sentOtpFunction(data);

      if (response.status === 200) {
        setSpiner(false);
        navigate("/user/otp", { state: email });
      } else {
        toast.error(response.response.data.error);
      }
    }
  };

  return (
    <>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Welcome Back, Log In</h1>
            <p style={{ textAlign: "center" }}>
              Unleash the potential of our site with a quick login. Stuck or
              confused? Don't hesitate to drop us a line at&nbsp;
              <strong>vitcseguide@gmail.com</strong>
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
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Your College Email Address"
              />
            </div>
            <button className="btn" onClick={sendOtp}>
              Login
              {spiner ? (
                <span>
                  <Spinner animation="border" />
                </span>
              ) : (
                ""
              )}
            </button>
            <p>
              Don't have an account? <NavLink to="/register">Sign up</NavLink>
            </p>
          </form>
        </div>
        <ToastContainer />
      </section>
    </>
  );
};

export default Login;
