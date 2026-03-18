export type ComponentType =
  | 'resistor'
  | 'capacitor'
  | 'inductor'
  | 'diode'
  | 'led'
  | 'transistor_npn'
  | 'transistor_pnp'
  | 'opamp'
  | 'ne555'
  | 'ground'
  | 'vcc'
  | 'switch'
  | 'connector_2pin'
  | 'connector_3pin';

export interface Point {
  x: number;
  y: number;
}

export interface Pin {
  id: string;
  name: string;
  netId?: string;
  offset: Point;
}

export interface Component {
  id: string;
  type: ComponentType;
  reference: string;
  value: string;
  footprint: string;
  position: Point;
  orientation: 0 | 90 | 180 | 270;
  properties: Record<string, string>;
  pins: Pin[];
}

export interface Wire {
  id: string;
  from: { componentId: string; pinId: string };
  to: { componentId: string; pinId: string };
  netId: string;
}

export interface Net {
  id: string;
  name: string;
}

export interface ProjectMetadata {
  name: string;
  author: string;
  version: string;
  createdAt: string;
  updatedAt: string;
}

export interface CircuitProject {
  metadata: ProjectMetadata;
  components: Component[];
  wires: Wire[];
  nets: Net[];
}

export interface HistorySnapshot {
  timestamp: string;
  label: string;
  project: CircuitProject;
}
