import { useQuery } from "react-query";
import { serverAddress } from "../components/variables";

const useGetTeacherList = () => {
  const url = `${serverAddress}/teachers`;
  const { data, refetch } = useQuery("teacherList", () => fetch(url).then((res) => res.json()));
  return { data, refetch };
};

export default useGetTeacherList;
