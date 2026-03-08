const chalk = require('chalk');
const ora = require('ora');
const { callN8N } = require('../utils/n8n');
const { displayError } = require('../utils/display');

async function explainCommand(cmd) {
  const spinner = ora('Analyzing command...').start();

  try {
    const result = await callN8N(`explain this command: ${cmd}`, 'explain');
    spinner.stop();

    const { command, explanation } = result;

    console.log('');
    console.log(chalk.gray('  Command:     ') + chalk.greenBright(cmd));
    console.log(chalk.gray('  Explanation: ') + chalk.white(explanation || command));
    console.log('');

  } catch (err) {
    spinner.stop();
    displayError(err.message);
    process.exit(1);
  }
}

module.exports = { explainCommand };
