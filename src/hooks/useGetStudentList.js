import { useQuery } from "react-query";
import { serverAddress } from "../components/variables";

const useGetStudentList = () => {
  const url = `${serverAddress}/students`;
  const { data, refetch } = useQuery("studentList", () => fetch(url).then((res) => res.json()));
  return { data, refetch };
};

export default useGetStudentList;
