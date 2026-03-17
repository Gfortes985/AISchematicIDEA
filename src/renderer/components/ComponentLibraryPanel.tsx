import React from 'react';
import { ComponentType } from '../../core/model/types';

const types: ComponentType[] = ['resistor', 'capacitor', 'inductor', 'diode', 'led', 'transistor_npn', 'transistor_pnp', 'opamp', 'ne555', 'ground', 'vcc', 'switch', 'connector_2pin', 'connector_3pin'];

export const ComponentLibraryPanel: React.FC<{ onAdd: (type: ComponentType) => void }> = ({ onAdd }) => (
  <div>
    <h3>Library</h3>
    {types.map((t) => <button key={t} onClick={() => onAdd(t)}>{t}</button>)}
  </div>
);
