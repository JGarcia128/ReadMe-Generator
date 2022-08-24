// TODO: Include packages needed for this application
const fs = require("fs");
const generateMarkdown = require('./utils/generateMarkdown.js');
const inquirer = require('inquirer');
// TODO: Create an array of questions for user input
const questions = [
    {
        type:'input',
        name: 'githubUsername',
        message: 'What is your Github Username?',
    },
    {
        type: 'input',
        name: 'email',
        message: 'What is your email address?',
    },
    {
        type: 'input',
        name: 'title',
        message: 'What is the title of your project?',
    },
    {
        type: 'input',
        name: 'what',
        message: 'What does your project consist of?',
      },
    {
        type: 'input',
        name: 'installation',
        message: 'Does your project need any installations?',
    },
    {
        type: 'input',
        name: 'how',
        message: 'Please enter a Discription of your project:',
    },
    {
        type: 'input',
        name: 'usage',
        message: 'Write down step-by-step instructions for your project:',
    },
    {
        type: 'list',
        name: 'license',
        message: 'What type of license should your project have?',
        choices: [
            "GNU",
            "ISC",
            "MIT",
            "Open"
        ]
    }, 
    {
        type: 'input',
        name: 'test',
        message: 'what is your project demonstrating?',
    },
];

// TODO: Create a function to initialize app
const writeFile = fileContent => {
    return new Promise((resolve, reject) => {
        fs.writeFile('./utils/README.md', fileContent, err => {
            if (err) {
                reject(err);
                return;
            }

            resolve({
                ok: true,
                message: 'File created!'
            });
        });
    });
};

// function to prompt questions and store user inputs
const init = () => {

    return inquirer.prompt(questions)
    .then(readmeData => {
        return readmeData;
    })
}

// Function call to initialize app
init()
.then(readmeData => {
    console.log(readmeData);
    return generateMarkdown(readmeData);
})
.then(pageMD => {
    return writeFile(pageMD);
})
.then(writeFileResponse => {
    console.log(writeFileResponse.message);
})
.catch(err => {
    console.log(err);
})