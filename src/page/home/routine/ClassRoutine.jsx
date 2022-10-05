import React from "react";
import RoutineTable from "./RoutineTable";

const ClassRoutine = () => {
  const attribute = [
    "8.30 AM - 10.00 AM",
    "10.00 AM - 11.30 AM",
    "11.30 AM - 1.00 PM",
    "1.20 PM - 2.50 PM",
    "2.50 PM - 4.20 PM",
    "4.20 PM - 5.50 PM",
  ];

  const data = [
    ["Staturday", "", "", "", "", "", ""],
    [
      "Sunday",
      {
        course: "CSE 209",
        faculty: "DMRI",
        building: "1",
        room: "901",
      },
      {
        course: "CSE 322",
        faculty: "MMFR",
        building: "1",
        room: "901",
      },
      "",
      "",
      {
        course: "CSE 323",
        faculty: "MMFR",
        building: "1",
        room: "901",
      },
      {
        course: "CSE 323",
        faculty: "MMFR",
        building: "1",
        room: "901",
      },
    ],
    [
      "Monday",
      "",
      "",
      {
        course: "CSE 209",
        faculty: "DMRI",
        building: "1",
        room: "901",
      },
      {
        course: "CSE 322",
        faculty: "MMFR",
        building: "1",
        room: "901",
      },

      {
        course: "CSE 323",
        faculty: "MMFR",
        building: "1",
        room: "901",
      },
      {
        course: "CSE 323",
        faculty: "MMFR",
        building: "1",
        room: "901",
      },
    ],
    [
      "Tuesday",
      "",

      {
        course: "CSE 209",
        faculty: "DMRI",
        building: "1",
        room: "901",
      },
      {
        course: "CSE 322",
        faculty: "MMFR",
        building: "1",
        room: "901",
      },

      {
        course: "CSE 323",
        faculty: "MMFR",
        building: "1",
        room: "901",
      },
      {
        course: "CSE 323",
        faculty: "MMFR",
        building: "1",
        room: "901",
      },
      "",
    ],
    [
      "Wednessday",
      "",
      "",
      {
        course: "CSE 209",
        faculty: "DMRI",
        building: "1",
        room: "901",
      },
      {
        course: "CSE 322",
        faculty: "MMFR",
        building: "1",
        room: "901",
      },
      {
        course: "CSE 323",
        faculty: "MMFR",
        building: "1",
        room: "901",
      },
      "",
    ],
    ["Thursday", "", "", "", "", "", ""],
    ["Friday", "", "", "", "", "", ""],
  ];

  const tableData = data.map((datam) => rowMaker({ data: datam }));
  return (
    <div>
      <RoutineTable
        attribute={attribute}
        data={tableData}
        title="Class Routine"
        color="#e67e22 "
        full={true}
        day={""}
      />
    </div>
  );
};

const rowMaker = ({ data }) => {
  const newArr = [];
  for (let i = 0; i < data.length; i++) {
    if (i === 0) {
      newArr.push(
        <>
          <p className="uppercase font-semibold">{data[i]}</p>
        </>
      );
    } else {
      const { course, faculty, building, room } = data[i];
      newArr.push(compMaker({ course, faculty, building, room }));
    }
  }
  return newArr;
};

const compMaker = ({ course, faculty, building, room }) => {
  return (
    <div className="flex flex-col gap-1" style={{ display: course ? "block" : "none" }}>
      <p>{course}</p>
      <p>
        FC : <strong>{faculty}</strong>
      </p>
      <p>
        B : <strong>{building}</strong> {"=>"} R : <strong>{room}</strong>
      </p>
    </div>
  );
};

export default ClassRoutine;
