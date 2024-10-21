const inquirer = require('inquirer');

// Function to ask about the CI/CD setup
async function askForSetup() {
    const frameworkQuestions = [
        {
            type: 'list',
            name: 'framework',
            message: 'Which framework do you want to set up CI/CD for?',
            choices: ['Flask', 'Django', 'Spring Boot', 'Node.js'],
        },
        {
            type: 'confirm',
            name: 'docker',
            message: 'Do you want to integrate Docker?',
            default: false,
        },
        {
            type: 'input',
            name: 'projectName',
            message: 'What is the name of your project?',
            validate: (input) => (input ? true : 'Please enter a project name.'),
        },
    ];

    const frameworkAnswers = await inquirer.prompt(frameworkQuestions);
    return frameworkAnswers;
}

// Function to generate CI/CD configuration based on user input
function generateConfig(answers) {
    const { framework, docker, projectName } = answers;
    let config = `# CI/CD Configuration for ${projectName}\n`;
    
    switch (framework) {
        case 'Flask':
            config += 'Using Flask framework.\n';
            break;
        case 'Django':
            config += 'Using Django framework.\n';
            break;
        case 'Spring Boot':
            config += 'Using Spring Boot framework.\n';
            break;
        case 'Node.js':
            config += 'Using Node.js framework.\n';
            break;
    }

    if (docker) {
        config += 'Docker integration is enabled.\n';
    } else {
        config += 'Docker integration is not enabled.\n';
    }

    return config;
}

// Main function to run the CLI tool
async function run() {
    console.log('Welcome to cicd-helper! 🚀');
    const answers = await askForSetup();
    const config = generateConfig(answers);
    console.log('\nGenerated CI/CD Configuration:\n');
    console.log(config);
}

// Execute the main function
run();
