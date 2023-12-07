import React from "react";
import "../Register/Register.css";

const Otp = () => {
  return (
    <>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Please Enter Your OTP Here</h1>
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
                placeholder="Enter Your OTP"
              />
            </div>
            <button className="btn">Submit</button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Otp;
