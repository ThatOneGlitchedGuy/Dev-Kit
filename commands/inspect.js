import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import boxen from 'boxen';
import { logger } from '../utils/logger.js';
import prettyBytes from 'pretty-bytes';

export const inspectCommand = async (target) => {
  const targetPath = path.resolve(process.cwd(), target || '.');

  if (!fs.existsSync(targetPath)) {
    logger.error(`PATH NOT FOUND: ${targetPath}`);
    return;
  }

  const stats = await fs.stat(targetPath);
  const isDir = stats.isDirectory();

  const info = [
    { label: 'Name', value: path.basename(targetPath) },
    { label: 'Path', value: targetPath },
    { label: 'Type', value: isDir ? 'Directory' : 'File' },
    { label: 'Size', value: prettyBytes(stats.size) },
    { label: 'Created', value: stats.birthtime.toLocaleString() },
    { label: 'Modified', value: stats.mtime.toLocaleString() },
    { label: 'Permissions', value: stats.mode.toString(8).slice(-3) }
  ];

  if (!isDir && targetPath.endsWith('.js')) {
    try {
      const content = await fs.readFile(targetPath, 'utf-8');
      const importCount = (content.match(/import /g) || []).length;
      const exportCount = (content.match(/export /g) || []).length;
      const lineCount = content.split('\n').length;
      info.push({ label: 'Lines', value: lineCount });
      info.push({ label: 'Imports', value: importCount });
      info.push({ label: 'Exports', value: exportCount });
    } catch (e) {
      // Ignore read errors
    }
  }

  if (isDir) {
    const files = await fs.readdir(targetPath);
    info.push({ label: 'Contains', value: `${files.length} items` });
  }

  const output = info
    .map((i) => `${chalk.cyan(i.label.padEnd(12))}: ${chalk.white(i.value)}`)
    .join('\n');

  console.log(boxen(output, { 
    title: `INSPECTION: ${path.basename(targetPath)}`, 
    padding: 1, 
    borderColor: 'magenta',
    borderStyle: 'double'
  }));
};
