import React from 'react';
import { CircuitProject } from '../../core/model/types';

export const SchematicCanvas: React.FC<{ project: CircuitProject; onSelect: (id: string) => void }> = ({ project, onSelect }) => (
  <svg width={920} height={640} className="canvas">
    {project.wires.map((w) => {
      const from = project.components.find((c) => c.id === w.from.componentId);
      const to = project.components.find((c) => c.id === w.to.componentId);
      if (!from || !to) return null;
      return <line key={w.id} x1={from.position.x} y1={from.position.y} x2={to.position.x} y2={to.position.y} stroke="#5ca8ff" strokeWidth="2" />;
    })}
    {project.components.map((c) => (
      <g key={c.id} transform={`translate(${c.position.x}, ${c.position.y}) rotate(${c.orientation})`} onClick={() => onSelect(c.id)} style={{ cursor: 'pointer' }}>
        <rect x={-28} y={-14} width={56} height={28} fill="#cfd8ea" stroke="#15233f" rx="6" />
        <text x={-22} y={-18} fontSize={10} fill="#9fc4ff">{c.reference}</text>
        <text x={-22} y={4} fontSize={10} fill="#0e1a2f">{c.value}</text>
      </g>
    ))}
  </svg>
);
