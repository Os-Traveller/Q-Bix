import React, { useState } from "react";
import { useEffect } from "react";
import { colorBlue, colorGreen, colorPurple, colorRed } from "../../../../components/styles/colors";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../../firebase.init";
import useGetUser from "../../../../hooks/useGetUser";
import { serverAddress } from "../../../../components/varables";

const FeesStat = () => {
  const radious = "150px";
  const borderRadious = "10px";
  const [feesInfo, setFeesInfo] = useState({});
  const [userFireBase] = useAuthState(auth);
  const { data: userData, refetch } = useGetUser(userFireBase?.email);

  useEffect(() => {
    refetch();
    const url = `${serverAddress}/fees-info/${userData?.email}/${userData?.dept}`;
    fetch(url)
      .then((res) => res.json())
      .then((res) => setFeesInfo(res));
  }, [userData, refetch]);

  return (
    <>
      <FeesBox
        radious={radious}
        color={colorGreen}
        borderRadious={borderRadious}
        title="Demand"
        data={feesInfo.stdTotalCredit * feesInfo.feesPerCr}
      />
      {/* waiver */}
      <FeesBox
        radious={radious}
        color={colorPurple}
        borderRadious={borderRadious}
        title="Waiver"
        data={feesInfo.waiver}
      />
      {/* Paid */}
      <FeesBox
        radious={radious}
        color={colorBlue}
        borderRadious={borderRadious}
        title="Paid"
        data={feesInfo.paid}
      />
      {/* Due */}
      <FeesBox
        radious={radious}
        color={colorRed}
        borderRadious={borderRadious}
        title="Due"
        data={feesInfo.stdTotalCredit * feesInfo.feesPerCr - (feesInfo.paid ? feesInfo.paid : 0)}
      />
    </>
  );
};
const FeesBox = ({ radious, color, borderRadious, title, data }) => {
  return (
    <div className="card w-[200px] text-center">
      <div
        style={{
          height: radious,
          width: radious,
          borderTopColor: color,
          borderTopWidth: borderRadious,
        }}
        className="mx-auto rounded-full centerXY"
      >
        <span className="font-semibold text-lg" style={{ letterSpacing: "3px" }}>
          &#x09F3; {data ? data : 0}
        </span>
      </div>
      <p className="mt-[-50px] font-semibold uppercase" style={{ letterSpacing: "2px" }}>
        {title}
      </p>
    </div>
  );
};
export default FeesStat;
