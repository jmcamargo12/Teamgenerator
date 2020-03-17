const fs = require("fs");
const inquirer = require("inquirer");

const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const path = require("path");

const render = require("./lib/htmlRenderer");

let teamList = [];

const managerQuestions = [
  {
    type: "input",
    name: "name",
    message: "What is your manager name?"
  },
  {
    type: "input",
    name: "id",
    message: "What is your manager id?"
  },
  {
    type: "input",
    name: "email",
    message: "What is your manager email?"
  },
  {
    type: "input",
    name: "officeNumber",
    message: "What is the manager office number?"
  }
];
const engineerQuestions = [
  {
    type: "input",
    name: "name",
    message: "What is your engineer name?"
  },
  {
    type: "input",
    name: "id",
    message: "What is your engineer id?"
  },
  {
    type: "input",
    name: "email",
    message: "What is your engineer email?"
  },
  {
    type: "input",
    name: "officeNumber",
    message: "What is the engineer GIT HUB username?"
  }
];
const internQuestions = [
  {
    type: "input",
    name: "name",
    message: "What is your intern name?"
  },
  {
    type: "input",
    name: "id",
    message: "What is your intern id?"
  },
  {
    type: "input",
    name: "email",
    message: "What is your intern email?"
  },
  {
    type: "input",
    name: "officeNumber",
    message: "What school does your intern attend?"
  }
];

const menu = [
  {
    type: "list",
    name: "choices",
    message: "Choose a team member to add",
    choices: ["Engineer", "Intern", "Continue"]
  }
];

inquirer.prompt(managerQuestions).then(data => {
  let managerObject = new Manager(
    data.name,
    data.id,
    data.email,
    data.officeNumber
  );
  teamList.push(managerObject);
  teamMenu();
});

function teamMenu() {
  inquirer.prompt(menu).then(data => {
    switch (data.choices) {
      case "Engineer":
        inquirer.prompt(engineerQuestions).then(data => {
          let engineerObject = new Engineer(
            data.name,
            data.id,
            data.email,
            data.github
          );
          teamList.push(engineerObject);
          teamMenu();
        });
        break;
      case "Intern":
        inquirer.prompt(internQuestions).then(data => {
          let internObject = new Intern(
            data.name,
            data.id,
            data.email,
            data.school
          );
          teamList.push(internObject);
          teamMenu();
        });

        break;
      case "Continue":
        let htmlTransfer = render(teamList);
        fs.writeFile("./output/team.html", htmlTransfer, err => {
          if (err) {
            throw err;
          }
          console.log("success!");
        });
        break;
    }
  });
}
