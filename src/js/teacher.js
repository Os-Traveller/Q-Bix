import { serverAddress } from "../components/variables";
import User from "./user";

class Teacher extends User {
  subjects = [];
  constructor({ name, email, role, id }) {
    super({ name, email, role, id });
  }

  async createUser() {
    const url = `${serverAddress}/create-user`;
    // making an object of all info on a student
    const teacherInfo = {
      name: this.name,
      email: this.email,
      role: this.role,
      id: this.id,
    };

    const requestOptions = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(teacherInfo),
    };

    const response = await fetch(url, requestOptions).then((res) => res.json());
    return response;
  }
}

export default Teacher;
