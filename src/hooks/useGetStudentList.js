import { useQuery } from "react-query";

const useGetStudentList = () => {
  const url = "http://localhost:5000/students";
  const { data, refetch } = useQuery("studentList", () => fetch(url).then((res) => res.json()));
  return { data, refetch };
};

export default useGetStudentList;
