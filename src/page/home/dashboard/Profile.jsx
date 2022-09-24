import React from "react";
import myDp from "../../../img/dp.jpg";
import cover from "../../../img/cover.png";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";
import DpMaker from "../../../components/DpMaker";
import { MdOutlineEdit } from "react-icons/md";
import ProfileInfo from "./ProfileInfo";

const Profile = () => {
  const [user] = useAuthState(auth);
  return (
    <>
      <div className="card backdrop-filter-blur bg-opacity-40 relative p-0">
        <div
          className="h-[250px] rounded-t-xl"
          style={{
            backgroundImage: `url(${cover})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
        <div className="toUp">
          <DpMaker img={myDp} height="180px" />
        </div>
        <div className="flex justify-between p-5 mt-24">
          <div>
            <h1 className="text-3xl">{user?.displayName}</h1>
          </div>
          <button className="rounded-xl py-1 px-5 bg-[#582CFF] flex items-center gap-2 buble">
            Edit Profile
            <MdOutlineEdit className="text-xl" />
          </button>
        </div>
      </div>

      <div className="mt-5">
        <ProfileInfo />
      </div>
    </>
  );
};

export default Profile;
