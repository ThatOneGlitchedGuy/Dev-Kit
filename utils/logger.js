import chalk from 'chalk';

export const logger = {
  info: (msg) => console.log(`${chalk.blue('FAHH-cli:')} ${msg}`),
  success: (msg) => console.log(`${chalk.green('FAHH-cli:')} ${msg}`),
  warn: (msg) => console.log(`${chalk.yellow('FAHH-cli:')} ${msg}`),
  error: (msg) => console.error(`${chalk.red('FAHH-cli: ERROR:')} ${msg}`),
  raw: (msg) => console.log(`${chalk.gray('FAHH-cli:')} ${msg}`)
};
