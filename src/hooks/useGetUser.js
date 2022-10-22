import { useQuery } from "react-query";
import { serverAddress } from "../components/varables";

const useGetUser = (email) => {
  const url = `${serverAddress}/user/${email}`;
  const { data, refetch } = useQuery(`user_${email}`, () => fetch(url).then((res) => res.json()));
  return { data, refetch };
};

export default useGetUser;
