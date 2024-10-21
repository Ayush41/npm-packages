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
  const targetPath = path.join(process.cwd(), `.github/workflows/${templateFile}`);
  
  let templateContent = fs.readFileSync(templatePath, 'utf8');
  templateContent = templateContent.replace(/\$BRANCH/g, branch);

  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  fs.writeFileSync(targetPath, templateContent);
  console.log(`✅ CI/CD configuration for ${ciService} (${projectType}) created successfully!`);
}
async function main() {
  const { ciService, projectType, branch } = await getUserInput();
  generateCICDConfig(ciService, projectType, branch);
}

main();