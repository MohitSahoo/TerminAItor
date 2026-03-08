const chalk = require('chalk');
const ora = require('ora');
const inquirer = require('inquirer');
const clipboard = require('clipboardy');
const { execSync } = require('child_process');
const { callN8N } = require('../utils/n8n');
const { isSafe } = require('../utils/safety');
const { displayCommand, displayError, displaySuccess, displayMultipleSuggestions } = require('../utils/display');

async function generateCommand(task) {
  const spinner = ora('Thinking...').start();

  try {
    const result = await callN8N(task, 'generate');
    spinner.stop();

    const { command, explanation, allSuggestions } = result;
    
    if (allSuggestions && allSuggestions.length > 1) {
      displayMultipleSuggestions(task, allSuggestions);
      
      const { selectedIndex } = await inquirer.prompt([{
        type: 'list',
        name: 'selectedIndex',
        message: 'Choose a command:',
        choices: allSuggestions.map((s, i) => ({
          name: s.split('#')[0].trim(),
          value: i
        }))
      }]);
      
      const selected = allSuggestions[selectedIndex];
      const [selectedCommand, selectedExplanation] = selected.split('#').map(s => s.trim());
      
      return await handleCommand(task, selectedCommand, selectedExplanation);
    }
    
    return await handleCommand(task, command, explanation);
    
  } catch (err) {
    spinner.stop();
    displayError(err.message);
    process.exit(1);
  }
}

async function handleCommand(task, command, explanation) {
  const safe = isSafe(command);
  displayCommand(task, command, explanation, safe);

  const { action } = await inquirer.prompt([{
    type: 'list',
    name: 'action',
    message: 'What do you want to do?',
    choices: [
      'Copy to clipboard',
      'Run command',
      'Show explanation',
      'Cancel'
    ]
  }]);

  if (action === 'Copy to clipboard') {
    await clipboard.write(command);
    displaySuccess('Copied to clipboard!');
  } 
  else if (action === 'Run command') {
    if (!safe.ok) {
      const { confirm } = await inquirer.prompt([{
        type: 'confirm',
        name: 'confirm',
        message: chalk.red('⚠ This command may be dangerous. Run anyway?'),
        default: false
      }]);
      if (!confirm) {
        console.log(chalk.yellow('  Cancelled.'));
        return;
      }
    }
    
    try {
      console.log(chalk.dim('\n  Running command...\n'));
      execSync(command, { stdio: 'inherit' });
      displaySuccess('Command executed successfully!');
    } catch (error) {
      displayError('Command execution failed');
    }
  }
  else if (action === 'Show explanation') {
    console.log('');
    console.log(chalk.gray('  Detailed explanation:'));
    console.log(chalk.white(`  ${explanation}`));
    console.log('');
  }
}

module.exports = { generateCommand };
