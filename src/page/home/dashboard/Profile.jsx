import React, { useEffect, useState } from "react";
import myDp from "../../../img/dp.jpg";
import cover from "../../../img/cover.png";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";
import DpMaker from "../../../components/DpMaker";
import { MdOutlineEdit } from "react-icons/md";
import ProfileInfo from "./ProfileInfo";
import Modal from "../../../components/Modal";
import InputCredit from "../../../components/InputCredit";
import { colorGray, colorGreen, colorRed } from "../../../components/colors";
import Student from "../../../js/student";
import useGetUser from "../../../hooks/useGetUser";

const Profile = () => {
  const width = "45%";
  const [user] = useAuthState(auth);
  const [openModal, setOpenModal] = useState(false);
  const { data: stdDB, refetch: userRefetch } = useGetUser(user?.email);
  const std = new Student({ email: user?.email, name: user?.displayName });
  const [dept, setDept] = useState(stdDB?.dept);
  const [intake, setIntake] = useState(stdDB?.intake);
  const [section, setSection] = useState(stdDB?.section);
  const [phone, setPhone] = useState(stdDB?.phone);
  const [location, setLocation] = useState(stdDB?.location);

  // updating profile
  const updateProfile = (e) => {
    e.preventDefault();
    const res = std.updateProfileInfo({ dept, intake, section, phone, location });
    userRefetch();
    setOpenModal(false);
  };

  useEffect(() => {
    userRefetch();
  }, [userRefetch]);
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
          <DpMaker img={myDp} height="180px" name={user?.displayName} />
        </div>
        <div className="flex justify-between p-5 mt-24">
          <div>
            <h1 className="text-3xl">{user?.displayName}</h1>
          </div>
          <button
            className="rounded-xl py-1 px-5 bg-[#582CFF] flex items-center gap-2 buble hover:bg-[#350ad3]"
            onClick={() => setOpenModal(true)}
          >
            Edit Profile
            <MdOutlineEdit className="text-xl" />
          </button>
          <Modal
            openModal={openModal}
            setOpenModal={setOpenModal}
            title="Edit Your Profile"
            width={"680px"}
          >
            <form className="text-white p-5 flex flex-col gap-3" onSubmit={updateProfile}>
              <div
                className="opacity-70 py-2 px-5 w-full border-[1px] border-gray-400 rounded-md"
                style={{ backgroundColor: colorGray }}
              >
                <select
                  name="dept"
                  className="w-full outline-none"
                  style={{ backgroundColor: colorGray }}
                  onChange={(e) => setDept(e.target.value)}
                  required
                >
                  <option value="dept">Choose Department</option>
                  <option value="cse">CSE</option>
                  <option value="eee">EEE</option>
                  <option value="ce">CE</option>
                  <option value="bba">BBA</option>
                  <option value="law">LAW</option>
                </select>
              </div>

              <InputCredit
                type={"number"}
                title="Intake"
                detail={"Enter Your Intake"}
                id="intake"
                state={intake}
                setState={setIntake}
                width={width}
              />
              <InputCredit
                type={"number"}
                title="Section"
                detail={"Enter Your Section"}
                id="section"
                state={section}
                setState={setSection}
                width={width}
              />
              <InputCredit
                type={"number"}
                title="Phone"
                detail={"Enter Your Phone Number"}
                id="phone"
                state={phone}
                setState={setPhone}
                width={width}
              />
              <InputCredit
                type={"text"}
                title="Location"
                detail={"Enter Your Location"}
                id="location"
                state={location}
                setState={setLocation}
                width={width}
              />
              <div className="mt-10 ml-auto">
                <button
                  className="px-10 py-2 rounded-md w-fit font-semibold text-lg buble hover:scale-110 mr-5"
                  style={{ backgroundColor: colorRed }}
                  onClick={() => setOpenModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-10 py-2 rounded-md w-fit font-semibold text-lg buble hover:scale-110"
                  style={{ backgroundColor: colorGreen }}
                >
                  Update
                </button>
              </div>
            </form>
          </Modal>
        </div>
      </div>

      <div className="mt-5">
        <ProfileInfo />
      </div>
    </>
  );
};

export default Profile;
