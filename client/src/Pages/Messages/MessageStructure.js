import React, { useState } from "react";
import styled from "styled-components";
import "./Message.css";
import { ToastContainer, toast } from "react-toastify";
import { deleteMsg, uploadTestimonial } from "../../Services/Apis";

const MessageStructure = ({ index, name, email, message }) => {
  const [getMessage, setMessage] = useState(message);

  const handleDelete = async (e) => {
    e.preventDefault();
    //console.log(index);

    const response = await deleteMsg({ index: index });
    if (response.status === 200) {
      toast.success(response.data.message);
      setTimeout(() => {
        window.location.reload();
      }, 5000);
    } else {
      toast.error(response.response.data.error);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    const data = { fname: name, email: email, message: getMessage };
    const response = await uploadTestimonial(data);
    if (response.status === 200) {
      toast.success(response.data.message);
      handleDelete(e);
    } else {
      toast.error("Some error occured, mainly duplicacy error");
    }
  };

  return (
    <MessageStructureStyle>
      <div className="container d-flex align-items-center justify-content-center">
        <form className="contact__form">
          <div className="row">
            <div lg="6" className="col form-group">
              <input
                className="form-control"
                id="name"
                name="name"
                value={name}
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
                value={email}
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
            value={getMessage}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message"
            rows="5"
            required
          ></textarea>
          <br />
          <div className="row">
            <div
              lg="12"
              className="col form-group d-flex align-items-center justify-content"
            >
              <button
                className="btn-v btn-v-outline-danger mx-2"
                type="submit"
                onClick={(e) => handleDelete(e)}
              >
                Delete
              </button>
              <button
                className="btn-v btn-outline-success mx-2"
                type="submit"
                onClick={(e) => handleUpload(e)}
              >
                Upload
              </button>
            </div>
          </div>
        </form>
        <ToastContainer />
      </div>
    </MessageStructureStyle>
  );
};

const MessageStructureStyle = styled.section`
  min-height: 0;
  .contact__form {
    width: 80%;
    padding: 0 0 15px 0 !important;
    border-bottom: 2px solid #516beb;
  }

  .contact__form .form-control {
    padding: 0.8rem 0.5rem;
    line-height: 1.25;
    background-color: inherit;
    border-radius: 0 !important;
    border: 1px solid #0c0c0c;
  }

  .contact__form input.form-control {
    margin-bottom: 1.5em;
  }

  @media (max-width: 768px) {
    .contact__form {
      width: 100%;
    }
  }
`;

export default MessageStructure;
