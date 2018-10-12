import React from "react";
import ClassNames from "classnames";

const Alert = ({ MessageType, Message }) => {
  return (
    <div
      className={ClassNames(
        MessageType === "success" ? "alert alert-success" : "alert alert-danger"
      )}
    >
      {Message}
    </div>
  );
};

export default Alert;
