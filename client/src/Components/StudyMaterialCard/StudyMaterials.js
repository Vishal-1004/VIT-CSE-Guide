import React, { useEffect, useState } from "react";
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";
import { Link, useLocation } from "react-router-dom";
import "./Studymaterials.css";
import QuestionPapers from "../PaperCard/QuestionPapers";
import ReferenceVideos from "../ReferenceVideos/ReferenceVideos";
import { getAllMaterials } from "../../Services/Apis";
import Spinner from "react-bootstrap/Spinner";

const truncateDescription = (text, wordLimit) => {
  const words = text.split(" ");
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(" ") + "...";
  }
  return text;
};

const BlogCard = ({
  domain,
  courseTitle,
  title,
  subtitle,
  imageUrl,
  readMoreLink,
  discription,
}) => {
  const truncatedDescription = truncateDescription(discription, 20);
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
  return (
    <div className="blog-card">
      <div className="meta">
        <div
          className="photo"
          style={{ backgroundImage: `url(${imageUrl})` }}
        ></div>
        <ul className="details">
          <li className="date">{courseTitle}</li>
          <li className="author">{newDomain}</li>
        </ul>
      </div>
      <div className="description">
        <h1>Module {title}</h1>
        <h2>{subtitle}</h2>
        <p>{truncatedDescription}</p>
        <p className="read-more">
          <a href={readMoreLink} rel="noreferrer" target="_blank">
            Read More
          </a>
        </p>
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
                      tags={["Learn", "Code", "HTML", "CSS"]}
                      title={record.moduleNo}
                      subtitle={record.moduleName}
                      discription={record.moduleContent}
                      imageUrl="https://storage.googleapis.com/chydlx/codepen/blog-cards/image-1.jpg"
                      readMoreLink={record.materialLink}
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
          <QuestionPapers questionPapers={questionPapers} />
        )}
      </div>
      <div className="container my-3">
        <h2 className="h2-style main-heading">Reference Videos</h2>
        <ReferenceVideos />
      </div>
    </>
  );
};

export default Studymaterials;
