import { CircuitProject } from '../model/types';
import { renderSchematicSvg } from '../renderer/schematicRenderer';

export const exportProjectJson = (project: CircuitProject): string => JSON.stringify(project, null, 2);
export const exportSvg = (project: CircuitProject): string => renderSchematicSvg(project);
export const exportPngStub = (_project: CircuitProject): Buffer => Buffer.from('PNG_STUB');
export const exportNetlist = (project: CircuitProject): string =>
  project.wires.map((w) => `${w.netId}: ${w.from.componentId}.${w.from.pinId} -> ${w.to.componentId}.${w.to.pinId}`).join('\n');
export const exportBom = (project: CircuitProject): string => {
  const grouped = new Map<string, string[]>();
  for (const c of project.components) {
    const key = `${c.type}|${c.value}|${c.footprint}`;
    grouped.set(key, [...(grouped.get(key) ?? []), c.reference]);
  }
  return [...grouped.entries()].map(([k, refs]) => `${k},qty=${refs.length},refs=${refs.join(' ')}`).join('\n');
};
export const exportKicadIntermediate = (project: CircuitProject): string =>
  JSON.stringify({ kicad_intermediate: { components: project.components, nets: project.nets, wires: project.wires } }, null, 2);
