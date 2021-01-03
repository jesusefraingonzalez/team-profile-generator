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


let employees = [];
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
        choices: ['Intern', 'Engineer', 'Manager', 'Employee']
    }
];
const engineer = [
    {
        type: 'input',
        name: 'github',
        message: 'Please enter your github: '
    }
];
const intern = [
    {
        type: 'input',
        name: 'school',
        message: 'Where do you go to school? '
    }
];
const manager = [
    {
        type: 'input',
        name: 'officeNumber',
        message: 'Please enter your office number: '
    }
];

async function addNewEmployee(arr) {
    let employee;
    const { name, role, email } = await inquirer.prompt(questions);

    switch (role) {
        case 'Engineer':
            const { github } = await inquirer.prompt(engineer);
            employee = new Engineer(name, 10, email, github);
            arr.push(employee);
            console.log(arr);
            break;
        case 'Intern':
            const { school } = await inquirer.prompt(intern)
            employee = new Intern(name, 10, email, school);
            arr.push(employee);
            console.log(arr);
            break;
        case 'Manager':
            const { officeNumber } = await inquirer.prompt(manager)
            employee = new Manager(name, 10, email, officeNumber);
            arr.push(employee);
            console.log(arr);
            break;
        default:
            employee = new Employee(response.name, 10, response.email);
            arr.push(employee);
            console.log(arr);
            break;
    }
}

async function keepAdding() {
    const {response} = await inquirer.prompt([
        {
            type: 'list',
            message: 'Do you wish to keep adding employees?',
            choices: ['Yes', 'No'],
            name: 'response'
        }
    ])

    if (response === 'Yes') return true;
    else return false;
}


const list = []

for (let i = 0; i < 10; i++) {
    list.push(new Employee("name" , 10 , "email"));
}
// addNewEmployee(list);
console.log(list);
const main = render(list);
console.log(main);

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.


