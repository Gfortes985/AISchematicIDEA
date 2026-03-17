import { CircuitProject, ComponentType, Point } from '../model/types';

export type AiMode = 'full_project' | 'edit_operations';

export type AiEditOperation =
  | { op: 'add_component'; type: ComponentType; id: string; reference: string; position: Point }
  | { op: 'remove_component'; componentId: string }
  | { op: 'move_component'; componentId: string; position: Point }
  | { op: 'rotate_component'; componentId: string; orientation: 0 | 90 | 180 | 270 }
  | { op: 'connect_pins'; wireId: string; from: { componentId: string; pinId: string }; to: { componentId: string; pinId: string }; netId: string }
  | { op: 'disconnect_pins'; wireId: string }
  | { op: 'update_component'; componentId: string; patch: Partial<{ value: string; reference: string; footprint: string; properties: Record<string, string> }> }
  | { op: 'rename_net'; netId: string; name: string }
  | { op: 'change_footprint'; componentId: string; footprint: string };

export interface AiStructuredResponse {
  mode: AiMode;
  safetyNotes: string[];
  fullProject?: CircuitProject;
  editOperations?: AiEditOperation[];
}
