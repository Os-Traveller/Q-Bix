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
}

export default User;
