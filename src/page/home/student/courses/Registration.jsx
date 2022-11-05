import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import Loader from "../../../../components/shared/loader/Loader";
import { colorGreen, colorPurple, colorRed } from "../../../../components/styles/colors";
import { serverAddress } from "../../../../components/varables";
import auth from "../../../../firebase.init";
import useGetUser from "../../../../hooks/useGetUser";
import Student from "../../../../js/Student";

const Registration = () => {
  const [userFirebase, loading] = useAuthState(auth);
  const { data: std, refetch } = useGetUser(userFirebase?.email);
  const [allCourse, setAllCourse] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState([]);
  const [credit, setCredit] = useState(0);
  const stdUser = new Student({ email: userFirebase?.email });
  const path = useNavigate();

  useEffect(() => {
    document.title = "Course Registration";
    refetch();
    const url = `${serverAddress}/course/${std?.dept}/${std?.intake}`;
    fetch(url)
      .then((res) => res.json())
      .then((res) => setAllCourse(res));

    let countCr = 0;
    selectedCourse.forEach((course) => {
      countCr += course.credit;
    });

    setCredit(countCr);
  }, [refetch, std, selectedCourse]);

  if (loading) {
    return <Loader />;
  }

  const addCourse = (code) => {
    const course = allCourse.filter((cr) => cr.code === code);
    setSelectedCourse((prev) => [...prev, ...course]);
  };
  const removeCourse = (code) => {
    const remaining = selectedCourse.filter((cr) => cr.code !== code);
    setSelectedCourse(remaining);
  };

  return (
    <section className="">
      <div className="card">
        <h2 className="text-xl w-fit font-semibold font-sans uppercase">
          Choose Course to Register!!
        </h2>
        <table className="w-full mt-10">
          <thead className="uppercase text-sm text-gray-400">
            <td className="p-3">Course Title</td>
            <td className="p-3">Course Code</td>
            <td className="p-3">Credit</td>
            <td className="p-3">Type</td>
            <td className="p-3"></td>
          </thead>
          {allCourse.map((course, index) => (
            <Row
              key={index}
              title={course.title}
              code={course.code}
              credit={course.credit}
              type={course.type}
              addCourse={addCourse}
              removeCourse={removeCourse}
            />
          ))}
        </table>
      </div>
      {selectedCourse.length !== 0 && (
        <div className="card mt-5">
          <h2 className="text-xl w-fit font-semibold font-sans uppercase">Selected Course</h2>
          <div className="mt-4 flex justify-between">
            <p>Credit : {credit}</p>
            <p>Course Selected : {selectedCourse.length}</p>
          </div>
          <div className="flex gap-3 mt-10 flex-wrap">
            {selectedCourse.map((course, index) => (
              <CourseBox title={course?.title} code={course?.code} key={index} />
            ))}
          </div>
          <button
            className="btn w-fit rounded-md buble block hover:scale-110 mt-8 ml-auto"
            style={{ background: colorGreen }}
            onClick={() => {
              stdUser.courseRegister(selectedCourse);
              path("/courses");
            }}
          >
            Confrim Registration
          </button>
        </div>
      )}
    </section>
  );
};

const Row = ({ title, code, credit, type, addCourse, removeCourse }) => {
  const [isSelected, setIsSelected] = useState(false);
  return (
    <tr className="w-full border-t">
      <td className="px-3 py-5">{title}</td>
      <td className="px-3 py-5 uppercase">{code}</td>
      <td className="px-3 py-5">{credit}</td>
      <td className="px-3 py-5 capitalize">{type}</td>
      <td className="py-5">
        {isSelected ? (
          <button
            className="btn rounded-md w-fit buble hover:scale-110"
            style={{ background: colorRed }}
            onClick={() => {
              removeCourse(code);
              setIsSelected(false);
            }}
          >
            Remove
          </button>
        ) : (
          <button
            className="btn rounded-md w-fit buble hover:scale-110"
            style={{ background: colorGreen }}
            onClick={() => {
              addCourse(code);
              setIsSelected(true);
            }}
          >
            Add
          </button>
        )}
      </td>
    </tr>
  );
};

const CourseBox = ({ title, code }) => {
  return (
    <div
      className="py-3 px-8 text-center rounded-md flex-grow shadow-lg border-gray-400 border"
      style={{ background: colorPurple }}
    >
      <h3 className="font-mono font-semibold text-xl mb-3">{title}</h3>
      <p className="uppercase">{code}</p>
    </div>
  );
};

export default Registration;
