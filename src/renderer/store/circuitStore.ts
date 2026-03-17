import { Command } from '../../core/commands/types';
import { CommandEngine } from '../../core/commands/commandEngine';
import { HistoryManager } from '../../core/history/historyManager';
import { createEmptyProject } from '../../core/model/circuitModel';
import { CircuitProject } from '../../core/model/types';

export class CircuitStore {
  private project: CircuitProject = createEmptyProject();
  private subscribers = new Set<(project: CircuitProject) => void>();
  readonly history = new HistoryManager();
  readonly engine = new CommandEngine(this.history);

  getState(): CircuitProject { return this.project; }

  subscribe(fn: (project: CircuitProject) => void): () => void {
    this.subscribers.add(fn);
    return () => this.subscribers.delete(fn);
  }

  dispatch(command: Command): void {
    this.project = this.engine.run(this.project, command);
    this.emit();
  }

  dispatchBatch(commands: Command[]): void {
    this.project = this.engine.runBatch(this.project, commands);
    this.emit();
  }

  undo(): void { this.project = this.history.undo(this.project); this.emit(); }
  redo(): void { this.project = this.history.redo(this.project); this.emit(); }

  replaceProject(project: CircuitProject): void { this.project = project; this.emit(); }

  private emit() { this.subscribers.forEach((fn) => fn(this.project)); }
}

export const circuitStore = new CircuitStore();
