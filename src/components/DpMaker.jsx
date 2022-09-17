import React from "react";

const DpMaker = ({ name, height, color, onClick, fontSize, img }) => {
  return (
    <div
      className="rounded-full flex justify-center items-center cursor-pointer"
      style={{
        height: height ? height : "37px",
        width: height ? height : "37px",
        backgroundColor: color ? color : "#3C2E67",
      }}
      onClick={onClick}
    >
      <>
        {img ? (
          <img src={img} alt="" />
        ) : (
          <h1 className={`text-white`} style={{ fontSize: fontSize ? fontSize : "20px" }}>
            {name && name[0]}
          </h1>
        )}
      </>
    </div>
  );
};

export default DpMaker;
