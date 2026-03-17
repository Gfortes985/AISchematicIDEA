import { describe, expect, test } from 'vitest';
import { CommandEngine } from '../src/core/commands/commandEngine';
import { AddComponentCommand, MoveComponentCommand } from '../src/core/commands/commands';
import { HistoryManager } from '../src/core/history/historyManager';
import { createComponent, createEmptyProject } from '../src/core/model/circuitModel';

describe('command engine', () => {
  test('applies batch commands', () => {
    const engine = new CommandEngine(new HistoryManager());
    const c = createComponent('resistor', 'r1', 'R1', 0, 0);
    const project = engine.runBatch(createEmptyProject(), [new AddComponentCommand(c), new MoveComponentCommand('r1', { x: 10, y: 15 })]);
    expect(project.components[0].position).toEqual({ x: 10, y: 15 });
  });
});
