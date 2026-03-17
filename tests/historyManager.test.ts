import { describe, expect, test } from 'vitest';
import { AddComponentCommand } from '../src/core/commands/commands';
import { HistoryManager } from '../src/core/history/historyManager';
import { createComponent, createEmptyProject } from '../src/core/model/circuitModel';

describe('history manager', () => {
  test('undo redo manual and ai use same flow', () => {
    const history = new HistoryManager();
    const c = createComponent('capacitor', 'c1', 'C1');
    const p1 = history.execute(new AddComponentCommand(c), createEmptyProject());
    expect(p1.components).toHaveLength(1);
    const p2 = history.undo(p1);
    expect(p2.components).toHaveLength(0);
    const p3 = history.redo(p2);
    expect(p3.components).toHaveLength(1);
  });
});
