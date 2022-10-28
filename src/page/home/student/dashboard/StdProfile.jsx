// library
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
// hooks

// images
import myDp from "../../../../img/dp.jpg";
import cover from "../../../../img/cover.png";
// icons
import { MdOutlineEdit } from "react-icons/md";
// utilities

// class

// components
import Student from "../../../../js/Student";
import InputCredit from "../../../../components/shared/InputCredit";
import Modal from "../../../../components/shared/Modal";
import DpMaker from "../../../../components/shared/DpMaker";
import { colorGray, colorGreen, colorRed } from "../../../../components/styles/colors";
import useGetUser from "../../../../hooks/useGetUser";
import auth from "../../../../firebase.init";

const StdProfile = () => {
  const width = "45%";
  const [userFirebase] = useAuthState(auth);
  const { data: user, refetch: userRefetch } = useGetUser(userFirebase?.email);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    setDept(user?.dept);
    setIntake(user?.intake);
    setSection(user?.section);
    setPhone(user?.phone);
    setLocation(user?.location);
  }, [user, userFirebase, userRefetch]);

  const std = new Student({ email: user?.email, name: user?.displayName });
  const [dept, setDept] = useState(user?.dept);
  const [intake, setIntake] = useState(user?.intake);
  const [section, setSection] = useState(user?.section);
  const [phone, setPhone] = useState(user?.phone);
  const [location, setLocation] = useState(user?.location);

  // updating profile
  const updateProfile = (e) => {
    e.preventDefault();
    std.updateProfileInfo({ dept, intake, section, phone, location });
    userRefetch();
    setOpenModal(false);
  };

  return (
    <>
      <div className="card backdrop-filter-blur bg-opacity-40 relative p-0">
        <div
          className="h-[250px] rounded-t-xl profileCover"
          style={
            {
              // backgroundImage: `url(${cover})`,
              // backgroundSize: "cover",
              // backgroundPosition: "center",
              // backgroundRepeat: "no-repeat",
            }
          }
        ></div>
        <div className="toUp">
          <DpMaker img={myDp} height="180px" name={user?.name} />
        </div>
        <div className="flex justify-between p-5 mt-24">
          <div>
            <h1 className="text-3xl">{user?.name}</h1>
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
    </>
  );
};

export default StdProfile;
