import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { userVerify } from "../../Services/Apis";

const Otp = () => {
  const [otp, setOtp] = useState("");

  const location = useLocation();

  const navigate = useNavigate();

  const LoginUser = async (e) => {
    e.preventDefault();

    if (otp === "") {
      toast.error("Enter Your Otp");
    } else if (!/[^a-zA-Z]/.test(otp)) {
      toast.error("Enter Valid Otp");
    } else if (otp.length < 6) {
      toast.error("Otp Length minimum 6 digit");
    } else {
      const data = {
        otp,
        email: location.state,
      };

      const response = await userVerify(data);
      if (response.status === 200) {
        localStorage.setItem("userdbtoken", response.data.userToken);
        localStorage.setItem("loggedIn", true);
        toast.success(response.data.message);
        setTimeout(() => {
          navigate("/");
        }, 5000);
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
            <h1>Please Enter Your OTP Here</h1>
            <p style={{ textAlign: "center" }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
              illum veniam tempora eaque nulla accusantium, similique est
              deleniti voluptatibus placeat.
            </p>
          </div>
          <form>
            <div className="form_input">
              <label htmlFor="otp" className="label-style">
                OTP
              </label>
              <input
                type="text"
                name="otp"
                id=""
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter Your OTP"
              />
            </div>
            <button className="btn" onClick={LoginUser}>
              Submit
            </button>
          </form>
        </div>
        <ToastContainer />
      </section>
    </>
  );
};

export default Otp;
