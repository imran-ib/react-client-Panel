import React from "react";
import spiner from "../../assets/spinner.GIF";

const Spiner = () => {
  return (
    <div>
      <img src={spiner} alt="Loading..." style={{ width: "100px" }} />
    </div>
  );
};

export default Spiner;
