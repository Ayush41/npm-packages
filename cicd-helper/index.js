#!/usr/bin/env node
const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');

async function getUserInput() {
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'ciService',
      message: 'Which CI/CD service do you want to use?',
      choices: ['GitHub Actions', 'Travis CI', 'CircleCI']
    },
    {
      type: 'list',
      name: 'projectType',
      message: 'What type of project are you working on?',
      choices: ['Node.js', 'React', 'Docker']
    },
    {
      type: 'input',
      name: 'branch',
      message: 'Which branch do you want to trigger CI/CD on?',
      default: 'main'
    }
  ]);

  return answers;
}

function generateCICDConfig(ciService, projectType, branch) {
//   const templateDir = path.join(__dirname, ../templates/${ciService.toLowerCase().replace(' ', '-')});
  const templateDir = path.join(__dirname, `../templates/${ciService.toLowerCase().replace(' ', '-')}`);

  
  let templateFile;
  switch (projectType) {
    case 'Node.js':
      templateFile = 'nodejs.yml';
      break;
    case 'React':
      templateFile = 'react.yml';
      break;
    case 'Docker':
      templateFile = 'docker.yml';
      break;
  }

  const templatePath = path.join(templateDir, templateFile);
//   const targetPath = path.join(process.cwd(), .github/workflows/${templateFile});
  const targetPath = path.join(process.cwd(), `.github/workflows/${templateFile}`);

  
  let templateContent = fs.readFileSync(templatePath, 'utf8');
  templateContent = templateContent.replace(/\$BRANCH/g, branch);

  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  fs.writeFileSync(targetPath, templateContent);
//   console.log(✅ CI/CD configuration for ${ciService} (${projectType}) created successfully!);
  console.log(`✅ CI/CD configuration for ${ciService} (${projectType}) created successfully!`);

}
async function main() {
  const { ciService, projectType, branch } = await getUserInput();
  generateCICDConfig(ciService, projectType, branch);
}

main();



// #!/usr/bin/env node

// const inquirer = require('inquirer');
// const fs = require('fs');

// // Function to ask about the CI/CD setup
// async function askForSetup() {
//     const frameworkQuestions = [
//         {
//             type: 'list',
//             name: 'framework',
//             message: 'Which framework do you want to set up CI/CD for?',
//             choices: ['Flask', 'Django', 'Spring Boot', 'Node.js'],
//         },
//         {
//             type: 'confirm',
//             name: 'docker',
//             message: 'Do you want to integrate Docker?',
//             default: false,
//         },
//         {
//             type: 'input',
//             name: 'projectName',
//             message: 'What is the name of your project?',
//             validate: (input) => (input ? true : 'Please enter a project name.'),
//         },
//     ];

//     const frameworkAnswers = await inquirer.prompt(frameworkQuestions);
//     return frameworkAnswers;
// }

// // Function to generate CI/CD configuration based on user input
// function generateConfig(answers) {
//     const { framework, docker, projectName } = answers;
//     let config = `# CI/CD Configuration for ${projectName}\n`;
    
//     switch (framework) {
//         case 'Flask':
//             config += 'Using Flask framework.\n';
//             break;
//         case 'Django':
//             config += 'Using Django framework.\n';
//             break;
//         case 'Spring Boot':
//             config += 'Using Spring Boot framework.\n';
//             break;
//         case 'Node.js':
//             config += 'Using Node.js framework.\n';
//             break;
//     }

//     if (docker) {
//         config += 'Docker integration is enabled.\n';
//     } else {
//         config += 'Docker integration is not enabled.\n';
//     }

//     return config;
// }

// // Main function to run the CLI tool
// async function run() {
//     console.log('Welcome to cicd-helper! 🚀');
//     const answers = await askForSetup();
//     const config = generateConfig(answers);
//     // console.log('\nGenerated CI/CD Configuration:\n');
//     // console.log(config);

//     //save the config to file
//     const fileName = `${answers.projectName}-cicd-config.txt`; // Filename based on project name
//     fs.writeFileSync(fileName, config); 

//     console.log(`\nGenerated CI/CD Configuration has been saved to ${fileName}`);

// }
// // Execute the main function
// run();