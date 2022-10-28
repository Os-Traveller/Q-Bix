import { serverAddress } from "../components/varables";

class User {
  //  variables
  name;
  email;
  id;
  role;
  phone;
  location;
  // constuctor
  constructor({ name, email, role, imgUrl, id }) {
    this.name = name;
    this.email = email;
    this.role = role;
    this.imgUrl = imgUrl;
    this.id = id;
  }
  // crete user in DB
  createUser() {
    const url = `${serverAddress}/create-user`;
    console.log(url);
    const requestOptions = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name: this.name, email: this.email, role: this.role, id: this.id }),
    };
    const res = fetch(url, requestOptions).then((res) => res.json());
    return res;
  }
  // getting userInfo from DB
}

export default User;
