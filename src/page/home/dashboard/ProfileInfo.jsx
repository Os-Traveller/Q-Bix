import React from "react";
import profileBg from "../../../img/bgProfile.png";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";

const ProfileInfo = () => {
  const [user] = useAuthState(auth);
  return (
    <div className="flex flex-wrap gap-5">
      {/* greatings */}
      <div
        className="card w-fit flex-grow"
        style={{
          backgroundImage: `url(${profileBg})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <h1 className="text-2xl">Welcome Back!</h1>
        <p className="mt-2">
          Nice to see you, <span className="text-xl font-bold font-mono">{user.displayName}</span>
        </p>
      </div>
      {/* profile information */}
      <div className="card w-fit flex-grow">
        <h1 className="text-2xl font-semibold">Academic Information</h1>
        {/* divider */}
        <div className="h-[1px] my-2 bg-gray-400"></div>
        <div className="flex flex-col gap-3">
          <h1 className="text-gray-400">
            Department of <span className="text-white">CSE</span>
          </h1>

          <h1 className="text-gray-400">
            Intake / Section : <span className="text-white">44 - 3</span>
          </h1>

          <h1 className="text-gray-400">
            ID : <span className="text-white">19202103135</span>
          </h1>
        </div>
      </div>
      {/* Academic information */}
      <div className="card w-fit flex-grow">
        <h1 className="text-2xl font-semibold">Profile Information</h1>
        {/* divider */}
        <div className="h-[1px] my-2 bg-gray-400"></div>
        <div className="flex flex-col gap-3">
          <h1 className="text-gray-400">
            Mobile : <span className="text-white">01575008359</span>
          </h1>
          <h1 className="text-gray-400">
            Email : <span className="text-white">faisal@gmail.com</span>
          </h1>
          <h1 className="text-gray-400">
            Location : <span className="text-white">Mirpur, Dhaka, Bangladesh</span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
