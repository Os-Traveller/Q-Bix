import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { serverAddress } from "../../../../components/variables";
import auth from "../../../../firebase.init";
import CourseTable from "../courses/CourseTable";

const ResultAll = () => {
  const [userFirebase] = useAuthState(auth);
  const [allCourse, setAllCourse] = useState({});

  useEffect(() => {
    const url = `${serverAddress}/all-course/${userFirebase?.email}`;
    fetch(url)
      .then((res) => res.json())
      .then((res) => setAllCourse(res));
  }, [setAllCourse, userFirebase]);

  return (
    <section>
      <div className="flex flex-col gap-5">
        {Object.keys(allCourse).length !== 0 &&
          Object.keys(allCourse).map((semester, index) => (
            <CourseTable key={index} courses={allCourse?.[semester]} semester={semester} />
          ))}
      </div>

      {Object.keys(allCourse).length === 0 && (
        <h1 className="card w-fit text-xl font-semibold mx-auto">No Course Found</h1>
      )}
    </section>
  );
};

export default ResultAll;
