import { CircuitProject } from '../model/types';

export const renderSchematicSvg = (project: CircuitProject, width = 1000, height = 700): string => {
  const components = project.components
    .map(
      (c) => `<g transform="translate(${c.position.x},${c.position.y}) rotate(${c.orientation})"><rect x="-20" y="-10" width="40" height="20" fill="white" stroke="black"/><text x="-18" y="-14" font-size="10">${c.reference}</text><text x="-18" y="4" font-size="8">${c.value}</text></g>`
    )
    .join('');
  const wires = project.wires
    .map((w) => {
      const from = project.components.find((c) => c.id === w.from.componentId);
      const to = project.components.find((c) => c.id === w.to.componentId);
      if (!from || !to) return '';
      return `<line x1="${from.position.x}" y1="${from.position.y}" x2="${to.position.x}" y2="${to.position.y}" stroke="blue"/>`;
    })
    .join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><rect width="100%" height="100%" fill="#f7f7f7"/>${wires}${components}</svg>`;
};
