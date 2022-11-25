import React from "react";
import { useState } from "react";
import Modal from "../../../../components/shared/Modal";
import { toast } from "react-toastify";
import { toastConfig } from "../../../../toastConfig";

import {
  colorBlue,
  colorGreen,
  colorPupmkin,
  colorPurple,
} from "../../../../components/styles/colors";
import Admin from "../../../../js/admin";

const ControlCenter = () => {
  const styleClass = `px-5 py-3 rounded-lg w-fit font-semibold buble hover:scale-110`;
  const admin = new Admin();

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
        <button className={styleClass} style={{ backgroundColor: colorPurple }}>
          Admission
        </button>
      </div>
    </section>
  );
};

export default ControlCenter;
