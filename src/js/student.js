import { serverAddress } from "../components/variables";

class Student {
  email;
  constructor({ email }) {
    this.email = email;
  }

  async createUser({ email, id, pin }) {
    const url = `${serverAddress}/create-user`; // api link
    const stdInfo = {
      email,
      id,
      pin,
      role: "student",
    };

    const requestOptions = {
      method: "POST", // post requset
      headers: { "content-type": "application/json" },
      body: JSON.stringify(stdInfo),
    };

    const response = await fetch(url, requestOptions).then((res) => res.json()); // fetch is used to communicate with server
    return response;
  }

  async updateProfileInfo({ location, phone }) {
    const url = `${serverAddress}/update-profile`;
    console.log(url);
    const requestOptions = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ location, phone, email: this.email }),
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
