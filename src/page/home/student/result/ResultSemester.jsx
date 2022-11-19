import React, { useEffect } from "react";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { serverAddress } from "../../../../components/variables";
import auth from "../../../../firebase.init";
import CourseTable from "../courses/CourseTable";

const ResultSemester = () => {
  const [userFirebase] = useAuthState(auth);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const url = `${serverAddress}/current-course/${userFirebase?.email}`;
    fetch(url)
      .then((res) => res.json())
      .then((res) => setCourses(res));
  }, [userFirebase]);

  return (
    <>
      {courses.length !== 0 && (
        <CourseTable courses={courses.subjects} semester={courses.semester} />
      )}
    </>
  );
};

export default ResultSemester;
