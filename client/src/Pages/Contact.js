import React from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import styled from "styled-components";

export default function ProfilePage() {
  return (
    <section>
      <ContactUsStyle>
        <div className="container py-4">
          <div className="my-4">
            <h1 className="my-0 main-heading">Contact Us</h1>
            <hr style={{ border: "3px solid #516beb" }} />
          </div>
          <div className="row sec_sp">
            <div lg="5" className="col-12 col-md-6">
              <h3 className="color_sec py-4">Report An Issue</h3>
              <address>
                <strong>Email:</strong>
                <span>&nbsp;&nbsp;Loremipsumdolor@gmail.com</span>
                <br />
              </address>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex amet
                facere in. Iure quis laboriosam neque minus odit quo perferendis
                iste eligendi quibusdam facere, molestiae error saepe quam culpa
                voluptates asperiores magni modi! At, voluptas atque sint id
                similique assumenda alias aut inventore sequi quisquam ea
                quibusdam? Dignissimos, porro aspernatur!
              </p>
            </div>
            <div lg="7" className="col-12 col-md-6 d-flex align-items-center">
              <form className="contact__form w-100">
                <div className="row">
                  <div lg="6" className="col form-group">
                    <input
                      className="form-control"
                      id="name"
                      name="name"
                      placeholder="Name"
                      type="text"
                      required
                    />
                  </div>
                  <div lg="6" className="col form-group">
                    <input
                      className="form-control rounded-0"
                      id="email"
                      name="email"
                      placeholder="Email"
                      type="email"
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
        <MDBContainer className="my-2">
          <div className="my-1">
            <h1 className="my-0 main-heading">Developers</h1>
            <hr style={{ border: "3px solid #516beb" }} />
          </div>
          <MDBRow className="my-4">
            <MDBCol lg="4">
              <MDBCard className="mb-4">
                <MDBCardBody className="text-center">
                  <MDBCardImage
                    src="./vishal_image.png"
                    alt="avatar"
                    className="rounded-circle"
                    style={{ width: "125px" }}
                    fluid
                  />
                  <p className="text-muted mb-1">Vishal Kumar Yadav</p>
                  <p className="text-muted mb-4">
                    Full Stack (MERN) Web Developer | VIT Chennai
                  </p>
                  <div className="d-flex justify-content-center mb-2">
                    <Link
                      to="https://www.linkedin.com/in/vishal-kumar-yadav-8085a3232/"
                      target="_blank"
                    >
                      <button className="btn btn-outline-primary ms-1">
                        Connect
                      </button>
                    </Link>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol lg="4">
              <MDBCard className="mb-4">
                <MDBCardBody className="text-center">
                  <MDBCardImage
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                    alt="avatar"
                    className="rounded-circle"
                    style={{ width: "125px" }}
                    fluid
                  />
                  <p className="text-muted mb-1">Vishal Kumar Yadav</p>
                  <p className="text-muted mb-4">
                    Full Stack (MERN) Web Developer | VIT Chennai
                  </p>
                  <div className="d-flex justify-content-center mb-2">
                    <MDBBtn outline className="ms-1">
                      Connect
                    </MDBBtn>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol lg="4">
              <MDBCard className="mb-4">
                <MDBCardBody className="text-center">
                  <MDBCardImage
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                    alt="avatar"
                    className="rounded-circle"
                    style={{ width: "125px" }}
                    fluid
                  />
                  <p className="text-muted mb-1">Vishal Kumar Yadav</p>
                  <p className="text-muted mb-4">
                    Full Stack (MERN) Web Developer | VIT Chennai
                  </p>
                  <div className="d-flex justify-content-center mb-2">
                    <MDBBtn outline className="ms-1">
                      Connect
                    </MDBBtn>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
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
