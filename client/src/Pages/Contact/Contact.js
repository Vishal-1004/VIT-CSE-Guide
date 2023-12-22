import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import { userData, sendMsg } from "../../Services/Apis";

export default function ProfilePage() {
  const [data, setData] = useState({});
  const [getMessage, setMessage] = useState("");

  const userToken = sessionStorage.getItem("userdbtoken");
  const isLoggedIn = sessionStorage.getItem("loggedIn");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getUserData = await userData({ token: userToken });

        // Set the fetched user data to the component state
        setData(getUserData.data.data);
        //console.log("User data is: ", data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    // Check if the user is logged in before making the API call
    if (isLoggedIn) {
      fetchData();
    }
  }, [isLoggedIn, userToken]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const sendingMsg = await sendMsg({
      email: data.email,
      message: getMessage,
      fname: data.fname,
    });
    if (sendingMsg.data.message === "Email was send") {
      toast.success("Message was sent");
      setMessage("");
    } else {
      toast.warning(sendingMsg.data.message);
      setMessage("");
    }
    //console.log(sendingMsg.data.message);
  };

  return (
    <section>
      <ContactUsStyle>
        <div className="container py-4">
          <ToastContainer />
          <div className="my-4">
            <h1 className="my-0 main-heading">Contact Us</h1>
            <hr style={{ border: "3px solid #516beb" }} />
          </div>
          <div className="row sec_sp">
            <div lg="5" className="col-12 col-md-6">
              <h3 className="color_sec py-4">Report An Issue</h3>
              <address>
                <strong>Email:</strong>
                <span>&nbsp;&nbsp;vitcseguide@gmail.com</span>
                <br />
              </address>
              <p>
                Feel free to reach out to us for any assistance you may need
                while navigating our website; we are dedicated to addressing
                your concerns promptly. For an even swifter response, we
                encourage you to contact us via email. If you have materials to
                share, kindly upload them to your drive and share the link with
                us in the designated message section. Your cooperation is
                invaluable, and we're committed to ensuring your experience with
                us is seamless.
              </p>
            </div>
            <div lg="7" className="col-12 col-md-6 d-flex align-items-center">
              <form className="contact__form w-100" onSubmit={handleSubmit}>
                <div className="row">
                  <div lg="6" className="col form-group">
                    <input
                      className="form-control"
                      id="name"
                      name="name"
                      value={data.fname}
                      placeholder="Name"
                      type="text"
                      readOnly
                      required
                    />
                  </div>
                  <div lg="6" className="col form-group">
                    <input
                      className="form-control rounded-0"
                      id="email"
                      name="email"
                      value={data.email}
                      placeholder="College Email"
                      type="email"
                      readOnly
                      required
                    />
                  </div>
                </div>
                <textarea
                  className="form-control rounded-0"
                  id="message"
                  name="message"
                  placeholder="Message"
                  rows="5"
                  value={getMessage}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                ></textarea>
                <br />
                <div className="row">
                  <div lg="12" className="col form-group">
                    <button
                      className="btn btn-outline-primary px-3 py-1"
                      type="submit"
                    >
                      Send
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </ContactUsStyle>
    </section>
  );
}

const ContactUsStyle = styled.section`
  .main-heading {
    display: inline-block;
    margin-top: 2rem !important;
    font-size: 2rem;
    font-weight: 400 !important;
  }

  h3 {
    font-size: 1.5rem;
    font-weight: 400;
  }

  .contact__form .form-control {
    padding: 1.375rem 0.75rem;
    line-height: 1.5;
    background-color: inherit;
    border-radius: 0 !important;
    border: 1px solid #0c0c0c;
  }

  .contact__form input.form-control {
    margin-bottom: 2em;
    height: calc(2.5em + 0.75rem + 2px);
  }

  @media (max-width: 768px) {
    .main-heading {
      display: inline-block;
      margin-top: 1.5rem !important;
      font-size: 1.5rem;
      font-weight: 400 !important;
    }
  }
`;
