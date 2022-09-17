import React from "react";
import myDp from "../../../img/dp.jpg";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";

const Profile = () => {
  const [user] = useAuthState(auth);
  const width = "300px";
  console.log();
  return (
    <div className="card flex gap-10">
      <img src={myDp} className="rounded-xl" style={{ width }} alt="" />
      <h1 className="text-3xl font-semibold">{user?.displayName}</h1>
    </div>
  );
};

export default Profile;
