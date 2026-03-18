import { AiStructuredResponse } from '../core/ai/types';
import { CircuitProject } from '../core/model/types';

declare global {
  interface Window {
    electronApi: {
      ping: () => string;
      requestAiEdit: (prompt: string, project: CircuitProject) => Promise<AiStructuredResponse>;
    };
  }
}

export {};
