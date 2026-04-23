import fs from 'fs-extra';
import path from 'path';
import { logger } from '../utils/logger.js';

export const envSyncCommand = async () => {
  const examplePath = path.join(process.cwd(), '.env.example');
  const envPath = path.join(process.cwd(), '.env');

  if (!fs.existsSync(examplePath)) {
    logger.error('.env.example not found in the current directory.');
    return;
  }

  if (fs.existsSync(envPath)) {
    logger.info('.env already exists. Skipping sync to prevent overwriting.');
    return;
  }

  try {
    await fs.copy(examplePath, envPath);
    logger.success('.env created from .env.example');
  } catch (error) {
    logger.error(`Failed to sync env files: ${error.message}`);
  }
};
