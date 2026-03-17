import React from 'react';
import { CircuitProject } from '../../core/model/types';

export const SchematicCanvas: React.FC<{ project: CircuitProject; onSelect: (id: string) => void }> = ({ project, onSelect }) => (
  <svg width={900} height={600} style={{ border: '1px solid #ccc' }}>
    {project.wires.map((w) => {
      const from = project.components.find((c) => c.id === w.from.componentId);
      const to = project.components.find((c) => c.id === w.to.componentId);
      if (!from || !to) return null;
      return <line key={w.id} x1={from.position.x} y1={from.position.y} x2={to.position.x} y2={to.position.y} stroke="blue" />;
    })}
    {project.components.map((c) => (
      <g key={c.id} transform={`translate(${c.position.x}, ${c.position.y}) rotate(${c.orientation})`} onClick={() => onSelect(c.id)}>
        <rect x={-20} y={-10} width={40} height={20} fill="white" stroke="black" />
        <text x={-18} y={-12} fontSize={8}>{c.reference}</text>
        <text x={-18} y={3} fontSize={8}>{c.value}</text>
      </g>
    ))}
  </svg>
);
