import React, { useState } from "react";
import "./AddSubject.css";
import { ToastContainer, toast } from "react-toastify";
import { addRefvdo } from "../../Services/Apis";

const AddRefVdo = () => {
  const [data, setData] = useState({
    domain: "",
    courseTitle: "",
    moduleNo: "",
    topic: "",
    videoLink: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const formSubmit = async (e) => {
    e.preventDefault();

    if (
      !data.domain ||
      !data.courseTitle ||
      !data.moduleNo ||
      !data.topic ||
      !data.videoLink
    ) {
      toast.error("Enter All Input Fields");
    }

    const toSendData = {
      domain: data.domain,
      content: {
        courseTitle: data.courseTitle,
        referenceVideos: {
          moduleNo: parseInt(data.moduleNo, 10),
          videos: {
            topic: data.topic,
            videoLink: data.videoLink,
          },
        },
      },
    };

    const response = await addRefvdo(toSendData);
    if (response.status === 200) {
      toast.success(response.data.message);
    } else {
      toast.error("Some error occured");
      console.log(response.data.error);
    }
    setData({
      domain: "",
      courseTitle: "",
      moduleNo: "",
      topic: "",
      videoLink: "",
    });
  };

  return (
    <div className="container">
      <h1 className="text-center my-3">Add Reference Videos</h1>
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
                placeholder="Module Number"
                name="moduleNo"
                value={data.moduleNo}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Topic"
                name="topic"
                value={data.topic}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col">
              <input
                className="form-control"
                id="text"
                name="videoLink"
                placeholder="Video Link"
                value={data.videoLink}
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

export default AddRefVdo;
