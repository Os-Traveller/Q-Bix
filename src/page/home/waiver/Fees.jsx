import React from "react";
import { useNavigate } from "react-router-dom";
import { colorGreen } from "../../../components/colors";
import { bgImg } from "../../../components/styles";
import cardBG from "../../../img/cardBG.png";
import FeesDetail from "./FeesDetail";
import FeesStat from "./FeesStat";

const Fees = () => {
  const path = useNavigate();
  return (
    <div>
      {/* top */}
      <div className="w-full flex gap-5 mb-10">
        {/* greating */}
        <div className="card flex flex-col justify-between" style={bgImg(cardBG)}>
          <div>
            <p className="text-xl font-semibold uppercase" style={{ letterSpacing: "3px" }}>
              Welcome Back!
            </p>
            <p className="my-3 capitalize">
              It's Nice to see you, <strong className="text-xl uppercase">Faisal Ahmed</strong>{" "}
            </p>
            <p className="capitalize">For online payment click the button</p>
          </div>
          <button
            className="btn w-fit rounded-md buble ml-auto hover:scale-110"
            style={{ backgroundColor: colorGreen }}
            onClick={() => path("/online-payment")}
          >
            Online Payment
          </button>
        </div>
        <FeesStat />
      </div>
      <FeesDetail />
      {/* body */}
    </div>
  );
};

export default Fees;
