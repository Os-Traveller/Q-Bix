import { serverAddress } from "../components/varables";
import User from "./User";

class Student extends User {
  dept;
  intake;
  section;
  result = [];
  constructor({ name, email, id, role, intake, dept, section }) {
    super({ name, email, role, id });
    this.intake = intake;
    this.dept = dept;
    this.section = section;
  }

  updateProfileInfo({ intake, dept, section, location, phone }) {
    const url = `${serverAddress}/update-profile`;
    console.log(url);
    const requestOptions = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ intake, dept, section, location, phone, email: this.email }),
    };
    fetch(url, requestOptions).then((res) => res.json());
  }

  async courseRegister(courseList) {
    const url = `${serverAddress}/registration/${this.email}`;
    const requestOptions = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(courseList),
    };
    const response = await fetch(url, requestOptions);
    console.log(response);
    return response;
  }

  async registerdYet() {
    const url = `${serverAddress}/registered/${this.email}`;
    const regStatus = await fetch(url).then((res) => res.json());
    console.log(regStatus);
  }
}

export default Student;
