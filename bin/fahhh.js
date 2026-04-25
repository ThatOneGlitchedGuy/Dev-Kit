#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { initCommand } from '../commands/init.js';
import { cleanCommand } from '../commands/clean.js';
import { gitSyncCommand } from '../commands/gitSync.js';
import { killPortCommand } from '../commands/killPort.js';
import { treeCommand } from '../commands/tree.js';
import { doctorCommand } from '../commands/doctor.js';
import { envSyncCommand } from '../commands/env.js';
import { profileCommand } from '../commands/profile.js';
import { serveCommand } from '../commands/serve.js';
import { auditCommand } from '../commands/audit.js';
import { deployCommand } from '../commands/deploy.js';
import { configCommand } from '../commands/config.js';
import { inspectCommand } from '../commands/inspect.js';
import { watchCommand } from '../commands/watch.js';
import { dashboardCommand } from '../commands/dashboard.js';
import { logger } from '../utils/logger.js';

const program = new Command();

program
  .name('fahhh')
  .description(chalk.blue('FAHH-CLI: ENTERPRISE DEVELOPMENT ENGINE'))
  .version('3.0.0');

/**
 * CONFIGURATION
 */
program
  .command('config')
  .description('FAHH-cli: MANAGE GLOBAL ENGINE SETTINGS')
  .argument('<action>', 'FAHH-cli: ACTION (get, set, delete)')
  .argument('[key]', 'FAHH-cli: CONFIGURATION KEY')
  .argument('[value]', 'FAHH-cli: CONFIGURATION VALUE')
  .action(configCommand);

/**
 * ARCHITECTURE & SCAFFOLDING
 */
program
  .command('init')
  .description('FAHH-cli: CONSTRUCT PRODUCTION HIERARCHY')
  .action(initCommand);

program
  .command('dashboard')
  .description('FAHH-cli: INTERACTIVE PROJECT OVERVIEW')
  .action(dashboardCommand);

/**
 * ANALYTICS & AUDIT
 */
program
  .command('profile')
  .description('FAHH-cli: GENERATE HIGH-FIDELITY PROJECT ANALYTICS')
  .action(profileCommand);

program
  .command('inspect')
  .description('FAHH-cli: DEEP INSPECTION OF FILE OR DIRECTORY')
  .argument('[target]', 'FAHH-cli: TARGET PATH', '.')
  .action(inspectCommand);

program
  .command('audit')
  .description('FAHH-cli: EXECUTE COMPLIANCE AND SECURITY AUDIT')
  .action(auditCommand);

/**
 * RUNTIME & DEPLOYMENT
 */
program
  .command('serve')
  .description('FAHH-cli: DEPLOY HIGH-CONCURRENCY STATIC RUNTIME')
  .option('-p, --port <number>', 'FAHH-cli: NETWORK PORT', '5000')
  .option('-d, --dir <path>', 'FAHH-cli: TARGET DIRECTORY', '.')
  .action(serveCommand);

program
  .command('deploy')
  .description('FAHH-cli: EXECUTE SEMANTIC RELEASE PIPELINE')
  .option('--dry-run', 'FAHH-cli: SIMULATE DEPLOYMENT WITHOUT PERSISTENCE')
  .action(deployCommand);

/**
 * UTILITIES & DIAGNOSTICS
 */
program
  .command('doctor')
  .description('FAHH-cli: VERIFY SYSTEM RUNTIME INTEGRITY')
  .action(doctorCommand);

program
  .command('env')
  .description('FAHH-cli: SYNCHRONIZE ENVIRONMENT MANIFESTS')
  .action(envSyncCommand);

program
  .command('clean')
  .description('FAHH-cli: PURGE TEMPORARY ARTIFACTS')
  .option('-d, --deep', 'FAHH-cli: FORCE RECURSIVE PURGE')
  .action(cleanCommand);

program
  .command('watch')
  .description('FAHH-cli: WATCH FOR CHANGES AND EXECUTE COMMAND')
  .argument('<command>', 'FAHH-cli: COMMAND TO EXECUTE ON CHANGE')
  .action(watchCommand);

const git = program.command('git').description('FAHH-cli: VERSION CONTROL INTERFACE');
git
  .command('sync')
  .argument('<message>', 'FAHH-cli: COMMIT MANIFEST')
  .description('FAHH-cli: ATOMIC SOURCE SYNCHRONIZATION')
  .action(gitSyncCommand);

const proc = program.command('port').description('FAHH-cli: KERNEL PROCESS INTERFACE');
proc
  .command('kill')
  .argument('<port>', 'FAHH-cli: NETWORK PORT')
  .description('FAHH-cli: SIGKILL PROCESS BOUND TO PORT')
  .action(killPortCommand);

program
  .command('tree')
  .description('FAHH-cli: VISUALIZE DIRECTORY ARCHITECTURE')
  .action(treeCommand);

// Global Exception Handler
process.on('uncaughtException', (err) => {
  logger.error(`CRITICAL FAILURE: ${err.message}`);
  process.exit(1);
});

program.parse();
