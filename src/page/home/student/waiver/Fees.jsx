import React from "react";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { colorGreen } from "../../../../components/styles/colors";
import { bgImg } from "../../../../components/styles/styles";
import auth from "../../../../firebase.init";
import useGetUser from "../../../../hooks/useGetUser";
import cardBG from "../../../../img/cardBG.png";
import FeesDetail from "./FeesDetail";
import FeesStat from "./FeesStat";

const Fees = () => {
  const path = useNavigate();
  const [userFirebase] = useAuthState(auth);
  const { data: user, refetch } = useGetUser(userFirebase?.email);

  useEffect(() => {
    refetch();
  }, [userFirebase, refetch]);

  return (
    <section>
      {/* top */}
      <div className="w-full flex gap-5 mb-5">
        {/* greating */}
        <div className="card flex flex-col gap-5 justify-between" style={bgImg(cardBG)}>
          <div>
            <p className="text-xl font-semibold uppercase" style={{ letterSpacing: "3px" }}>
              Welcome Back!
            </p>
            <p className="my-3 capitalize">
              It's Nice to see you, <strong className="text-xl uppercase">{user?.name}</strong>{" "}
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
    </section>
  );
};

export default Fees;
