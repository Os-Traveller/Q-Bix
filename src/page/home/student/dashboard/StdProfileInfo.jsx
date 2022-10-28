import React from "react";
import profileBg from "../../../../img/bgProfile.png";
import { useAuthState } from "react-firebase-hooks/auth";
import useGetUser from "../../../../hooks/useGetUser";
import auth from "../../../../firebase.init";

const StdProfileInfo = () => {
  const [userFirebase] = useAuthState(auth);
  const { data: user } = useGetUser(userFirebase?.email);

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
          Nice to see you, <span className="text-xl font-bold font-mono">{user?.name}</span>
        </p>
      </div>
      {/* profile information */}
      <div className="card w-fit flex-grow">
        <h1 className="text-2xl font-semibold">Academic Information</h1>
        {/* divider */}
        <div className="h-[1px] my-2 bg-gray-400"></div>
        <div className="flex flex-col gap-3">
          <h1 className="text-gray-400">
            Department of{" "}
            <span className="text-white uppercase">{user?.dept ? user?.dept : " - - - - - -"}</span>
          </h1>

          <h1 className="text-gray-400">
            Intake / Section :{" "}
            <span className="text-white">
              {user?.intake ? user?.intake : ""} - {user?.section ? user?.section : " - - - - -"}
            </span>
          </h1>

          <h1 className="text-gray-400">
            ID : <span className="text-white">{user?.id ? user?.id : " - - - - - -"}</span>
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
            Mobile :{" "}
            <span className="text-white">{user?.phone ? user?.phone : " - - - - - -"}</span>
          </h1>
          <h1 className="text-gray-400">
            Email : <span className="text-white">{user?.email ? user?.email : " - - - - - -"}</span>
          </h1>
          <h1 className="text-gray-400">
            Location :{" "}
            <span className="text-white">{user?.location ? user?.location : " - - - - - -"}</span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default StdProfileInfo;
