import shell from 'shelljs';
import chalk from 'chalk';

export const killPortCommand = (port) => {
  console.log(chalk.cyan(`🎯 Looking for process on port ${port}...`));

  // Find the PID using the port
  const findPid = shell.exec(`lsof -t -i:${port}`, { silent: true });
  const pid = findPid.stdout.trim();

  if (!pid) {
    console.log(chalk.yellow(`✨ No process found running on port ${port}.`));
    return;
  }

  console.log(chalk.gray(`  Found PID ${pid}. Killing it...`));
  
  if (shell.exec(`kill -9 ${pid}`).code === 0) {
    console.log(chalk.green(`\n✅ Successfully killed process ${pid} on port ${port}.`));
  } else {
    console.error(chalk.red(`\n❌ Failed to kill process ${pid}.`));
  }
};
