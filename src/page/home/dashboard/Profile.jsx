import React from "react";
import myDp from "../../../img/dp.jpg";
import cover from "../../../img/cover.jpg";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";
import DpMaker from "../../../components/DpMaker";
import { MdOutlineEdit } from "react-icons/md";
const Profile = () => {
  const [user] = useAuthState(auth);
  const radious = "40px";
  return (
    <>
      <div className="card relative p-0">
        <div
          className="h-[180px] rounded-t-xl"
          style={{
            backgroundImage: `url(${cover})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
        <div className="toUp">
          <DpMaker img={myDp} height="150px" />
        </div>
        <div className="flex justify-between p-5 mt-14">
          <div>
            <h1 className="text-3xl">{user?.displayName}</h1>
          </div>
          <button
            className="rounded-full bg-[#464A4D] centerXY buble"
            style={{ height: radious, width: radious }}
          >
            <MdOutlineEdit className="text-xl" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Profile;
