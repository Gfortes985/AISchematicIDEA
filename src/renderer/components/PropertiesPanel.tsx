import React from 'react';
import { Component } from '../../core/model/types';

export const PropertiesPanel: React.FC<{ component?: Component; onUpdate: (patch: Partial<Component>) => void }> = ({ component, onUpdate }) => {
  if (!component) return <div className="panel"><h3>Properties</h3><p className="muted">Select component on canvas</p></div>;

  return (
    <div className="panel">
      <h3>{component.reference}</h3>
      <div className="field">
        <label>Value</label>
        <input className="input" value={component.value} onChange={(e) => onUpdate({ value: e.target.value })} />
      </div>
      <div className="field">
        <label>Reference</label>
        <input className="input" value={component.reference} onChange={(e) => onUpdate({ reference: e.target.value })} />
      </div>
      <div className="field">
        <label>Footprint</label>
        <input className="input" value={component.footprint} onChange={(e) => onUpdate({ footprint: e.target.value })} />
      </div>
    </div>
  );
};
