import { CircuitProject } from '../model/types';

export interface Command {
  label: string;
  execute(project: CircuitProject): CircuitProject;
  undo(project: CircuitProject): CircuitProject;
}
