import { COMPONENT_LIBRARY } from './componentLibrary';
import { CircuitProject, Component, ComponentType } from './types';

export const createEmptyProject = (name = 'Untitled'): CircuitProject => ({
  metadata: {
    name,
    author: 'Unknown',
    version: '0.1.0',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  components: [],
  wires: [],
  nets: []
});

export const createComponent = (type: ComponentType, id: string, reference: string, x = 100, y = 100): Component => {
  const blueprint = COMPONENT_LIBRARY[type];
  return {
    id,
    type,
    reference,
    value: blueprint.defaultValue,
    footprint: blueprint.defaultFootprint,
    position: { x, y },
    orientation: 0,
    properties: {},
    pins: blueprint.pins.map((p) => ({ ...p }))
  };
};

export const cloneProject = (project: CircuitProject): CircuitProject => JSON.parse(JSON.stringify(project));
