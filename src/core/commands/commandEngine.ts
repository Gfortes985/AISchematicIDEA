import { HistoryManager } from '../history/historyManager';
import { CircuitProject } from '../model/types';
import { Command } from './types';

export class CommandEngine {
  constructor(private history: HistoryManager) {}

  run(project: CircuitProject, command: Command): CircuitProject {
    return this.history.execute(command, project);
  }

  runBatch(project: CircuitProject, commands: Command[]): CircuitProject {
    return commands.reduce((acc, cmd) => this.run(acc, cmd), project);
  }
}
