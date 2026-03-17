import { describe, expect, test } from 'vitest';
import { renderSchematicSvg } from '../src/core/renderer/schematicRenderer';
import { createComponent, createEmptyProject } from '../src/core/model/circuitModel';

describe('schematic renderer', () => {
  test('renders svg with component reference', () => {
    const p = createEmptyProject();
    p.components.push(createComponent('resistor', 'r1', 'R1'));
    const svg = renderSchematicSvg(p);
    expect(svg).toContain('<svg');
    expect(svg).toContain('R1');
  });
});
