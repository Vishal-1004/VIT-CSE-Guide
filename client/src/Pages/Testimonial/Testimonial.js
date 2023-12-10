import React from "react";
import styled from "styled-components";
import { deleteTestimonial } from "../../Services/Apis";
import { ToastContainer, toast } from "react-toastify";

const Testimonial = ({ index, name, email, message }) => {
  const handleDelete = async (e) => {
    e.preventDefault();
    //console.log("Testimonial deleted: ", index);

    const response = await deleteTestimonial({ index: index });
    if (response.status === 200) {
      toast.success(response.data.message);
      setTimeout(() => {
        window.location.reload();
      }, 5000);
    } else {
      toast.error(response.response.data.error);
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
            value={message}
            placeholder="Message"
            rows="5"
            readOnly
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
                onClick={handleDelete}
              >
                Delete
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

export default Testimonial;
