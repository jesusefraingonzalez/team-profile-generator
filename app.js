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
    },
    {
        type: 'input',
        name: 'github',
        message: 'Please enter your github:',
        when: (answers) => { return answers.role === 'Engineer' }
    },
    {
        type: 'input',
        name: 'school',
        message: 'Where do you go to school?',
        when: (answers) => { return answers.role === 'Intern' }
    },
    {
        type: 'input',
        name: 'officeNumber',
        message: 'Please enter your office number: ',
        when: (answers) => { return answers.role === 'Manager' }
    },
    {
        type: 'confirm',
        name: 'askAgain',
        message: 'Would you like to add another employee?',
        default: false
    }
];

async function addNewEmployee(arr) {
    const { name, role, email, github, officeNumber, school, askAgain } = await inquirer.prompt(questions);

    switch (role) {
        case 'Engineer':
            arr.push(new Engineer(name, 10, email, github));
            break;
        case 'Intern':
            arr.push(new Intern(name, 10, email, school));
            break;
        case 'Manager':
            arr.push(new Manager(name, 10, email, officeNumber));
            break;
    }

    // calls function recursively if the user wishes to ask again
    if (askAgain) {
        addNewEmployee(arr);
    }
    else {
        const html = render(arr);
        fs.writeFile(outputPath, html, 'utf8',
            (err) => {
                if (err) {
                    // create path if it doesn't exist
                    fs.mkdir(OUTPUT_DIR, { recursive: true }, (error) => {
                        if (error) console.log(error);
                    });
                }
                else console.log("\nFile written successfully");
            });
        console.log(arr);
    }
}

const list = [];
addNewEmployee(list);



// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.


