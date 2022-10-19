import React from "react";
import { bgImg } from "../../../components/styles";
import cardBG from "../../../img/cardBG.png";
import FeesDetail from "./FeesDetail";
import FeesStat from "./FeesStat";

const Fees = () => {
  return (
    <div>
      {/* top */}
      <div className="w-full flex gap-5 mb-10">
        {/* greating */}
        <div className="card" style={bgImg(cardBG)}>
          <p className="text-xl">Welcome Back!</p>
          <p className="mt-3">
            It's Nice to see you, <strong className="text-xl">Faisal</strong>{" "}
          </p>
        </div>
        <FeesStat />
      </div>
      <FeesDetail />
      {/* body */}
    </div>
  );
};

export default Fees;
