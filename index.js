// Dependecies
const inquirer = require("inquirer");
const fs = require("fs");
// const jest = require("jest");

// link to template
const template = require("./src/template");

// Constructor classes
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

// creates and empty team array
const teamArray = [];

const createManager = () => {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Please give the name of the manager:",
        validate: (managerName) => {
          if (managerName) {
            return true;
          } else {
            console.log("Please give the name of the manager!");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "id",
        message: "Please enter the manager's ID.",
        validate: (nameInput) => {
          if (isNaN(nameInput)) {
            console.log("Please enter the manager's ID!");
            return false;
          } else {
            return true;
          }
        },
      },
      {
        type: "input",
        name: "email",
        message: "Please enter the associated email.",
        validate: (email) => {
          valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
          if (valid) {
            return true;
          } else {
            console.log("Please enter an email!");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "officeNumber",
        message: "Please enter the manager's office number",
        validate: (nameInput) => {
          if (isNaN(nameInput)) {
            console.log("Please enter an office number!");
            return false;
          } else {
            return true;
          }
        },
      },
    ])
    .then((managerInput) => {
      const { name, id, email, officeNumber } = managerInput;
      const manager = new Manager(name, id, email, officeNumber);

      teamArray.push(manager);
      console.log(manager);
    });
};

const createEmployee = () => {
  console.log(`
  ===========================================
  Create a list of new and existing employees
  ===========================================
  `);

  return inquirer
    .prompt([
      {
        type: "list",
        name: "role",
        message: "Please choose one of the following:",
        choices: ["Engineer", "Intern"],
      },
      {
        type: "input",
        name: "name",
        message: "What is the name of the employee?",
        validate: (nameValidate) => {
          if (nameValidate) {
            return true;
          } else {
            console.log('Please enter an employee"s name to proceed.');
            return false;
          }
        },
      },
      {
        type: "input",
        name: "id",
        message: "Please enter the employee ID:",
        validate: (idValidate) => {
          if (isNaN(idValidate)) {
            console.log("Please give valid ID:");
          } else {
            return true;
          }
        },
      },
      {
        type: "input",
        name: "email",
        message: "Please enter the manager's email.",
        validate: (email) => {
          valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
          if (valid) {
            return true;
          } else {
            console.log("Please enter an email!");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "github",
        message:
          "Does this employee have a github account? Github 404 will prompt if there is none.",
        when: (input) => input.role === "Engineer",
        validate: (githubValidate) => {
          if (githubValidate) {
            return true;
          } else {
            console.log(
              "Please use the github account associated with this employee."
            );
          }
        },
      },
      {
        type: "input",
        name: "school",
        message: "Does this employee go to school?",
        when: (input) => input.role === "Intern",
        validate: (schoolValidate) => {
          if (schoolValidate) {
            return true;
          } else {
            console.log("Please enter in the school this intern is at.");
          }
        },
      },
      {
        type: "confirm",
        name: "confirmEmployee",
        message: "Would you like to add more team members?",
        default: false,
      },
    ])
    .then((employeeData) => {
      let { name, id, email, role, github, school, confirmEmployee } =
        employeeData;
      let employees;

      if (role === "Engineer") {
        employees = new Engineer(name, id, email, github);

        console.log(employees);
      } else if (role === "Intern") {
        employees = new Intern(name, id, email, school);

        console.log(employees);
      }

      teamArray.push(employees);

      if (confirmEmployee) {
        return createEmployee(teamArray);
      } else {
        return teamArray;
      }
    });
};

// write file to system
const writeFile = (data) => {
  fs.writeFile("./dist/index.html", data, (err) => {
    // throws error
    if (err) {
      console.log(err);
      return;
    } else {
      // run when file is written
      console.log("Profiles create successfully.");
    }
  });
};

createManager()
  .then(createEmployee)
  .then((teamArray) => {
    return template(teamArray);
  })
  .then((pages) => {
    return writeFile(pages);
  })
  .catch((err) => {
    console.log(err);
  });
