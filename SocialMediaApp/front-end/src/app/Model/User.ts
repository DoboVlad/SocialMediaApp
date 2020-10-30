export class User{
  email: String;
  password: String;
  firstName: String;
  lastName: String;
  token: string;
  constructor(email?, password?, firstName?, lastName?) {
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
  }
}
