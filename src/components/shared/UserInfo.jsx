import React from "react";
import DpMaker from "./DpMaker";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import myDp from "../img/dp.jpg";

const UserInfo = () => {
  const [user] = useAuthState(auth);
  return (
    <div className="card opacity-70">
      <div className="flex items-center gap-5">
        <DpMaker img={myDp} height={"80px"} />
        <div>
          <h1 className="text-2xl font-semibold font-mono">{user?.displayName}</h1>
          <p className="text-gray-400">{user?.email}</p>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
