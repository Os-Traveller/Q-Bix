class User {
  constructor({ name, email, role, imgUrl }) {
    this.name = name;
    this.email = email;
    this.role = role;
    this.imgUrl = imgUrl;
  }
  displayAll() {
    console.log(this.name, this.role);
  }
}

export default User;
