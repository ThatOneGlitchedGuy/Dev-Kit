import { test, describe } from 'node:test';
import assert from 'node:assert';
import config from '../utils/config.js';

describe('Config Utility', () => {
  test('should have default values', () => {
    assert.strictEqual(config.get('defaultBranch'), 'main');
  });

  test('should be able to set and get values', () => {
    config.set('author', 'FAHHHH-lab-tester');
    assert.strictEqual(config.get('author'), 'FAHHHH-lab-tester');
    // Cleanup
    config.delete('author');
  });
});
