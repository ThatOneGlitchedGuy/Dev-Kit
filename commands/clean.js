import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';

export const cleanCommand = async (options) => {
  console.log(chalk.cyan('🧹 Cleaning junk files...'));

  const filesToClean = ['node_modules', 'dist', 'build', '.cache', 'npm-debug.log*', 'yarn-debug.log*', 'yarn-error.log*'];
  
  if (options.deep) {
    console.log(chalk.yellow('Deep clean enabled. Removing more targets...'));
    filesToClean.push('.next', '.nuxt', 'coverage');
  }

  let cleanedCount = 0;
  for (const item of filesToClean) {
    const itemPath = path.join(process.cwd(), item);
    // Handle glob-like patterns manually for simplicity in v1 or just use exact matches
    if (fs.existsSync(itemPath)) {
      await fs.remove(itemPath);
      console.log(chalk.gray(`  Removed: ${item}`));
      cleanedCount++;
    }
  }

  if (cleanedCount > 0) {
    console.log(chalk.green(`\n✅ Cleaned ${cleanedCount} items.`));
  } else {
    console.log(chalk.yellow('\n✨ Nothing to clean!'));
  }
};
