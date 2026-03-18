import React from 'react';
import { ComponentType } from '../../core/model/types';

const types: ComponentType[] = ['resistor', 'capacitor', 'inductor', 'diode', 'led', 'transistor_npn', 'transistor_pnp', 'opamp', 'ne555', 'ground', 'vcc', 'switch', 'connector_2pin', 'connector_3pin'];

const BASE = 'https://raw.githubusercontent.com/AcheronProject/electrical_template/main';

const iconByType: Record<ComponentType, string> = {
  resistor: `${BASE}/passives/resistors.svg`,
  capacitor: `${BASE}/passives/capacitors.svg`,
  inductor: `${BASE}/passives/inductors_transformers.svg`,
  diode: `${BASE}/passives/diodes.svg`,
  led: `${BASE}/passives/diodes.svg`,
  transistor_npn: `${BASE}/transistors/npn.svg`,
  transistor_pnp: `${BASE}/transistors/pnp.svg`,
  opamp: `${BASE}/amplifiers/amplifiers.svg`,
  ne555: `${BASE}/misc/ic.svg`,
  ground: `${BASE}/misc/labels.svg`,
  vcc: `${BASE}/misc/labels.svg`,
  switch: `${BASE}/misc/labels.svg`,
  connector_2pin: `${BASE}/misc/ic.svg`,
  connector_3pin: `${BASE}/misc/ic.svg`
};

const titleCase = (value: string) => value.replaceAll('_', ' ').replace(/\b\w/g, (m) => m.toUpperCase());

export const ComponentLibraryPanel: React.FC<{ onAdd: (type: ComponentType) => void }> = ({ onAdd }) => (
  <div className="panel library-panel">
    <div className="panel-header-row">
      <h3>Component Library</h3>
      <span className="badge">{types.length}</span>
    </div>
    <p className="muted">Symbols from Acheron electrical template</p>
    <div className="library-grid">
      {types.map((type) => (
        <button className="component-card" key={type} onClick={() => onAdd(type)} title={type}>
          <img className="component-icon-img" src={iconByType[type]} alt={type} loading="lazy" />
          <span className="component-name">{titleCase(type)}</span>
        </button>
      ))}
    </div>
  </div>
);
