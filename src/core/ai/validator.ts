import { AiStructuredResponse } from './types';

export const validateAiResponse = (data: unknown): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];
  const d = data as AiStructuredResponse;
  if (!d || typeof d !== 'object') errors.push('response must be object');
  if (d.mode !== 'full_project' && d.mode !== 'edit_operations') errors.push('mode invalid');
  if (!Array.isArray(d.safetyNotes)) errors.push('safetyNotes must be array');
  if (d.mode === 'full_project' && !d.fullProject) errors.push('fullProject required for full_project mode');
  if (d.mode === 'edit_operations' && !Array.isArray(d.editOperations)) errors.push('editOperations required for edit_operations mode');
  return { valid: errors.length === 0, errors };
};
