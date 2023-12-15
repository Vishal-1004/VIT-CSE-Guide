import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { addSubject } from "../../Services/Apis";
import "./AddSubject.css";

const AddSubject = () => {
  const [data, setData] = useState({
    domain: "",
    courseTitle: "",
    credits: "",
    syllabus: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    if (!data.domain || !data.courseTitle || !data.credits) {
      toast.error("Enter All The Input Fields");
    }
    const toSendData = {
      domain: data.domain,
      content: {
        courseTitle: data.courseTitle,
        credits: data.credits,
        syllabus: data.syllabus,
      },
    };

    const response = await addSubject(toSendData);
    if (response.status === 200) {
      toast.success("Subject Added Successfully");
    } else {
      toast.error("Some Error Occured");
      console.log(response.error);
    }
    //console.log(toSendData);
    setData({ domain: "", courseTitle: "", credits: "", syllabus: "" });
  };

  return (
    <div className="container">
      <h1 className="text-center my-3">Add Subject</h1>
      <div className="d-flex justify-content-center align-items-center my-5">
        <form>
          <div class="row mb-3">
            <div class="col">
              <input
                type="text"
                class="form-control"
                placeholder="Domain Name"
                name="domain"
                value={data.domain}
                onChange={handleChange}
                required
              />
            </div>
            <div class="col">
              <input
                type="text"
                class="form-control"
                placeholder="Course Title"
                name="courseTitle"
                value={data.courseTitle}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col">
              <input
                type="number"
                className="form-control"
                placeholder="Enter Credits"
                name="credits"
                value={data.credits}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Syllabus Link"
                name="syllabus"
                value={data.syllabus}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div class="row">
            <div class="col">
              <button
                type="submit"
                class="btn btn-primary btn-style-material"
                onClick={formSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddSubject;
