import { serverAddress } from "../components/varables";
import User from "./user";
import useGetUser from "../hooks/useGetUser";

class Student extends User {
  dept;
  intake;
  section;
  result = [];
  constructor({ name, email, id, role }) {
    super({ name, email, role, id });
  }
  updateProfileInfo({ intake, dept, section, location, phone }) {
    const url = `${serverAddress}/update-profile`;
    console.log(url);
    const requestOptions = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ intake, dept, section, location, phone, email: this.email }),
    };
    const res = fetch(url, requestOptions).then((res) => res.json());
  }
}

export default Student;
