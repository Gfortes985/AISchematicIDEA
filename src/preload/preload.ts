import { contextBridge, ipcRenderer } from 'electron';
import { CircuitProject } from '../core/model/types';

contextBridge.exposeInMainWorld('electronApi', {
  ping: () => 'pong',
  requestAiEdit: (prompt: string, project: CircuitProject) => ipcRenderer.invoke('ai:request-edit', { prompt, project })
});
