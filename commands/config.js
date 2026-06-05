import config from '../utils/config.js';
import { logger } from '../utils/logger.js';
import boxen from 'boxen';
import chalk from 'chalk';

export const configCommand = (action, key, value) => {
  if (action === 'get') {
    if (key) {
      const val = config.get(key);
      logger.info(`${chalk.cyan(key)}: ${val}`);
    } else {
      const all = config.store;
      console.log(boxen(JSON.stringify(all, null, 2), { title: 'FAH CONFIG', padding: 1, borderColor: 'cyan' }));
    }
  } else if (action === 'set') {
    if (!key || value === undefined) {
      logger.error('USAGE: fah config set <key> <value>');
      return;
    }
    config.set(key, value);
    logger.success(`SET ${chalk.cyan(key)} TO ${chalk.green(value)}`);
  } else if (action === 'delete') {
    if (!key) {
      logger.error('USAGE: fah config delete <key>');
      return;
    }
    config.delete(key);
    logger.success(`DELETED CONFIG KEY ${chalk.red(key)}`);
  } else {
    logger.error('INVALID ACTION. USE: get, set, delete');
  }
};
