import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { userData, userVerify } from "../../Services/Apis";
import { useDispatch } from "react-redux";
import { loginUser } from "../../Store/Slices/userSlice";
import Spinner from "react-bootstrap/Spinner";

const Otp = () => {
  const [spiner, setSpiner] = useState(false);
  const [otp, setOtp] = useState("");

  const location = useLocation();

  const Dispatch = useDispatch();

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
      setSpiner(true);
      const data = {
        otp,
        email: location.state,
      };

      const response = await userVerify(data);
      if (response.status === 200) {
        setSpiner(false);
        sessionStorage.setItem("userdbtoken", response.data.userToken);
        sessionStorage.setItem("loggedIn", true);

        const getUserData = await userData({ token: response.data.userToken });
        if (getUserData.status === 200) {
          /*console.log(
            "Dispatch function is called from Otp.js with user data as: ",
            getUserData.data.data
          );*/
          Dispatch(loginUser(getUserData.data.data));

          toast.success(response.data.message);
          setTimeout(() => {
            navigate("/");
            window.location.reload();
          }, 5000);
        }
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
              {spiner ? (
                <span>
                  <Spinner animation="border" />
                </span>
              ) : (
                ""
              )}
            </button>
          </form>
        </div>
        <ToastContainer />
      </section>
    </>
  );
};

export default Otp;
