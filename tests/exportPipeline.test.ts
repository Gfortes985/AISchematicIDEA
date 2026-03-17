import { describe, expect, test } from 'vitest';
import { exportBom, exportKicadIntermediate, exportNetlist, exportProjectJson, exportSvg } from '../src/core/export/exporters';
import { createComponent, createEmptyProject } from '../src/core/model/circuitModel';

describe('export pipeline', () => {
  test('exports all formats', () => {
    const p = createEmptyProject();
    p.components.push(createComponent('resistor', 'r1', 'R1'));
    expect(exportProjectJson(p)).toContain('components');
    expect(exportSvg(p)).toContain('<svg');
    expect(exportNetlist(p)).toBe('');
    expect(exportBom(p)).toContain('qty=1');
    expect(exportKicadIntermediate(p)).toContain('kicad_intermediate');
  });
});
