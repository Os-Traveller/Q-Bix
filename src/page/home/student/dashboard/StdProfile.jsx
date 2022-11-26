import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { MdOutlineEdit } from "react-icons/md";
import Student from "../../../../js/student";
import InputCredit from "../../../../components/shared/InputCredit";
import Modal from "../../../../components/shared/Modal";
import DpMaker from "../../../../components/shared/DpMaker";
import { colorGreen, colorRed } from "../../../../components/styles/colors";
import useGetUser from "../../../../hooks/useGetUser";
import auth from "../../../../firebase.init";
import coverPhoto from "../../../../img/bgAuth.png";
import { bgImg } from "../../../../components/styles/styles";

const StdProfile = () => {
  const width = "45%";
  const [userFirebase] = useAuthState(auth);
  const { data: user, refetch: userRefetch } = useGetUser(userFirebase?.email);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    setPhone(user?.phone);
    setLocation(user?.location);
  }, [user, userFirebase, userRefetch]);

  const std = new Student({ email: user?.email, name: user?.displayName });

  const [phone, setPhone] = useState(user?.phone);
  const [location, setLocation] = useState(user?.location);

  // updating profile
  const updateProfile = (e) => {
    e.preventDefault();
    std.updateProfileInfo({ phone, location });
    userRefetch();
    setOpenModal(false);
  };

  return (
    <>
      <div className="card backdrop-filter-blur bg-opacity-40 relative p-0">
        <div className="h-[350px] rounded-t-xl" style={bgImg(coverPhoto)}></div>
        <div className="toUp">
          <DpMaker height="140px" fontSize={"90px"} color={"#654DEE"} name={user?.name} />
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
              <InputCredit
                title="Department"
                detail="Your Department"
                width={width}
                readOnly
                state={(user?.dept || "").toUpperCase()}
              />
              <InputCredit
                title="Intake"
                detail={"Your Intake"}
                state={user?.intake}
                width={width}
                readOnly
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
