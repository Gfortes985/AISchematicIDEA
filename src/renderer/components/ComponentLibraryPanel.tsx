import React from 'react';
import { ComponentType } from '../../core/model/types';

const types: ComponentType[] = ['resistor', 'capacitor', 'inductor', 'diode', 'led', 'transistor_npn', 'transistor_pnp', 'opamp', 'ne555', 'ground', 'vcc', 'switch', 'connector_2pin', 'connector_3pin'];

const symbolByType: Record<ComponentType, React.ReactNode> = {
  resistor: <polyline points="8,20 14,12 20,28 26,12 32,28 38,12 44,20" />,
  capacitor: <><line x1="16" y1="10" x2="16" y2="30" /><line x1="28" y1="10" x2="28" y2="30" /></>,
  inductor: <><path d="M10 20 q4 -8 8 0 q4 -8 8 0 q4 -8 8 0 q4 -8 8 0" /></>,
  diode: <><polygon points="14,12 30,20 14,28" /><line x1="32" y1="10" x2="32" y2="30" /></>,
  led: <><polygon points="14,12 30,20 14,28" /><line x1="32" y1="10" x2="32" y2="30" /><polyline points="34,12 40,8 38,14" /><polyline points="36,18 42,14 40,20" /></>,
  transistor_npn: <><circle cx="22" cy="20" r="10" /><line x1="22" y1="10" x2="22" y2="3" /><line x1="14" y1="24" x2="5" y2="30" /><polyline points="26,24 36,30 32,30" /></>,
  transistor_pnp: <><circle cx="22" cy="20" r="10" /><line x1="22" y1="10" x2="22" y2="3" /><line x1="14" y1="24" x2="5" y2="30" /><polyline points="31,29 24,24 29,23" /></>,
  opamp: <polygon points="10,10 36,20 10,30" />,
  ne555: <rect x="10" y="8" width="28" height="24" rx="3" />,
  ground: <><line x1="24" y1="8" x2="24" y2="16" /><line x1="14" y1="18" x2="34" y2="18" /><line x1="17" y1="22" x2="31" y2="22" /><line x1="20" y1="26" x2="28" y2="26" /></>,
  vcc: <><line x1="24" y1="30" x2="24" y2="12" /><polyline points="17,16 24,8 31,16" /></>,
  switch: <><line x1="8" y1="24" x2="18" y2="24" /><line x1="26" y1="16" x2="40" y2="16" /><line x1="18" y1="24" x2="26" y2="16" /></>,
  connector_2pin: <><rect x="10" y="10" width="28" height="20" rx="4" /><circle cx="18" cy="20" r="2.5" /><circle cx="30" cy="20" r="2.5" /></>,
  connector_3pin: <><rect x="8" y="10" width="32" height="20" rx="4" /><circle cx="16" cy="20" r="2.5" /><circle cx="24" cy="20" r="2.5" /><circle cx="32" cy="20" r="2.5" /></>
};

const titleCase = (value: string) => value.replaceAll('_', ' ').replace(/\b\w/g, (m) => m.toUpperCase());

export const ComponentLibraryPanel: React.FC<{ onAdd: (type: ComponentType) => void }> = ({ onAdd }) => (
  <div className="panel library-panel">
    <div className="panel-header-row">
      <h3>Component Library</h3>
      <span className="badge">{types.length}</span>
    </div>
    <p className="muted">Нажмите на карточку, чтобы добавить на холст</p>
    <div className="library-grid">
      {types.map((type) => (
        <button className="component-card" key={type} onClick={() => onAdd(type)} title={type}>
          <svg viewBox="0 0 48 40" className="component-icon" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {symbolByType[type]}
          </svg>
          <span className="component-name">{titleCase(type)}</span>
        </button>
      ))}
    </div>
  </div>
);
