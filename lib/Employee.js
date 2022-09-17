class Employee {
  constructor(name, id, email, role = "Employee") {
    this.name = name;
    this.id = id;
    this.email = email;
    this.role = role;
  }

  // returns the name of the employee
  getName() {
    return this.name;
  }

  // returns the ID
  getId() {
    return this.id;
  }

  // return the email of the employee
  getEmail() {
    return this.email;
  }

  // returns the role of the employee
  getRole() {
    return "Employee";
  }
}

module.exports = Employee;
