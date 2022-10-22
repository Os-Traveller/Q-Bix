import React, { useEffect } from "react";
import profileBg from "../../../img/bgProfile.png";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";
import useGetUser from "../../../hooks/useGetUser";

const ProfileInfo = () => {
  const [user] = useAuthState(auth);
  const { data: stdInfo, refetch } = useGetUser(user?.email);
  useEffect(() => {
    refetch();
  }, []);

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
          Nice to see you, <span className="text-xl font-bold font-mono">{stdInfo?.name}</span>
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
            <span className="text-white uppercase">
              {stdInfo?.dept ? stdInfo?.dept : " - - - - - -"}
            </span>
          </h1>

          <h1 className="text-gray-400">
            Intake / Section :{" "}
            <span className="text-white">
              {stdInfo?.intake ? stdInfo?.intake : ""} -{" "}
              {stdInfo?.section ? stdInfo.section : " - - - - -"}
            </span>
          </h1>

          <h1 className="text-gray-400">
            ID : <span className="text-white">{stdInfo?.id ? stdInfo?.id : " - - - - - -"}</span>
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
            <span className="text-white">{stdInfo?.phone ? stdInfo?.phone : " - - - - - -"}</span>
          </h1>
          <h1 className="text-gray-400">
            Email : <span className="text-white">{stdInfo?.email}</span>
          </h1>
          <h1 className="text-gray-400">
            Location :{" "}
            <span className="text-white">
              {stdInfo?.location ? stdInfo.location : " - - - - - -"}
            </span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
