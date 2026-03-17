import { Command } from '../commands/types';
import { cloneProject } from '../model/circuitModel';
import { CircuitProject, HistorySnapshot } from '../model/types';

export class HistoryManager {
  private undoStack: HistorySnapshot[] = [];
  private redoStack: HistorySnapshot[] = [];

  execute(command: Command, project: CircuitProject): CircuitProject {
    this.undoStack.push({ timestamp: new Date().toISOString(), label: command.label, project: cloneProject(project) });
    this.redoStack = [];
    return command.execute(cloneProject(project));
  }

  undo(current: CircuitProject): CircuitProject {
    const prev = this.undoStack.pop();
    if (!prev) return current;
    this.redoStack.push({ timestamp: new Date().toISOString(), label: `redo:${prev.label}`, project: cloneProject(current) });
    return cloneProject(prev.project);
  }

  redo(current: CircuitProject): CircuitProject {
    const next = this.redoStack.pop();
    if (!next) return current;
    this.undoStack.push({ timestamp: new Date().toISOString(), label: `undo:${next.label}`, project: cloneProject(current) });
    return cloneProject(next.project);
  }

  canUndo(): boolean { return this.undoStack.length > 0; }
  canRedo(): boolean { return this.redoStack.length > 0; }
}
