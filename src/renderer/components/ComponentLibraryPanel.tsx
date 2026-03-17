import React from 'react';
import { ComponentType } from '../../core/model/types';

const types: ComponentType[] = ['resistor', 'capacitor', 'inductor', 'diode', 'led', 'transistor_npn', 'transistor_pnp', 'opamp', 'ne555', 'ground', 'vcc', 'switch', 'connector_2pin', 'connector_3pin'];

export const ComponentLibraryPanel: React.FC<{ onAdd: (type: ComponentType) => void }> = ({ onAdd }) => (
  <div className="panel">
    <h3>Component Library</h3>
    <p className="muted">Click to place on canvas</p>
    <div className="library-grid">
      {types.map((t) => <button className="btn" key={t} onClick={() => onAdd(t)}>{t}</button>)}
    </div>
  </div>
);
