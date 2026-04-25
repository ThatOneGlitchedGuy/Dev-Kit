import chalk from 'chalk';
import boxen from 'boxen';
import { execa } from 'execa';
import fs from 'fs-extra';
import path from 'path';
import prettyBytes from 'pretty-bytes';
import { logger } from '../utils/logger.js';

export const dashboardCommand = async () => {
  console.clear();
  logger.info(chalk.bold.magenta('FAHH PROJECT DASHBOARD v3.0'));
  
  // 1. Git Status
  let gitInfo = chalk.gray('Not a git repository');
  try {
    const { stdout: branch } = await execa('git', ['rev-parse', '--abbrev-ref', 'HEAD']);
    const { stdout: lastCommit } = await execa('git', ['log', '-1', '--format=%s (%cr)']);
    gitInfo = `${chalk.cyan('Branch:')} ${branch}\n${chalk.cyan('Latest:')} ${lastCommit}`;
  } catch (e) {}

  // 2. Disk Usage (node_modules)
  let nodeSize = chalk.gray('N/A');
  if (fs.existsSync('node_modules')) {
    try {
      // Simple approximation for dashboard speed
      const files = await fs.readdir('node_modules');
      nodeSize = `${files.length} packages installed`;
    } catch (e) {}
  }

  // 3. Environment
  const hasEnv = fs.existsSync('.env') ? chalk.green('YES') : chalk.red('NO');
  const hasDocker = fs.existsSync('Dockerfile') ? chalk.green('YES') : chalk.red('NO');

  const mainStats = [
    `${chalk.yellow('GIT STATUS')}\n${gitInfo}`,
    `${chalk.yellow('DEPENDENCIES')}\n${nodeSize}`,
    `${chalk.yellow('ENVIRONMENT')}\n.env: ${hasEnv}\nDocker: ${hasDocker}`
  ].join('\n\n');

  console.log(boxen(mainStats, {
    padding: 1,
    margin: 1,
    borderColor: 'cyan',
    title: path.basename(process.cwd()).toUpperCase(),
    titleAlignment: 'center'
  }));

  // 4. Quick Actions
  console.log(chalk.bold('Quick Actions:'));
  console.log(`- ${chalk.white('fahhh profile')}  : Deep analytics`);
  console.log(`- ${chalk.white('fahhh doctor')}   : Health check`);
  console.log(`- ${chalk.white('fahhh watch')}    : Live reload`);
  console.log('\n' + chalk.gray('Press Ctrl+C to exit dashboard'));
};
