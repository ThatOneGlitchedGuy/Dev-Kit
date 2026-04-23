import { Listr } from 'listr2';
import shell from 'shelljs';
import { logger } from '../utils/logger.js';

export const doctorCommand = async () => {
  logger.info('EXECUTING SYSTEM DIAGNOSTICS');

  const tasks = new Listr([
    {
      title: 'FAHH-cli: VALIDATING NODE RUNTIME',
      task: () => {
        const version = process.version;
        const major = parseInt(version.split('.')[0].substring(1));
        if (major < 18) throw new Error('MINIMUM NODE VERSION 18 REQUIRED');
      }
    },
    {
      title: 'FAHH-cli: VERIFYING GIT BINARY',
      task: () => {
        if (!shell.which('git')) throw new Error('GIT BINARY NOT FOUND IN PATH');
      }
    },
    {
      title: 'FAHH-cli: AUDITING PACKAGE MANAGER',
      task: () => {
        if (!shell.which('npm') && !shell.which('yarn')) throw new Error('NO PACKAGE MANAGER (NPM/YARN) DETECTED');
      }
    },
    {
      title: 'FAHH-cli: TESTING NETWORK STACK',
      task: async () => {
        try {
          await fetch('https://1.1.1.1', { mode: 'no-cors' });
        } catch (error) {
          throw new Error('NETWORK UNREACHABLE', { cause: error });
        }
      }
    }
  ], { 
    rendererOptions: { collapse: false, showTimer: true },
    exitOnError: true 
  });

  try {
    await tasks.run();
    logger.success('SYSTEM DIAGNOSTICS PASSED');
  } catch (error) {
    logger.error(`DIAGNOSTICS FAILED: ${error.message}`);
  }
};
