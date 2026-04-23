import { globby } from 'globby';
import fs from 'fs-extra';
import path from 'path';
import { logger } from '../utils/logger.js';
import prettyBytes from 'pretty-bytes';

export const profileCommand = async () => {
  logger.info('EXECUTING ADVANCED PROJECT PROFILING');

  const files = await globby(['**/*', '!node_modules', '!.git', '!dist', '!.next']);
  
  const stats = {
    totalFiles: files.length,
    totalSize: 0,
    extensions: {},
    totalLines: 0
  };

  for (const file of files) {
    const filePath = path.join(process.cwd(), file);
    const fileStats = await fs.stat(filePath);
    const ext = path.extname(file) || 'no-ext';

    stats.totalSize += fileStats.size;
    stats.extensions[ext] = (stats.extensions[ext] || 0) + 1;

    // Only count lines for text files
    if (['.js', '.ts', '.jsx', '.tsx', '.json', '.md', '.css', '.html'].includes(ext)) {
      const content = await fs.readFile(filePath, 'utf8');
      stats.totalLines += content.split('\n').length;
    }
  }

  logger.raw('----------------------------------------');
  logger.raw(`TOTAL FILES: ${stats.totalFiles}`);
  logger.raw(`TOTAL SIZE: ${prettyBytes(stats.totalSize)}`);
  logger.raw(`TOTAL LINES (CODE/DOCS): ${stats.totalLines}`);
  logger.raw('----------------------------------------');
  logger.raw('BREAKDOWN BY EXTENSION:');
  Object.entries(stats.extensions)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .forEach(([ext, count]) => {
      logger.raw(`  ${ext.padEnd(8)}: ${count} files`);
    });
  logger.raw('----------------------------------------');
  logger.success('PROFILING COMPLETE');
};
