import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { colorGray } from "../../../../components/styles/colors";
import { serverAddress } from "../../../../components/variables";

const UpdateResult = () => {
  const [allInfo, setAllInfo] = useState({});
  const [deptInfo, setDeptInfo] = useState({});
  const [selectedDept, setSelectedDept] = useState("");
  const [selectedIntake, setSelectedIntake] = useState("");
  const [allStudents, setAllStudenst] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [subjects, setSubjects] = useState([]);

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

  return (
    <section>
      <div className="card">
        <h2 className="text-xl text-center font-semibold font-mono">Update Result</h2>
        <div className="mt-10">
          <form className="">
            <div className="flex gap-5">
              <Options
                title="Department"
                name="dept"
                values={Object.keys(deptInfo)}
                setState={setSelectedDept}
              />

              <Options
                title="Intake"
                name="inatke"
                values={selectedDept ? Object.keys(deptInfo[selectedDept]?.intake) : []}
                setState={setSelectedIntake}
              />
              <Options
                title="ID"
                name="id"
                values={selectedIntake ? allStudents : []}
                setState={setSelectedId}
              />
            </div>
            {subjects.length !== 0 && (
              <div className="mt-10 card flex flex-col gap-3">
                <div className="grid grid-cols-4 gap-5 mb-3 border-b-[1px] border-gray-400 pb-3">
                  <p className="font-semibold text-gray-400">Course</p>
                  <p className="font-semibold text-center text-gray-400">Mid</p>
                  <p className="font-semibold text-center text-gray-400">Out of 30</p>
                  <p className="font-semibold text-center text-gray-400">Final</p>
                </div>
                {subjects?.map((subject, index) => (
                  <TableOFResult
                    data={subject}
                    key={index}
                    allData={subjects}
                    setAllData={setSubjects}
                  />
                ))}
                <button className="buble btnPay w-fit px-5 py-3 rounded-lg mx-auto mt-5 font-semibold">
                  Update Result
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

const Options = ({ title, name, values, setState }) => {
  return (
    <div className="w-full">
      <h1 className="font-semibold mb-2">{title}</h1>
      <div
        className="opacity-70 py-2 px-5 w-full border-[1px] border-gray-400 rounded-md"
        style={{ backgroundColor: colorGray }}
      >
        {/* <SiSuperuser /> */}
        <select
          name={name}
          className="w-full outline-none"
          style={{ backgroundColor: colorGray }}
          onChange={(e) => setState(e.target.value)}
          required
        >
          <option value={null}>Choose {title}</option>
          {values?.map((value, index) => (
            <option key={index} className="uppercase" value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

const TableOFResult = ({ data, allData, setAllData }) => {
  const { code, title, mid, out30, final } = data;
  const className = `opacity-70 py-2 px-5 w-full border-[1px] border-gray-400 rounded-md`;

  const [midSt, setMidSt] = useState(mid);
  const [out30St, setOut30St] = useState(out30);
  const [finalSt, setFinalSt] = useState(final);

  console.log(data);
  useEffect(() => {}, []);

  return (
    <div className="grid grid-cols-4 gap-5">
      <div>
        <h1 className="font-semibold">{title.length > 25 ? title?.slice(0, 30) + "..." : title}</h1>
        <p className="text-sm text-gray-400 mt-1">{code}</p>
      </div>
      <input
        className={className}
        style={{ backgroundColor: colorGray }}
        type="number"
        value={midSt}
        onChange={(e) => setMidSt(e.target.value)}
      />
      <input
        className={className}
        style={{ backgroundColor: colorGray }}
        type="number"
        value={out30St}
        onChange={(e) => setOut30St(e.target.value)}
      />
      <input
        className={className}
        style={{ backgroundColor: colorGray }}
        type="number"
        value={finalSt}
        onChange={(e) => setFinalSt(e.target.value)}
      />
    </div>
  );
};

export default UpdateResult;
