const chalk = require('chalk');

function displayCommand(task, command, explanation, safe) {
  console.log('');
  console.log(chalk.gray('  Task:     ') + chalk.white(task));
  console.log(chalk.gray('  Command:  ') + chalk.greenBright(command));
  console.log(chalk.gray('  What:     ') + chalk.dim(explanation));
  
  if (!safe.ok) {
    console.log(chalk.red(`  ⚠ Warning: ${safe.reason}`));
  } else if (safe.warning) {
    console.log(chalk.yellow(`  ⚠ Note:    ${safe.warning}`));
  }
  
  console.log('');
}

function displayMultipleSuggestions(task, suggestions) {
  console.log('');
  console.log(chalk.gray('  Task: ') + chalk.white(task));
  console.log('');
  
  suggestions.forEach((suggestion, index) => {
    const [command, explanation] = suggestion.split('#').map(s => s.trim());
    console.log(chalk.gray(`  [${index + 1}] `) + chalk.greenBright(command));
    if (explanation) {
      console.log(chalk.gray('      ') + chalk.dim(explanation));
    }
    console.log('');
  });
}

function displayError(message) {
  console.log('');
  console.log(chalk.red('  ✗ Error: ') + chalk.white(message));
  console.log('');
}

function displaySuccess(message) {
  console.log('');
  console.log(chalk.green('  ✓ ') + chalk.white(message));
  console.log('');
}

module.exports = {
  displayCommand,
  displayMultipleSuggestions,
  displayError,
  displaySuccess
};
