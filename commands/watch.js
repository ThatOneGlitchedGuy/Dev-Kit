import chokidar from 'chokidar';
import { execa } from 'execa';
import { logger } from '../utils/logger.js';
import chalk from 'chalk';

export const watchCommand = (command) => {
  logger.info(`STARTING FAHH WATCH ENGINE: ${chalk.cyan(command)}`);

  const watcher = chokidar.watch('.', {
    ignored: [/(^|[\/\\])\../, 'node_modules', 'dist', '.git'],
    persistent: true
  });

  let isRunning = false;

  const runCommand = async () => {
    if (isRunning) return;
    isRunning = true;
    
    logger.info(`CHANGES DETECTED: EXECUTING ${chalk.yellow(command)}`);
    try {
      const { stdout, stderr } = await execa(command, { shell: true, stdio: 'inherit' });
    } catch (e) {
      logger.error(`WATCH COMMAND FAILED: ${e.message}`);
    } finally {
      isRunning = false;
      logger.success('WATCH CYCLE COMPLETE. WAITING FOR CHANGES...');
    }
  };

  watcher.on('change', (path) => {
    logger.raw(`\n${chalk.gray('FILE CHANGED:')} ${path}`);
    runCommand();
  });

  logger.info('WATCHER ACTIVE. PRESS CTRL+C TO TERMINATE.');
};
