import { test, describe } from 'node:test';
import assert from 'node:assert';
import { Engine } from '../utils/engine.js';

describe('Engine Utility', () => {
  test('exec should return stdout for a successful command', () => {
    const output = Engine.exec('echo "hello world"');
    assert.strictEqual(output, 'hello world');
  });

  test('exec should throw error for failed command', () => {
    assert.throws(() => {
      Engine.exec('non-existent-command-xyz');
    }, /Command failed/);
  });

  test('runTask should execute successfully', async () => {
    let taskExecuted = false;
    await Engine.runTask('test task', async () => {
      taskExecuted = true;
    });
    assert.strictEqual(taskExecuted, true);
  });
});
