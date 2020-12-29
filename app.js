const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Employee = require("./lib/Employee");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const questions = [
    {
        type: 'input',
        name: 'name',
        message: 'Please enter your name: '
    },
    {
        type: 'input',
        name: 'email',
        message: 'Please enter your email: '
    },
    {
        type: 'list',
        name: 'role',
        message: 'What is your role?',
        choices: ['Intern', 'Engineer', 'Manager']
    }
]
const engineer = [
    {
        type: 'input',
        name: 'github',
        message: 'Please enter your github: '
    }
]

const intern = [
    {
        type: 'input',
        name: 'school',
        message: 'Where do you go to school? '
    }
]

const manager = [
    {
        type: 'input',
        name: 'officeNumber',
        message: 'Please enter your office number: '
    }
]


inquirer.prompt(questions)
    .then(response => {
        let employee = new Employee;
        switch (response.role) {
            case 'Engineer':
                inquirer.prompt(engineer)
                    .then(roleResponse => {
                        employee = new Engineer(response.name, 10, response.email, roleResponse.github);
                        console.log(employee);
                    });
                break;
            case 'Intern':
                inquirer.prompt(intern)
                    .then(roleResponse => {
                        employee = new Intern(response.name, 10, response.email, roleResponse.school);
                        console.log(employee);
                    });;
                break;
            case 'Manager':
                inquirer.prompt(manager)
                    .then(roleResponse => {
                        employee = new Manager(response.name, 10, response.email, roleResponse.officeNumber);
                        console.log(employee);
                    });
                break;
            default:
                break;
        }
    });




// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.


