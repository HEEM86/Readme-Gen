const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
  return inquirer.prompt([
    {
        type: "input",
        message: "What's the name of your Project",
        name: "title"

    },
    {
        type: "input",
        message: "Please enter a description of your project.",
        name: "description"

    },
    {
        type: "input",
        message: "Who contributed on this project?",
        name: "contribution"

    },
    {
        type: "input",
        message: "What are the installation instructions for this project. Write NONE if no instructions",
        name: "installation"

    },
    {
        type: "input",
        message: "How would you like your application to be used?",
        name: "usage"

    },
    
    {
        type: "list",
        message: "Please select a license.",
        choices: [
            "Apache",
            "MIT",
            "ISC",
            "GNU GPLv3"
        ],
        name: "license"
        
        
    },
    {
        type: "input",
        message: "Who contributed on this project?",
        name: "contribution"

    },
    {
        type: "input",
        message: "What is your GitHub username?",
        name: "username"

    },
    {
        type: "input",
        message: "What is your email address?",
        name: "email"

    }
  ]);
}

function generateMarkdown(response) {
    return `
    # ${response.title}

    #Table of Contents

    - [Description](#description)
    - [Installation](#installation)
    - [Usage](#usage)
    - [Contributing](#contributing)
    - [Test](#test)
    - [Credits](#credits)
    - [License](#license)
    - [Questions](#questions)

    ## Description:
    ![License](https://img.shields.io/badge/License-${response.license}-blue.svy "License Badge")

        ${response.description}
    ## Installation:
        ${response.installation}
    ##  Usage:
        ${response.usage}
    ## Contributing:
        ${response.contribution}
    ## Test:
        ${response.test}
    ## Credits:
        ${response.credits}
    ## License:

        For additional information regarding the License, click the link below.

    - [License](https://img.shields.io/badge/License-${response.license}-blue.svy "License Badge")   
`;
}



async function init() {
    try {
        const response = await promptUser();
         const readMe = generateMarkdown(response);

        await writeFileAsync("README.md", readMe);
        console.log("Successfuly created Readme!");
    
    } catch (err) {
        console.log(err);


    }
}
init();








