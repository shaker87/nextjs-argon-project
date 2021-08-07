import React from "react";
import { Alert } from "reactstrap";

const ErrorMessage = ({ errorMessage }) => {
  return (
    <div className="centered">
      <Alert color="danger">{errorMessage}</Alert>
    </div>
  );
};

export default ErrorMessage;
