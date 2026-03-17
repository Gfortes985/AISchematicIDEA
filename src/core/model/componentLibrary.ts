import { ComponentType, Pin } from './types';

const pins = (names: string[]): Pin[] => names.map((name, i) => ({ id: `p${i + 1}`, name, offset: { x: i * 10, y: 0 } }));

export const COMPONENT_LIBRARY: Record<ComponentType, { defaultValue: string; defaultFootprint: string; pins: Pin[] }> = {
  resistor: { defaultValue: '1k', defaultFootprint: 'R_0805', pins: pins(['1', '2']) },
  capacitor: { defaultValue: '100n', defaultFootprint: 'C_0805', pins: pins(['1', '2']) },
  inductor: { defaultValue: '10uH', defaultFootprint: 'L_0805', pins: pins(['1', '2']) },
  diode: { defaultValue: '1N4148', defaultFootprint: 'D_SOD123', pins: pins(['A', 'K']) },
  led: { defaultValue: 'LED_RED', defaultFootprint: 'LED_0805', pins: pins(['A', 'K']) },
  transistor_npn: { defaultValue: '2N3904', defaultFootprint: 'SOT23', pins: pins(['C', 'B', 'E']) },
  transistor_pnp: { defaultValue: '2N3906', defaultFootprint: 'SOT23', pins: pins(['C', 'B', 'E']) },
  opamp: { defaultValue: 'LM358', defaultFootprint: 'SOIC-8', pins: pins(['OUTA', 'INA-', 'INA+', 'VCC', 'INB+', 'INB-', 'OUTB', 'GND']) },
  ne555: { defaultValue: 'NE555', defaultFootprint: 'DIP-8', pins: pins(['GND', 'TRIG', 'OUT', 'RESET', 'CTRL', 'THR', 'DIS', 'VCC']) },
  ground: { defaultValue: 'GND', defaultFootprint: 'NET_TIE', pins: pins(['GND']) },
  vcc: { defaultValue: 'VCC', defaultFootprint: 'NET_TIE', pins: pins(['VCC']) },
  switch: { defaultValue: 'SW_SPST', defaultFootprint: 'SW_TACT', pins: pins(['1', '2']) },
  connector_2pin: { defaultValue: 'CONN_2', defaultFootprint: 'TERM_2', pins: pins(['1', '2']) },
  connector_3pin: { defaultValue: 'CONN_3', defaultFootprint: 'TERM_3', pins: pins(['1', '2', '3']) }
};
