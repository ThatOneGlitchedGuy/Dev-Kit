import sirv from 'sirv';
import polka from 'polka';
import { logger } from '../utils/logger.js';
import path from 'path';

export const serveCommand = (options) => {
  const port = options.port || 5000;
  const dir = options.dir || '.';
  const absoluteDir = path.resolve(process.cwd(), dir);

  logger.info('INITIALIZING PRODUCTION SERVER');
  logger.info(`TARGET DIRECTORY: ${absoluteDir}`);

  polka()
    .use(sirv(absoluteDir, { dev: true, single: true }))
    .listen(port, err => {
      if (err) {
        logger.error(`SERVER STARTUP FAILED: ${err.message}`);
        process.exit(1);
      }
      logger.success(`SERVER ONLINE: HTTP://LOCALHOST:${port}`);
    });
};
