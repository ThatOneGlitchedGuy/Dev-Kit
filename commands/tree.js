import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';

const ignoreList = ['node_modules', '.git', 'dist', '.DS_Store'];

const printTree = (dir, prefix = '') => {
  const files = fs.readdirSync(dir);
  
  files.forEach((file, index) => {
    if (ignoreList.includes(file)) return;

    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);
    const isLast = index === files.length - 1;
    const marker = isLast ? '└── ' : '├── ';

    if (stats.isDirectory()) {
      console.log(`${prefix}${marker}${chalk.blue.bold(file)}/`);
      const newPrefix = prefix + (isLast ? '    ' : '│   ');
      printTree(filePath, newPrefix);
    } else {
      console.log(`${prefix}${marker}${file}`);
    }
  });
};

export const treeCommand = () => {
  console.log(chalk.cyan(`🌳 Project Structure for: ${path.basename(process.cwd())}\n`));
  console.log(chalk.blue.bold('.'));
  printTree(process.cwd());
};
