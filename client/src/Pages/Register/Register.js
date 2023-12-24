import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { registerfunction } from "../../Services/Apis";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import { NavLink } from "react-router-dom";

const Register = () => {
  const [passhow, setPassShow] = useState(false);

  const [inputdata, setInputdata] = useState({
    fname: "",
    email: "",
    password: "",
    isAdmin: false,
  });

  const navigate = useNavigate();

  // setinputvalue
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputdata({ ...inputdata, [name]: value });
  };

  // register data
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fname, email, password } = inputdata;

    if (fname === "") {
      toast.error("Enter Your Name");
    } else if (email === "") {
      toast.error("Enter Your Email");
    } else if (!email.includes("@vitstudent.ac.in") && !email.includes("@vit.ac.in") && !email.includes("@vitbhopal.ac.in") && !email.includes("@vitapstudent.ac.in")) {
      // for testing purpose we are keeping it as "@" but later it should be "@vitstudent.ac.in"
      toast.error("Enter Valid Email");
    } else if (password === "") {
      toast.error("Enter Your Password");
    } else if (password.length < 6) {
      toast.error("password length minimum 6 character");
    } else {
      const response = await registerfunction(inputdata);

      if (response.status === 200) {
        setInputdata({ ...inputdata, fname: "", email: "", password: "" });
        navigate("/login");
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
            <h1>Sign Up</h1>
            <p style={{ textAlign: "center" }}>
              Join our community by completing your registration. Dive into the
              website's offerings and, for any assistance during registration,
              reach out to us at <strong>vitcseguide@gmail.com</strong>
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
                onChange={handleChange}
                placeholder="Enter Your Full Name"
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
                onChange={handleChange}
                placeholder="Enter Your College Email Address"
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
                  onChange={handleChange}
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
            <button className="btn" onClick={handleSubmit}>
              Sign Up
            </button>
            <p>
              Do you have an account? <NavLink to="/login">Login</NavLink>
            </p>
          </form>
        </div>
        <ToastContainer />
      </section>
    </>
  );
};

export default Register;
