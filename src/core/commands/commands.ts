import { Command } from './types';
import { cloneProject } from '../model/circuitModel';
import { CircuitProject, Component, Point, Wire } from '../model/types';

const touch = (project: CircuitProject) => {
  project.metadata.updatedAt = new Date().toISOString();
  return project;
};

export class AddComponentCommand implements Command {
  label = 'AddComponent';
  constructor(private component: Component) {}
  execute(project: CircuitProject): CircuitProject { const p = cloneProject(project); p.components.push(this.component); return touch(p); }
  undo(project: CircuitProject): CircuitProject { const p = cloneProject(project); p.components = p.components.filter((c) => c.id !== this.component.id); return touch(p); }
}

export class RemoveComponentCommand implements Command {
  label = 'RemoveComponent';
  private removed?: Component;
  private removedWires: Wire[] = [];
  constructor(private componentId: string) {}
  execute(project: CircuitProject): CircuitProject {
    const p = cloneProject(project);
    this.removed = p.components.find((c) => c.id === this.componentId);
    this.removedWires = p.wires.filter((w) => w.from.componentId === this.componentId || w.to.componentId === this.componentId);
    p.components = p.components.filter((c) => c.id !== this.componentId);
    p.wires = p.wires.filter((w) => !this.removedWires.some((rw) => rw.id === w.id));
    return touch(p);
  }
  undo(project: CircuitProject): CircuitProject {
    const p = cloneProject(project);
    if (this.removed) p.components.push(this.removed);
    p.wires.push(...this.removedWires);
    return touch(p);
  }
}

export class MoveComponentCommand implements Command {
  label = 'MoveComponent';
  private oldPosition?: Point;
  constructor(private componentId: string, private position: Point) {}
  execute(project: CircuitProject): CircuitProject {
    const p = cloneProject(project);
    const c = p.components.find((x) => x.id === this.componentId); if (!c) return p;
    this.oldPosition = c.position; c.position = this.position; return touch(p);
  }
  undo(project: CircuitProject): CircuitProject {
    const p = cloneProject(project);
    const c = p.components.find((x) => x.id === this.componentId); if (!c || !this.oldPosition) return p;
    c.position = this.oldPosition; return touch(p);
  }
}

export class RotateComponentCommand implements Command {
  label = 'RotateComponent';
  private oldOrientation?: 0 | 90 | 180 | 270;
  constructor(private componentId: string, private orientation: 0 | 90 | 180 | 270) {}
  execute(project: CircuitProject): CircuitProject {
    const p = cloneProject(project); const c = p.components.find((x) => x.id === this.componentId); if (!c) return p;
    this.oldOrientation = c.orientation; c.orientation = this.orientation; return touch(p);
  }
  undo(project: CircuitProject): CircuitProject {
    const p = cloneProject(project); const c = p.components.find((x) => x.id === this.componentId); if (!c || this.oldOrientation === undefined) return p;
    c.orientation = this.oldOrientation; return touch(p);
  }
}

export class ConnectPinsCommand implements Command {
  label = 'ConnectPins';
  constructor(private wire: Wire) {}
  execute(project: CircuitProject): CircuitProject {
    const p = cloneProject(project);
    p.wires.push(this.wire);
    if (!p.nets.find((n) => n.id === this.wire.netId)) p.nets.push({ id: this.wire.netId, name: this.wire.netId });
    return touch(p);
  }
  undo(project: CircuitProject): CircuitProject { const p = cloneProject(project); p.wires = p.wires.filter((w) => w.id !== this.wire.id); return touch(p); }
}

export class DisconnectPinsCommand implements Command {
  label = 'DisconnectPins';
  private removed?: Wire;
  constructor(private wireId: string) {}
  execute(project: CircuitProject): CircuitProject {
    const p = cloneProject(project); this.removed = p.wires.find((w) => w.id === this.wireId);
    p.wires = p.wires.filter((w) => w.id !== this.wireId); return touch(p);
  }
  undo(project: CircuitProject): CircuitProject { const p = cloneProject(project); if (this.removed) p.wires.push(this.removed); return touch(p); }
}

export class UpdateComponentCommand implements Command {
  label = 'UpdateComponent';
  private before?: Component;
  constructor(private componentId: string, private patch: Partial<Component>) {}
  execute(project: CircuitProject): CircuitProject {
    const p = cloneProject(project); const idx = p.components.findIndex((c) => c.id === this.componentId); if (idx === -1) return p;
    this.before = cloneProject({ ...p, components: [p.components[idx]], wires: [], nets: [] }).components[0];
    p.components[idx] = { ...p.components[idx], ...this.patch };
    return touch(p);
  }
  undo(project: CircuitProject): CircuitProject {
    const p = cloneProject(project); const idx = p.components.findIndex((c) => c.id === this.componentId); if (idx === -1 || !this.before) return p;
    p.components[idx] = this.before; return touch(p);
  }
}

export class RenameNetCommand implements Command {
  label = 'RenameNet';
  private previous?: string;
  constructor(private netId: string, private name: string) {}
  execute(project: CircuitProject): CircuitProject {
    const p = cloneProject(project); const n = p.nets.find((x) => x.id === this.netId); if (!n) return p;
    this.previous = n.name; n.name = this.name; return touch(p);
  }
  undo(project: CircuitProject): CircuitProject {
    const p = cloneProject(project); const n = p.nets.find((x) => x.id === this.netId); if (!n || !this.previous) return p;
    n.name = this.previous; return touch(p);
  }
}

export class ChangeFootprintCommand implements Command {
  label = 'ChangeFootprint';
  private previous?: string;
  constructor(private componentId: string, private footprint: string) {}
  execute(project: CircuitProject): CircuitProject {
    const p = cloneProject(project); const c = p.components.find((x) => x.id === this.componentId); if (!c) return p;
    this.previous = c.footprint; c.footprint = this.footprint; return touch(p);
  }
  undo(project: CircuitProject): CircuitProject {
    const p = cloneProject(project); const c = p.components.find((x) => x.id === this.componentId); if (!c || !this.previous) return p;
    c.footprint = this.previous; return touch(p);
  }
}
