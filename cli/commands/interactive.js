const chalk = require('chalk');
const inquirer = require('inquirer');
const { generateCommand } = require('./generate');
const { explainCommand } = require('./explain');

async function interactiveMode() {
  console.log('');
  console.log(chalk.yellow('  TerminAItor Interactive Mode'));
  console.log(chalk.dim('  Type your task or command to explain. Type "exit" to quit.'));
  console.log('');

  while (true) {
    const { input } = await inquirer.prompt([{
      type: 'input',
      name: 'input',
      message: chalk.green('terminai>'),
      prefix: ''
    }]);

    if (!input.trim()) continue;
    
    if (input.toLowerCase() === 'exit' || input.toLowerCase() === 'quit') {
      console.log(chalk.dim('  Goodbye! 👋'));
      process.exit(0);
    }

    if (input.startsWith('explain ')) {
      const cmd = input.replace('explain ', '').trim();
      await explainCommand(cmd);
    } else {
      await generateCommand(input);
    }

    console.log('');
  }
}

module.exports = { interactiveMode };
