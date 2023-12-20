import React, { useEffect, useState } from "react";
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";
import { Link, useLocation } from "react-router-dom";
import "./Studymaterials.css";
import QuestionPapers from "../PaperCard/QuestionPapers";
import {
  getAllMaterials,
  userData,
  deleteRefVideo,
  deleteStudyMaterial,
} from "../../Services/Apis";
import Spinner from "react-bootstrap/Spinner";
import { ToastContainer, toast } from "react-toastify";

const BlogCard = ({
  domain,
  courseTitle,
  title,
  subtitle,
  readMoreLink,
  discription,
  data,
  materialId,
}) => {
  let newDomain = "";
  if (domain === "FCBSAM") {
    newDomain = "Foundation Core Basic Science & Maths";
  } else if (domain === "FCBES") {
    newDomain = "Foundation Core Basic Engineering Science";
  } else if (domain === "DL") {
    newDomain = "Dicipline Linked";
  } else if (domain === "DE") {
    newDomain = "Dicipline Elective";
  } else {
    newDomain = "Dicipline Core";
  }

  const handleDeleteMaterial = async () => {
    //console.log(domain, courseTitle, materialId);
    try {
      const response = await deleteStudyMaterial({
        domain: domain,
        courseTitle: courseTitle,
        materialId: materialId,
      });

      if (response.status === 200) {
        toast.success(response.data.message);
        window.location.reload();
      } else {
        toast.error(response.data.error);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="blog-card">
      <div className="description">
        <h1>Module {title}</h1>
        <h2>{subtitle}</h2>
        <p>{discription}</p>
        <p className="read-more">
          <a href={readMoreLink} rel="noreferrer" target="_blank">
            Read More
          </a>
        </p>
        {data.isAdmin ? (
          <p className="read-more delete">
            <button
              className="btn btn-outline-danger"
              style={{ color: "red !important" }}
              onClick={() => handleDeleteMaterial()}
            >
              Delete
            </button>
          </p>
        ) : null}
      </div>
    </div>
  );
};

const Studymaterials = () => {
  const location = useLocation();
  const courseData = location.state?.courseData || null;
  const domain = location.state?.domain || null;
  const [spiner, setSpiner] = useState(false);
  const [studyMaterialData, setStudyMaterialData] = useState([]);
  const [questionPapers, setQuestionPapers] = useState([]);
  const [referenceVideo, setReferenceVideo] = useState([]);
  const [activeModule, setActiveModule] = useState(0);

  const [data, setData] = useState({});
  const userToken = sessionStorage.getItem("userdbtoken");
  const isLoggedIn = sessionStorage.getItem("loggedIn");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getUserData = await userData({ token: userToken });
        if (getUserData.status === 200) {
          // Set the fetched user data to the component state
          setData(getUserData.data.data);
          //console.log("User data is: ", data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    // Check if the user is logged in before making the API call
    if (isLoggedIn) {
      fetchData();
    }
  }, [isLoggedIn, userToken]);

  const handleLinkClick = (index) => {
    //console.log("Before setting active module: ", activeModule);
    setActiveModule(index);
    //console.log("After setting active module: ", activeModule);
  };

  const handleRefVideoDelete = async (index) => {
    try {
      const response = await deleteRefVideo({
        domain: domain,
        courseTitle: courseData.courseTitle,
        videoId: index,
      });

      if (response.status === 200) {
        toast.success(response.data.message);
        window.location.reload();
      } else {
        toast.error(response.data.error);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        setSpiner(true);
        const materialData = await getAllMaterials({
          domain,
          courseTitle: courseData.courseTitle,
        });

        if (materialData.status === 200) {
          setSpiner(false);
          console.log(
            "All Material for ",
            courseData.courseTitle,
            " are ",
            materialData.data
          );
          setStudyMaterialData(materialData.data.studyMaterial);
          setQuestionPapers(materialData.data.paper);
          setReferenceVideo(materialData.data.refvdo);
          //console.log("Study material data is: ", studyMaterialData);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchMaterials();
  }, [courseData.courseTitle]);

  return (
    <>
      <ToastContainer />
      <h1 className="text-center my-3">{courseData.courseTitle}</h1>
      <div className="container my-3">
        <h2 className="h2-style main-heading">Study Materials</h2>
        <div
          id="carouselExampleIndicators"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            {spiner ? (
              <div className="text-center my-5" style={{ color: "black" }}>
                Loading <Spinner animation="border" />
              </div>
            ) : studyMaterialData?.length === 0 ? (
              <div className="d-flex justify-content-center">
                <div className="card" style={{ width: "25rem" }}>
                  <h5 className="card-header">No Content To Display</h5>
                  <div className="card-body">
                    <h5 className="card-title">Can you help us ?</h5>
                    <p className="card-text">
                      Currently, there's no study material here. <br />
                      Interested in contributing? Contact us to share your
                      resources!
                    </p>
                    <Link to="/contact" className="btn btn-outline-primary">
                      Contact Us
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              studyMaterialData?.map((record, i) => (
                <div
                  className={`carousel-item ${i === 0 ? "active" : ""}`}
                  key={i}
                >
                  <div className="d-block w-100">
                    <BlogCard
                      domain={domain}
                      courseTitle={courseData.courseTitle}
                      title={record.moduleNo}
                      subtitle={record.moduleName}
                      discription={record.moduleContent}
                      readMoreLink={record.materialLink}
                      data={data}
                      materialId={record._id}
                    />
                  </div>
                </div>
              ))
            )}
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="prev"
              style={{ display: studyMaterialData.length === 0 ? "none" : "" }}
            >
              <span className="carousel-control-icon-style" aria-hidden="true">
                <GrPrevious />
              </span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="next"
              style={{ display: studyMaterialData.length === 0 ? "none" : "" }}
            >
              <span className="carousel-control-icon-style" aria-hidden="true">
                <GrNext />
              </span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
      <div className="container my-3">
        <h2 className="h2-style main-heading">CAT / FAT</h2>
        {spiner ? (
          <div className="text-center my-5" style={{ color: "black" }}>
            Loading <Spinner animation="border" />
          </div>
        ) : (
          <QuestionPapers
            questionPapers={questionPapers}
            domain={domain}
            courseTitle={courseData.courseTitle}
          />
        )}
      </div>
      <div className="container my-3">
        <h2 className="h2-style main-heading">Reference Videos</h2>
        <div>
          {spiner ? (
            <div className="text-center my-5" style={{ color: "black" }}>
              Loading <Spinner animation="border" />
            </div>
          ) : referenceVideo.length === 0 ? (
            <div className="d-flex justify-content-center">
              <div className="card" style={{ width: "25rem" }}>
                <h5 className="card-header">No Content To Display</h5>
                <div className="card-body">
                  <h5 className="card-title">Can you help us ?</h5>
                  <p className="card-text">
                    Currently, there's no reference video here. <br />
                    Interested in contributing? Contact us to share your
                    resources!
                  </p>
                  <Link to="/contact" className="btn btn-outline-primary">
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <>
              <ul className="nav nav-pills justify-content-center">
                {referenceVideo?.map((element, index) => (
                  <li
                    key={index}
                    className={`nav-item ${
                      activeModule === index ? "active" : ""
                    }`}
                  >
                    <button
                      className={`nav-link ${
                        activeModule === index ? "active btn-style" : ""
                      }`}
                      onClick={() => handleLinkClick(index)}
                    >
                      {element.videos.length >= 1
                        ? `Module ${element.moduleNo}`
                        : null}
                    </button>
                  </li>
                ))}
              </ul>
              <table className="table my-3 table-style text-center container">
                <thead>
                  <tr>
                    <th>S no.</th>
                    <th>Topic</th>
                    {data.isAdmin ? <th>Action</th> : null}
                    <th>Video</th>
                  </tr>
                </thead>
                <tbody>
                  {referenceVideo[activeModule]?.videos.map((record, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{record.topic}</td>
                      {data.isAdmin ? (
                        <td>
                          <button
                            className="btn btn-outline-danger"
                            onClick={() => handleRefVideoDelete(record._id)}
                          >
                            Delete
                          </button>
                        </td>
                      ) : null}
                      <td>
                        <Link
                          to={record.videoLink}
                          className="btn click-style py-1 px-2"
                          target="_blank"
                        >
                          Watch Now
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Studymaterials;
