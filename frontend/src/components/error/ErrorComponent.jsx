import React from "react";

const ErrorComponent = ({ error, cause }) => {
  return (
    <>
      <h2>{error}</h2>
      <p>{cause}</p>
    </>
  );
};

export default ErrorComponent;
