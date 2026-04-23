import shell from 'shelljs';
import chalk from 'chalk';

export const gitSyncCommand = (message) => {
  if (!shell.which('git')) {
    console.error(chalk.red('Error: git is not installed.'));
    process.exit(1);
  }

  console.log(chalk.cyan('🔄 Syncing with git...'));

  console.log(chalk.gray('  git add .'));
  if (shell.exec('git add .').code !== 0) {
    console.error(chalk.red('Error: git add failed.'));
    process.exit(1);
  }

  console.log(chalk.gray(`  git commit -m "${message}"`));
  if (shell.exec(`git commit -m "${message}"`).code !== 0) {
    console.warn(chalk.yellow('Warning: git commit failed (maybe nothing to commit?).'));
  } else {
    console.log(chalk.gray('  git push'));
    if (shell.exec('git push').code !== 0) {
      console.error(chalk.red('Error: git push failed.'));
      process.exit(1);
    }
    console.log(chalk.green('\n✅ Git sync complete!'));
  }
};
