import { serverAddress } from "../components/varables";
import User from "./user";

class Student extends User {
  dept;
  intake;
  section;
  registerd;
  result = [];

  constructor({ name, email, id, role, intake, dept, section }) {
    super({ name, email, role, id });
    this.intake = intake;
    this.dept = dept;
    this.section = section;
  }

  async createUser() {
    const url = `${serverAddress}/create-user`;
    // making an object of all info on a student
    const stdInfo = {
      name: this.name,
      email: this.email,
      role: this.role,
      id: this.id,
      dept: this.dept,
      intake: this.intake,
      section: this.section,
      registerd: this.registerd,
      result: this.result,
    };

    const requestOptions = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(stdInfo),
    };

    const response = await fetch(url, requestOptions).then((res) => res.json());
    return response;
  }

  async updateProfileInfo({ intake, dept, section, location, phone }) {
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
    console.log(url);
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
    return regStatus;
  }

  async getCurrentCourse() {
    const url = `${serverAddress}/current-course/${this.email}`;
    const currentCourse = await fetch(url).then((res) => res.json());
    return currentCourse;
  }

  async payFees(feesInfo) {
    const url = `${serverAddress}/pay-fees/${this.email}`;
    const requestOptions = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(feesInfo),
    };
    const response = await fetch(url, requestOptions);
    return response;
  }

  getDate() {
    const date = new Date();
    const day = date.toLocaleDateString("en-US", { weekday: "long" });
    const month = date.toLocaleDateString("en-US", { month: "long" });
    const year = date.getFullYear();

    console.log(day, month, year, date.getDate());
  }
}

export default Student;
