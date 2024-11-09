import React from "react";

const Result = ({ score, total }) => {
  return (
    <div className="result">
      <h2>Quiz Completed!</h2>
      <p>Your score is {score} out of {total}</p>
    </div>
  );
};

export default Result;
