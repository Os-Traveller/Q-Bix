import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import DpMaker from "../../../../components/shared/DpMaker";
import StatCard from "../../../../components/shared/StatCard";
import { colorGreen, colorPurple } from "../../../../components/styles/colors";
import { serverAddress } from "../../../../components/variables";
import bubtLogo from "../../../../img/bubt_logo.png";
// import StatCard from "../../../../components/shared/StatCard";

const UniversityInfo = () => {
  const [allData, setAllData] = useState({});

  useEffect(() => {
    const url = `${serverAddress}/ratio-admin-dashboard`;
    fetch(url)
      .then((res) => res.json())
      .then((res) => setAllData(res));
    console.log(allData);
  }, []);

  return (
    <div>
      <Info />
      <div className="flex gap-5 mt-5">
        <StatCard
          title={"Students"}
          additional={"Registered"}
          total={allData.totalStd}
          completed={allData.registeredStd}
          fontColor={colorGreen}
        />
        <StatCard
          title={"Fees"}
          additional={"Paid"}
          total={allData.demand}
          completed={allData.paid}
          fontColor={colorPurple}
        />
      </div>
    </div>
  );
};

const Info = () => {
  return (
    <div className="card">
      <div className="flex justify-center gap-24">
        <DpMaker img={bubtLogo} height={"200px"} />
        <div className="text-center">
          <h1 className="text-center font-mono text-2xl font-semibold ">
            Bangladesh University Of Buiness And Technology (BUBT)
          </h1>
          <p className="mt-4 text-gray-400">Rupnagar, Mirpur-2, Dhaka-1216, Bangladesh</p>
          <p className="text-gray-400 mt-2">
            Email: <strong>info@bubt.edu.bd</strong>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UniversityInfo;
