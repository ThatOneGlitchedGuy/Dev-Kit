import { execa } from 'execa';
import { logger } from '../utils/logger.js';
import inquirer from 'inquirer';

export const deployCommand = async (options) => {
  logger.info('INITIALIZING DEPLOYMENT PIPELINE');

  const { confirm } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirm',
      message: 'FAHH-cli: EXECUTE SEMANTIC RELEASE AND VERSION BUMP?',
      default: false
    }
  ]);

  if (!confirm) {
    logger.warn('DEPLOYMENT ABORTED BY OPERATOR');
    return;
  }

  try {
    logger.info('RUNNING PRE-FLIGHT TESTS');
    await execa('npm', ['test'], { stdio: 'inherit' }).catch(() => {
      throw new Error('PRE-FLIGHT TESTS FAILED');
    });

    logger.info('EXECUTING STANDARD-VERSION (CHANGELOG + TAGGING)');
    const args = options.dryRun ? ['--dry-run'] : [];
    await execa('npx', ['standard-version', ...args], { stdio: 'inherit' });

    if (!options.dryRun) {
      logger.success('VERSION BUMP AND CHANGELOG GENERATED');
      logger.info('READY FOR: git push --follow-tags');
    } else {
      logger.info('DRY RUN COMPLETE: NO CHANGES APPLIED');
    }
  } catch (error) {
    logger.error(`DEPLOY ENGINE ERROR: ${error.message}`);
  }
};
