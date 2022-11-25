import React from "react";
import { useState } from "react";
import Modal from "../../../../components/shared/Modal";
import { toast } from "react-toastify";
import { toastConfig } from "../../../../toastConfig";

import {
  colorBlue,
  colorGreen,
  colorInput,
  colorPupmkin,
  colorPurple,
} from "../../../../components/styles/colors";

import Admin from "../../../../js/admin";
import Input from "../../../../components/shared/Input";

const ControlCenter = () => {
  const styleClass = `px-5 py-3 rounded-lg w-fit font-semibold buble hover:scale-110`;
  const admin = new Admin();
  const [addmissionModal, setAdmissionModal] = useState(false);

  const updateCgpa = async () => {
    const res = await admin.updateCgpaAll();
    if (res) {
      toast("Updated!", toastConfig);
    } else {
      toast("Something Went Wrong", toastConfig);
    }
  };

  const updateWaiver = async () => {
    const res = await admin.updaWaiverAll();
    if (res) {
      toast("Updated", toastConfig);
    }
  };

  return (
    <section className="card w-fit mx-auto">
      <h1 className="text-2xl font-semibold text-center font-sans">Control Center</h1>
      <div className="flex gap-5 justify-center mt-8">
        <button
          className={styleClass}
          style={{ backgroundColor: colorPupmkin }}
          onClick={updateCgpa}
        >
          Update CGPA
        </button>
        <button
          className={styleClass}
          style={{ backgroundColor: colorGreen }}
          onClick={updateWaiver}
        >
          Update Waiver
        </button>
        <button className={styleClass} style={{ backgroundColor: colorBlue }}>
          New Semester
        </button>
        <button
          className={styleClass}
          style={{ backgroundColor: colorPurple }}
          onClick={() => setAdmissionModal(true)}
        >
          Admission
        </button>
        <Modal
          openModal={addmissionModal}
          setOpenModal={setAdmissionModal}
          title={"Admission"}
          width={"700px"}
        >
          <Admission />
        </Modal>
      </div>
    </section>
  );
};

const Admission = () => {
  const handelAdmission = (e) => {
    e.preventDefault();
  };
  return (
    <div className="text-white p-5">
      <form onSubmit={handelAdmission}>
        <div className="flex flex-col gap-5">
          <Input id={"name"} title="Student's Name" placeholder={"First Name and Last Name"} />
          <div>
            <h1 className="font-semibold mb-2">Chose Payment Type</h1>
            <div
              className="opacity-70 py-2 px-5 w-full border-[1px] border-gray-400 rounded-md"
              style={{ backgroundColor: colorInput }}
            >
              {/* <SiSuperuser /> */}
              <select
                name="paymentType"
                className="w-full outline-none"
                style={{ backgroundColor: colorInput }}
                required
              >
                <option value="tuition">Tuition Fee</option>
                <option value="admission">Admission Fee</option>
                <option value="other">Other Fee</option>
              </select>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ControlCenter;
