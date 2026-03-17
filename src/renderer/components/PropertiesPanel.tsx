import React from 'react';
import { Component } from '../../core/model/types';

export const PropertiesPanel: React.FC<{ component?: Component; onUpdate: (patch: Partial<Component>) => void }> = ({ component, onUpdate }) => {
  if (!component) return <div>Select component</div>;
  return (
    <div>
      <h3>Properties {component.reference}</h3>
      <input value={component.value} onChange={(e) => onUpdate({ value: e.target.value })} />
      <input value={component.reference} onChange={(e) => onUpdate({ reference: e.target.value })} />
      <input value={component.footprint} onChange={(e) => onUpdate({ footprint: e.target.value })} />
    </div>
  );
};
