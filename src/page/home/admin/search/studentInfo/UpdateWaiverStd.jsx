import React from "react";
import { toast } from "react-toastify";
import Input from "../../../../../components/shared/Input";
import { colorGreen, colorPupmkin } from "../../../../../components/styles/colors";
import Admin from "../../../../../js/admin";
import { toastConfig } from "../../../../../toastConfig";

export const UpdateWaiverStd = ({ id, closeModal }) => {
  const btnClass = `btn rounded-lg w-fit buble hover:scale-110`;
  const admin = new Admin();

  // update waiver manually
  const handleWaiverManually = async (e) => {
    e.preventDefault();
    const waiver = e.target.elements.waiver.value;
    if (waiver >= 0 && waiver <= 100) {
      const res = await admin.updateWaiverStdManually({ id, persentage: waiver });
      if (res.response) {
        toast("Waiver Updated", toastConfig);
        closeModal();
      } else {
        toast.error("Something Went Wrong", toastConfig);
      }
    } else {
      e.target.elements.waiver.value = "";
    }
  };
  // update waiver based on cgpa
  const hadnleWaiverOnCgpa = async () => {
    const res = await admin.updaWaiverOnCgpa(id);
    if (res.response) {
      toast("Waiver Updated", toastConfig);
      closeModal();
    } else {
      toast.error("Something Went Wrong", toastConfig);
    }
  };

  return (
    <section className="text-white p-5">
      <div>
        <form onSubmit={handleWaiverManually}>
          <Input title="Waiver" type="number" placeholder="How Much Waiver" name="waiver" />
          {/* buttons */}
          <div className="flex gap-5 w-fit ml-auto">
            <p
              className={`${btnClass} mt-5`}
              style={{ backgroundColor: colorPupmkin }}
              onClick={hadnleWaiverOnCgpa}
            >
              Update Based On CGPA
            </p>
            <button className={`${btnClass} mt-5`} style={{ backgroundColor: colorGreen }}>
              Update Waiver
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
