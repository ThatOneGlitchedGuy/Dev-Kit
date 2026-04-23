import { logger } from './logger.js';
import shell from 'shelljs';

export const Engine = {
  /**
   * Safe execution wrapper for shell commands
   */
  exec: (command, options = {}) => {
    const result = shell.exec(command, { silent: true, ...options });
    if (result.code !== 0) {
      throw new Error(`Command failed: ${command}\n${result.stderr}`);
    }
    return result.stdout.trim();
  },

  /**
   * Standardized task runner with error boundary
   */
  runTask: async (name, taskFn) => {
    logger.info(`STARTING TASK: ${name}`);
    try {
      await taskFn();
      logger.success(`COMPLETED TASK: ${name}`);
    } catch (error) {
      logger.error(`FAILED TASK: ${name} - ${error.message}`);
      process.exit(1);
    }
  }
};
