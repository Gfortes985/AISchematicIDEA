import React, { useMemo, useState } from 'react';
import { CircuitProject, Component } from '../../core/model/types';
import { ConnectPinsCommand, MoveComponentCommand } from '../../core/commands/commands';
import { circuitStore } from '../store/circuitStore';

const getPinPoint = (component: Component, pinIndex: number, pinCount: number, pos: { x: number; y: number }) => {
  const spacing = 56 / (pinCount + 1);
  return {
    x: pos.x - 28 + spacing * (pinIndex + 1),
    y: pos.y + 17
  };
};

export const SchematicCanvas: React.FC<{ project: CircuitProject; onSelect: (id: string) => void }> = ({ project, onSelect }) => {
  const [dragging, setDragging] = useState<{ id: string; startX: number; startY: number; initialX: number; initialY: number } | null>(null);
  const [dragPositions, setDragPositions] = useState<Record<string, { x: number; y: number }>>({});
  const [linkSource, setLinkSource] = useState<{ componentId: string; pinId: string } | null>(null);

  const positionOf = (component: Component) => dragPositions[component.id] ?? component.position;

  const pinMap = useMemo(() => {
    const map = new Map<string, { x: number; y: number }>();
    for (const component of project.components) {
      const pos = positionOf(component);
      component.pins.forEach((pin, idx) => {
        const p = getPinPoint(component, idx, component.pins.length, pos);
        map.set(`${component.id}:${pin.id}`, p);
      });
    }
    return map;
  }, [project.components, dragPositions]);

  const onMouseMove: React.MouseEventHandler<SVGSVGElement> = (event) => {
    if (!dragging) return;
    const dx = event.clientX - dragging.startX;
    const dy = event.clientY - dragging.startY;
    setDragPositions((prev) => ({
      ...prev,
      [dragging.id]: { x: dragging.initialX + dx, y: dragging.initialY + dy }
    }));
  };

  const finishDrag = () => {
    if (!dragging) return;
    const newPos = dragPositions[dragging.id] ?? { x: dragging.initialX, y: dragging.initialY };
    circuitStore.dispatch(new MoveComponentCommand(dragging.id, newPos));
    setDragging(null);
    setDragPositions((prev) => {
      const next = { ...prev };
      delete next[dragging.id];
      return next;
    });
  };

  const handlePinClick = (componentId: string, pinId: string) => {
    if (!linkSource) {
      setLinkSource({ componentId, pinId });
      return;
    }

    if (linkSource.componentId === componentId && linkSource.pinId === pinId) {
      setLinkSource(null);
      return;
    }

    const wireId = `wire_${Date.now()}`;
    const netId = `NET_${project.nets.length + 1}`;
    circuitStore.dispatch(
      new ConnectPinsCommand({
        id: wireId,
        from: linkSource,
        to: { componentId, pinId },
        netId
      })
    );
    setLinkSource(null);
  };

  return (
    <svg width={980} height={680} className="canvas" onMouseMove={onMouseMove} onMouseUp={finishDrag} onMouseLeave={finishDrag}>
      {project.wires.map((wire) => {
        const from = pinMap.get(`${wire.from.componentId}:${wire.from.pinId}`);
        const to = pinMap.get(`${wire.to.componentId}:${wire.to.pinId}`);
        if (!from || !to) return null;
        return <line key={wire.id} x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke="#5ca8ff" strokeWidth="2.5" />;
      })}

      {project.components.map((component) => {
        const pos = positionOf(component);
        return (
          <g
            key={component.id}
            transform={`translate(${pos.x}, ${pos.y}) rotate(${component.orientation})`}
            onMouseDown={(event) => {
              onSelect(component.id);
              setDragging({
                id: component.id,
                startX: event.clientX,
                startY: event.clientY,
                initialX: pos.x,
                initialY: pos.y
              });
            }}
            style={{ cursor: 'grab' }}
          >
            <rect x={-30} y={-16} width={60} height={32} fill="#cfd8ea" stroke="#15233f" rx="7" />
            <text x={-26} y={-20} fontSize={10} fill="#9fc4ff">{component.reference}</text>
            <text x={-24} y={4} fontSize={10} fill="#0e1a2f">{component.value}</text>
          </g>
        );
      })}

      {project.components.flatMap((component) => {
        const pos = positionOf(component);
        return component.pins.map((pin, index) => {
          const point = getPinPoint(component, index, component.pins.length, pos);
          const selected = linkSource?.componentId === component.id && linkSource.pinId === pin.id;
          return (
            <g key={`${component.id}_${pin.id}`} onClick={() => handlePinClick(component.id, pin.id)} style={{ cursor: 'crosshair' }}>
              <circle cx={point.x} cy={point.y} r={5.5} fill={selected ? '#ffd166' : '#84b2ff'} stroke="#0f1a2f" />
              <text x={point.x + 7} y={point.y - 6} fontSize={9} fill="#9ec1ff">{pin.name}</text>
            </g>
          );
        });
      })}
    </svg>
  );
};
