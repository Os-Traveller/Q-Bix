import React from "react";

const IconCover = ({ icon, radious }) => {
  return (
    <button
      className="centerXY border-[1px] border-gray-400 rounded-full buble"
      style={{ height: radious, width: radious }}
    >
      {icon}
    </button>
  );
};

export default IconCover;
