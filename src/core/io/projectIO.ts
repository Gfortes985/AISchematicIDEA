import fs from 'node:fs';
import { CircuitProject } from '../model/types';

export const saveProject = (path: string, project: CircuitProject): void => fs.writeFileSync(path, JSON.stringify(project, null, 2), 'utf-8');
export const openProject = (path: string): CircuitProject => JSON.parse(fs.readFileSync(path, 'utf-8')) as CircuitProject;
