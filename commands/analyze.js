import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import ora from 'ora';
import prettyBytes from 'pretty-bytes';

async function getDirSize(dirPath) {
  let size = 0;
  const files = await fs.readdir(dirPath);

  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const stats = await fs.stat(filePath);

    if (stats.isDirectory()) {
      size += await getDirSize(filePath);
    } else {
      size += stats.size;
    }
  }

  return size;
}

export const analyzeCommand = async () => {
  const nodeModulesPath = path.join(process.cwd(), 'node_modules');

  if (!fs.existsSync(nodeModulesPath)) {
    console.log(chalk.yellow('No node_modules found in this directory.'));
    return;
  }

  const spinner = ora('Analyzing node_modules size...').start();
  
  try {
    const size = await getDirSize(nodeModulesPath);
    spinner.succeed('Analysis complete!');
    
    console.log('\n' + chalk.cyan('📊 Project Insights:'));
    console.log(`${chalk.gray('node_modules size:')} ${chalk.bold(prettyBytes(size))}`);
    
    if (size > 500 * 1024 * 1024) {
      console.log(chalk.red('⚠️ Warning: node_modules is quite heavy (>500MB). Consider running fahhh clean.'));
    } else {
      console.log(chalk.green('✅ node_modules size is within healthy limits.'));
    }
  } catch (error) {
    spinner.fail('Failed to analyze project.');
    console.error(error);
  }
};
