import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import DpMaker from "../../../../../components/shared/DpMaker";
import Modal from "../../../../../components/shared/Modal";
import { colorGreen, colorPupmkin, colorPurple } from "../../../../../components/styles/colors";
import { serverAddress } from "../../../../../components/variables";
import useGetUser from "../../../../../hooks/useGetUser";
import Admin from "../../../../../js/admin";
import { toastConfig } from "../../../../../toastConfig";
import CourseTable from "../../../student/courses/CourseTable";
import Searchbox from "../Searchbox";
import UpdateResultStd from "./UpdateResultStd";
import { UpdateWaiverStd } from "./UpdateWaiverStd";
import { bgImg } from "../../../../../components/styles/styles";
import coverPhoto from "../../../../../img/bgAuth.png";

const SearchStdInfo = () => {
  const { email } = useParams();
  const { data: user, refetch: userRefetch } = useGetUser(email);
  const [courses, setCourses] = useState([]);
  const [waiverModal, setWaiverModal] = useState(false);
  const [resultModal, setResultModal] = useState(false);

  const btnClass = `btn rounded-lg w-fit buble hover:scale-110`;
  const admin = new Admin();

  useEffect(() => {
    userRefetch();
    const url = `${serverAddress}/current-course/${email}`;
    fetch(url)
      .then((res) => res.json())
      .then((res) => setCourses(res));
  }, [email, userRefetch]);

  const closeWaiverModal = () => {
    setWaiverModal(false);
  };

  const closeResultModal = () => {
    setResultModal(false);
  };

  const modyfieReg = async () => {
    const res = await admin.modifyReg(user.id);
    if (res.response) {
      toast.success("Modified", toastConfig);
    } else {
      toast.error("Something Went Wrong", toastConfig);
    }
  };

  return (
    <section>
      <Searchbox />
      {/* student profile */}
      <div className="card backdrop-filter-blur bg-opacity-40 relative p-0 mt-5">
        <div className="h-[300px] rounded-t-xl" style={bgImg(coverPhoto)}></div>
        <div className="toUp">
          <DpMaker height="140px" fontSize={"90px"} color={"#654DEE"} name={user?.name} />
        </div>

        <div className="flex justify-between p-5 mt-24">
          <h1 className="text-3xl">{user?.name}</h1>
          <div className="flex gap-5">
            <button
              className={btnClass}
              style={{ backgroundColor: colorGreen }}
              onClick={() => setWaiverModal(true)}
            >
              Update Waiver
            </button>
            <Modal
              title="Update Waiver"
              openModal={waiverModal}
              setOpenModal={setWaiverModal}
              width="600px"
            >
              <UpdateWaiverStd id={user?.id} closeModal={closeWaiverModal} />
            </Modal>
            <button
              className={btnClass}
              style={{ backgroundColor: colorPupmkin }}
              onClick={() => setResultModal(true)}
            >
              Update Result
            </button>
            <Modal
              title="Update Result"
              openModal={resultModal}
              setOpenModal={setResultModal}
              width="1400px"
            >
              <UpdateResultStd id={user?.id} closeModal={closeResultModal} />
            </Modal>
            <button
              className={btnClass}
              style={{ backgroundColor: colorPurple }}
              onClick={modyfieReg}
            >
              Allow Modify Course
            </button>
          </div>
        </div>
      </div>
      {/* student acdemic info */}
      <div className="mt-5 flex gap-5">
        <div className="card w-fit flex-grow">
          <h1 className="text-2xl font-semibold">Academic Information</h1>
          {/* divider */}
          <div className="h-[1px] my-2 bg-gray-400"></div>
          <div className="flex flex-col gap-3">
            <h1 className="text-gray-400">
              Department of{" "}
              <span className="text-white uppercase">
                {user?.dept ? user?.dept : " - - - - - -"}
              </span>
            </h1>

            <h1 className="text-gray-400">
              Intake : <span className="text-white">{user?.intake ? user?.intake : ""}</span>
            </h1>

            <h1 className="text-gray-400">
              ID : <span className="text-white">{user?.id ? user?.id : " - - - - - -"}</span>
            </h1>
          </div>
        </div>
        {/* personal info */}
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
              Email :{" "}
              <span className="text-white">{user?.email ? user?.email : " - - - - - -"}</span>
            </h1>
            <h1 className="text-gray-400">
              Location :{" "}
              <span className="text-white">{user?.location ? user?.location : " - - - - - -"}</span>
            </h1>
          </div>
        </div>
        {/* Other Info */}
        <div className="card w-fit flex-grow">
          <h1 className="text-2xl font-semibold">Profile Information</h1>
          {/* divider */}
          <div className="h-[1px] my-2 bg-gray-400"></div>
          <div className="flex flex-col gap-3">
            <h1 className="text-gray-400">
              CGPA : <span className="text-white">{user?.cgpa ? user?.cgpa : " - - - - - -"}</span>
            </h1>
            <h1 className="text-gray-400">
              Demand :{" "}
              <span className="text-white">{user?.demand ? user?.demand : " - - - - - -"}</span>
            </h1>
            <h1 className="text-gray-400">
              Paid : <span className="text-white">{user?.paid ? user?.paid : " - - - - - -"}</span>
            </h1>
          </div>
        </div>
      </div>
      {/* course Info */}
      <div className="mt-5">
        <CourseTable courses={courses.subjects} semester={courses.semester} />
      </div>
    </section>
  );
};

export default SearchStdInfo;
