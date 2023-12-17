import React, { useState } from "react";
import "./AddSubject.css";
import { ToastContainer, toast } from "react-toastify";
import { addPaper } from "../../Services/Apis";

const AddPaper = () => {
  const [data, setData] = useState({
    domain: "",
    courseTitle: "",
    examType: "",
    examTypeNo: "",
    slot: "",
    year: "",
    paperMaterialLink:"",
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
      !data.examType ||
      !data.examTypeNo ||
      !data.slot ||
      !data.year ||
      !data.paperMaterialLink
    ) {
      toast.error("Enter All Input Fields");
    }

    const toSendData = {
      domain: data.domain,
      content:{
        courseTitle: data.courseTitle,
        papers: {
            examType: data.examType,
            examTypeNo: data.examTypeNo,
            slot: data.slot,
            year: data.year,
            paperMaterialLink:data.paperMaterialLink,
        },
      }
      
    };

    const response = await addPaper(toSendData);
    if (response.status === 200) {
      toast.success(response.data.message);
    } else {
      toast.error("Some error occured");
      console.log(response.data.error);
    }
    setData({
      domain: "",
      courseTitle: "",
      examType: "",
      examTypeNo: "",
      slot: "",
      year: "",
      paperMaterialLink: "",
    });
  };

  return (
    <div className="container">
      <h1 className="text-center my-3">Add Paper</h1>
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
                type="text"
                className="form-control"
                placeholder="Exam Type"
                name="examType"
                value={data.examType}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col">
              <input
                type="number"
                className="form-control"
                placeholder="Exam Type Number"
                name="examTypeNo"
                value={data.examTypeNo}
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
                name="slot"
                placeholder="Slot"
                value={data.slot}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Year"
                name="year"
                value={data.year}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Paper Link"
                name="paperMaterialLink"
                value={data.paperMaterialLink}
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

export default AddPaper;
