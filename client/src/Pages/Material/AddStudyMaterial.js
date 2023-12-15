import React, { useState } from "react";
import "./AddSubject.css";
import { ToastContainer, toast } from "react-toastify";
import { addStudyMaterial } from "../../Services/Apis";

const AddStudyMaterial = () => {
  const [data, setData] = useState({
    domain: "",
    courseTitle: "",
    moduleNo: "",
    moduleName: "",
    moduleContent: "",
    materialLink: "",
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
      !data.moduleName ||
      !data.moduleContent ||
      !data.materialLink
    ) {
      toast.error("Enter All Input Fields");
    }

    const toSendData = {
      domain: data.domain,
      courseTitle: data.courseTitle,
      studyMaterials: {
        moduleNo: data.moduleNo,
        moduleName: data.moduleName,
        moduleContent: data.moduleContent,
        materialLink: data.materialLink,
      },
    };

    const response = await addStudyMaterial(toSendData);
    if (response.status === 200) {
      toast.success(response.data.message);
    } else {
      toast.error("Some error occured");
      console.log(response.data.error);
    }
    setData({
      domain: "",
      courseTitle: "",
      moduleContent: "",
      moduleName: "",
      moduleNo: "",
      materialLink: "",
    });
  };

  return (
    <div className="container">
      <h1 className="text-center my-3">Add Study Material</h1>
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
                placeholder="Module Name"
                name="moduleName"
                value={data.moduleName}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col">
              <textarea
                className="form-control rounded-0"
                id="message"
                name="moduleContent"
                placeholder="Module Content"
                value={data.moduleContent}
                onChange={handleChange}
                rows="3"
                required
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Module Link"
                name="materialLink"
                value={data.materialLink}
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

export default AddStudyMaterial;
