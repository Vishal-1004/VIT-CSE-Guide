import React from "react";
import { Link } from "react-router-dom";

const QuestionPapers = ({ questionPapers }) => {
  return (
    <>
      {questionPapers.length === 0 ? (
        <div className="d-flex justify-content-center">
          <div className="card" style={{ width: "25rem" }}>
            <h5 className="card-header">No Content To Display</h5>
            <div className="card-body">
              <h5 className="card-title">Can you help us ?</h5>
              <p className="card-text">
                Currently, there's no question paper here. <br />
                Interested in contributing? Contact us to share your resources!
              </p>
              <Link to="/contact" className="btn btn-outline-primary">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div>We have something to display</div>
      )}
    </>
  );
};

export default QuestionPapers;
