import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Option from "../../../../components/shared/option/Option";
import Searchbox from "../search/Searchbox";
import { colorGray, colorGreen } from "../../../../components/styles/colors";
import { serverAddress } from "../../../../components/variables";
import Admin from "../../../../js/admin";

const UpdateResult = () => {
  const [allInfo, setAllInfo] = useState({});
  const [deptInfo, setDeptInfo] = useState({});
  const [selectedDept, setSelectedDept] = useState("");
  const [selectedIntake, setSelectedIntake] = useState("");
  const [allStudents, setAllStudenst] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [subjects, setSubjects] = useState([]);
  const path = useNavigate();

  useEffect(() => {
    const url = `${serverAddress}/get-all-students-info`;
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        setAllInfo(res);
        setDeptInfo(res.dept);
      });
  }, [setDeptInfo]);

  useEffect(() => {
    const std = allInfo?.students?.filter((stdudent) => stdudent.intake === selectedIntake);
    const id = [];
    std?.forEach((st) => id.push(st.id));
    setAllStudenst(id);
  }, [selectedIntake, setAllStudenst, allInfo]);

  useEffect(() => {
    const url = `${serverAddress}/find-student-result/${selectedId}`;
    fetch(url)
      .then((res) => res.json())
      .then((res) => setSubjects(res));
  }, [selectedId]);

  const hanldeUpdateAllRes = async (e) => {
    e.preventDefault();
    const admin = new Admin();
    const response = await admin.updateResultOnServer({ id: selectedId, subjects });
    if (response) path("/");
  };

  return (
    <section>
      <Searchbox />
      <div className="card mt-5">
        <h2 className="text-xl text-center font-semibold font-mono">Update Result</h2>
        <div className="mt-10">
          <form onSubmit={hanldeUpdateAllRes}>
            <div className="flex gap-5">
              <Option
                title="Department"
                name="dept"
                values={Object.keys(deptInfo)}
                setState={setSelectedDept}
              />

              <Option
                title="Intake"
                name="inatke"
                values={selectedDept ? Object.keys(deptInfo?.[selectedDept]?.intake) : []}
                setState={setSelectedIntake}
              />
              <Option
                title="ID"
                name="id"
                values={selectedIntake ? allStudents : []}
                setState={setSelectedId}
              />
            </div>
            {subjects.length !== 0 && (
              <>
                <div className="mt-10 card flex flex-col gap-3">
                  <div className="grid grid-cols-5 gap-5 mb-3 border-b-[1px] border-gray-400 pb-3">
                    <p className="font-semibold text-gray-400">Course</p>
                    <p className="font-semibold text-center text-gray-400">Mid</p>
                    <p className="font-semibold text-center text-gray-400">Out of 30</p>
                    <p className="font-semibold text-center text-gray-400">Final</p>
                    <p className="font-semibold text-center text-gray-400">Action</p>
                  </div>
                  {subjects?.map((subject, index) => (
                    <TableOFResult
                      data={subject}
                      key={index}
                      allData={subjects}
                      setAllData={setSubjects}
                    />
                  ))}
                </div>
                <button className="buble block btnPay w-fit px-5 py-3 rounded-lg mx-auto mt-5 font-semibold">
                  Update Result
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

const TableOFResult = ({ data, allData, setAllData }) => {
  const { code, title, mid, out30, final } = data;
  const className = `opacity-70 py-2 px-5 w-full border-[1px] border-gray-400 rounded-md`;

  const [update, setUpdate] = useState(false);
  const midRef = useRef();
  const out30Ref = useRef();
  const finalRef = useRef();

  const handleUpdate = () => {
    const admin = new Admin();
    const updateStatus = admin.updateOneResult({
      allSub: allData,
      setAllSub: setAllData,
      code,
      midRef,
      out30Ref,
      finalRef,
    });
    if (updateStatus) {
      setUpdate(true);
    }
  };

  return (
    <div className="grid grid-cols-5 gap-5">
      <div>
        <h1 className="font-semibold">{title.length > 25 ? title?.slice(0, 25) + "..." : title}</h1>
        <p className="text-sm text-gray-400 mt-1">{code}</p>
      </div>
      <input
        className={className}
        style={{ backgroundColor: colorGray }}
        type="number"
        placeholder={mid}
        ref={midRef}
        step="0.5"
      />
      <input
        className={className}
        style={{ backgroundColor: colorGray }}
        type="number"
        placeholder={out30}
        ref={out30Ref}
        step="0.5"
      />
      <input
        className={className}
        style={{ backgroundColor: colorGray }}
        type="number"
        placeholder={final}
        ref={finalRef}
        step="0.5"
      />
      <p
        className="centerXY px-5 py-2 w-fit mx-auto rounded-lg buble hover:scale-110 font-semibold"
        style={{
          backgroundColor: !update ? colorGreen : colorGray,
          cursor: update ? "not-allowed" : "pointer",
        }}
      >
        {!update && <span onClick={handleUpdate}>Update</span>}
        {update && <span>Updated</span>}
      </p>
    </div>
  );
};

export default UpdateResult;
