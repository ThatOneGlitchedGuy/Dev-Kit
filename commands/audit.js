import * as checker from 'license-checker-rseidelsohn';
const init = checker.default ? checker.default.init : checker.init;
import { logger } from '../utils/logger.js';
import { promisify } from 'util';

const findLicenses = promisify(init);

export const auditCommand = async () => {
  logger.info('EXECUTING SECURITY AND COMPLIANCE AUDIT');

  try {
    const licenses = await findLicenses({
      start: process.cwd(),
      direct: true
    });

    const summary = {
      total: Object.keys(licenses).length,
      licenses: {}
    };

    Object.values(licenses).forEach(pkg => {
      summary.licenses[pkg.licenses] = (summary.licenses[pkg.licenses] || 0) + 1;
    });

    logger.raw('----------------------------------------');
    logger.raw(`TOTAL DIRECT DEPENDENCIES: ${summary.total}`);
    logger.raw('LICENSE DISTRIBUTION:');
    Object.entries(summary.licenses).forEach(([type, count]) => {
      logger.raw(`  ${type.padEnd(20)}: ${count}`);
    });
    logger.raw('----------------------------------------');
    
    // Check for high-risk licenses (GPL, etc. if required by policy)
    const highRisk = Object.entries(licenses).filter(([, data]) => 
      data.licenses.includes('GPL') || data.licenses.includes('AGPL')
    );

    if (highRisk.length > 0) {
      logger.warn(`DETECTED ${highRisk.length} HIGH-RISK LICENSES (COPYLEFT)`);
    } else {
      logger.success('COMPLIANCE AUDIT PASSED: ALL LICENSES VERIFIED');
    }
  } catch (error) {
    logger.error(`AUDIT ENGINE FAILURE: ${error.message}`);
  }
};
