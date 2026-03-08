#!/usr/bin/env node
const { program } = require('commander');
const { generateCommand } = require('./commands/generate');
const { explainCommand } = require('./commands/explain');
const { interactiveMode } = require('./commands/interactive');
const Conf = require('conf');
const chalk = require('chalk');

const config = new Conf({ projectName: 'terminaitor' });

program
  .name('terminai')
  .description('AI-powered terminal command assistant')
  .version('1.0.1');

// terminai "kill port 3000"
program
  .argument('[task]', 'describe what you want to do')
  .action(async (task) => {
    if (!task) return interactiveMode();
    await generateCommand(task);
  });

// terminai explain "chmod 755"
program
  .command('explain <command>')
  .description('explain what a terminal command does')
  .action(async (cmd) => explainCommand(cmd));

// terminai config set-url <url>
const configCmd = program
  .command('config')
  .description('configure TerminAItor settings');

configCmd
  .command('set-url <url>')
  .description('save your n8n webhook URL')
  .action((url) => {
    config.set('webhookUrl', url);
    console.log(chalk.green('✓ Webhook URL saved!'));
    console.log(chalk.dim(`  ${url}`));
  });

configCmd
  .command('show')
  .description('show current configuration')
  .action(() => {
    const url = config.get('webhookUrl');
    if (url) {
      console.log(chalk.gray('Webhook URL: ') + chalk.white(url));
    } else {
      console.log(chalk.yellow('No webhook URL configured.'));
      console.log(chalk.dim('Run: terminai config set-url <your-n8n-url>'));
    }
  });

program.parse();
