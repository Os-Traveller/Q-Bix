import React from "react";
import { colorRed } from "../styles/colors";

const DpMaker = ({ name, height, color, fontSize, img }) => {
  const styleImg = {
    height: height ? height : "45px",
    width: height ? height : "45px",
    backgroundColor: color ? color : colorRed,
    background: img ? `url(${img})` : "",
    backgroundPosition: "center",
    backgroundSize: "cover",
  };
  const style = {
    height: height ? height : "45px",
    width: height ? height : "45px",
    backgroundColor: color ? color : colorRed,
  };

  return (
    <div
      className="rounded-full flex justify-center items-center cursor-pointer overflow-hidden"
      style={img ? styleImg : style}
    >
      <>
        {img ? (
          // <img src={img} alt="" />
          <h1>{""}</h1>
        ) : (
          <h1 className={`text-white`} style={{ fontSize: fontSize ? fontSize : "30px" }}>
            {name && name[0]}
          </h1>
        )}
      </>
    </div>
  );
};

export default DpMaker;
