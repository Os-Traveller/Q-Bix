import React from "react";
import { colorBlue, colorGreen, colorPurple, colorRed } from "../../../components/colors";
const FeesStat = () => {
  const radious = "210px";
  const borderRadious = "10px";
  return (
    <>
      <FeesBox
        radious={radious}
        color={colorGreen}
        borderRadious={borderRadious}
        title="Demand"
        data="2,23,173"
      />
      {/* waiver */}
      <FeesBox
        radious={radious}
        color={colorPurple}
        borderRadious={borderRadious}
        title="Waiver"
        data="1,21,315"
      />
      {/* Paid */}
      <FeesBox
        radious={radious}
        color={colorBlue}
        borderRadious={borderRadious}
        title="Paid"
        data="1,01,325"
      />
      {/* Due */}
      <FeesBox
        radious={radious}
        color={colorRed}
        borderRadious={borderRadious}
        title="Due"
        data="334"
      />
    </>
  );
};
const FeesBox = ({ radious, color, borderRadious, title, data }) => {
  return (
    <div className="card w-[250px] text-center">
      <div
        style={{
          height: radious,
          width: radious,
          borderTopColor: color,
          borderTopWidth: borderRadious,
        }}
        className="mx-auto rounded-full centerXY"
      >
        <span className="font-semibold text-2xl" style={{ letterSpacing: "5px" }}>
          &#x09F3; {data}
        </span>
      </div>
      <p className="mt-[-50px] font-semibold uppercase" style={{ letterSpacing: "2px" }}>
        {title}
      </p>
    </div>
  );
};
export default FeesStat;
