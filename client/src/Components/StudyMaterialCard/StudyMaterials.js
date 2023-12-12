import React from "react";
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";
import "./Studymaterials.css";
import QuestionPapers from "../PaperCard/QuestionPapers";
import ReferenceVideos from "../ReferenceVideos/ReferenceVideos";

const BlogCard = ({
  author,
  date,
  tags,
  title,
  subtitle,
  imageUrl,
  readMoreLink,
}) => {
  return (
    <div className="blog-card">
      <div className="meta">
        <div
          className="photo"
          style={{ backgroundImage: `url(${imageUrl})` }}
        ></div>
        <ul className="details">
          <li className="author">
            <a href="/">{author}</a>
          </li>
          <li className="date">{date}</li>
          <li className="tags">
            <ul>
              {tags.map((tag, index) => (
                <li key={index}>
                  <a href="/">{tag}</a>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </div>
      <div className="description">
        <h1>{title}</h1>
        <h2>{subtitle}</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad eum
          dolorum architecto obcaecati enim dicta praesentium, quam nobis! Neque
          ad aliquam facilis numquam. Veritatis, sit.
        </p>
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
  return (
    <>
      <h1 className="text-center my-3">Subject Name</h1>
      <div className="container my-3">
        <h2 className="h2-style main-heading">Study Materials</h2>
        <div
          id="carouselExampleIndicators"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div className="d-block w-100">
                <BlogCard
                  author="John Doe"
                  date="Aug. 24, 2015"
                  tags={["Learn", "Code", "HTML", "CSS"]}
                  title="Module 1"
                  subtitle="Lorem ipsum dolor"
                  imageUrl="https://storage.googleapis.com/chydlx/codepen/blog-cards/image-1.jpg"
                  readMoreLink="https://www.google.com"
                />
              </div>
            </div>
            <div className="carousel-item">
              <div className="d-block w-100">
                <BlogCard
                  author="Jane Doe"
                  date="July. 15, 2015"
                  tags={["Learn", "Code", "JavaScript"]}
                  title="Module 2"
                  subtitle="Lorem ipsum dolor"
                  imageUrl="https://storage.googleapis.com/chydlx/codepen/blog-cards/image-2.jpg"
                  readMoreLink="https://www.google.com"
                />
              </div>
            </div>
            <div className="carousel-item">
              <div className="d-block w-100">
                <BlogCard
                  author="John Doe"
                  date="Aug. 24, 2015"
                  tags={["Learn", "Code", "HTML", "CSS"]}
                  title="Module 3"
                  subtitle="Lorem ipsum dolor"
                  imageUrl="https://storage.googleapis.com/chydlx/codepen/blog-cards/image-1.jpg"
                  readMoreLink="https://www.google.com"
                />
              </div>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev"
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
          >
            <span className="carousel-control-icon-style" aria-hidden="true">
              <GrNext />
            </span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
        {/*
      <BlogCard
        author="John Doe"
        date="Aug. 24, 2015"
        tags={["Learn", "Code", "HTML", "CSS"]}
        title="Learning to Code"
        subtitle="Opening a door to the future"
        imageUrl="https://storage.googleapis.com/chydlx/codepen/blog-cards/image-1.jpg"
        readMoreLink="#"
      />
      <BlogCard
        author="Jane Doe"
        date="July. 15, 2015"
        tags={["Learn", "Code", "JavaScript"]}
        title="Mastering the Language"
        subtitle="Java is not the same as JavaScript"
        imageUrl="https://storage.googleapis.com/chydlx/codepen/blog-cards/image-2.jpg"
        readMoreLink="#"
      />
       */}
      </div>
      <div className="container my-3">
        <h2 className="h2-style main-heading">CAT / FAT</h2>
        <QuestionPapers />
      </div>
      <div className="container my-3">
        <h2 className="h2-style main-heading">Reference Videos</h2>
        <ReferenceVideos />
      </div>
    </>
  );
};

export default Studymaterials;
