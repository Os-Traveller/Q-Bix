import { serverAddress } from "../components/variables";
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

  calcGrade(total) {
    if (total < 40) return "F";
    else if (total < 45) return "D-";
    else if (total < 50) return "D";
    else if (total < 55) return "C-";
    else if (total < 60) return "C";
    else if (total < 65) return "B-";
    else if (total < 70) return "B";
    else if (total < 75) return "A-";
    else if (total < 80) return "A";
    else if (total >= 80) return "A+";
  }

  async createUser() {
    const url = `${serverAddress}/create-user`;
    const stdInfo = {
      name: this.name,
      email: this.email,
      role: this.role,
      id: this.id,
    };

    const requestOptions = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(stdInfo),
    };

    const response = await fetch(url, requestOptions).then((res) => res.json());
    return response;
  }

  async updateProfileInfo({ intake, dept, location, phone }) {
    const url = `${serverAddress}/update-profile`;
    console.log(url);
    const requestOptions = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ intake, dept, location, phone, email: this.email }),
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

  collectionCgpaSgpa({ courses }) {
    const sgpa = [];
    const cgpa = [];
    const semesterList = [];
    let point = 0;
    let credit = 0;
    Object.keys(courses).forEach((semester) => {
      let sempoint = 0;
      let semCr = 0;

      courses[semester].forEach((sub) => {
        // for sgpa
        sempoint += sub.credit * sub.gradePoint;
        semCr += sub.credit;
        // for cgpa
        point += sub.credit * sub.gradePoint;
        credit += sub.credit;
      });
      const sg = sempoint / semCr;
      const cg = point / credit;

      semesterList.push(semester);
      sgpa.push(parseFloat(sg.toFixed(2)));
      cgpa.push(parseFloat(cg.toFixed(2)));
    });

    return { semesterList, cgpa, sgpa };
  }
}

export default Student;
