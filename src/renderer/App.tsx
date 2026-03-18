import React, { useEffect, useState } from 'react';
import { circuitStore } from './store/circuitStore';
import { ComponentType } from '../core/model/types';
import { createComponent } from '../core/model/circuitModel';
import { AddComponentCommand, RemoveComponentCommand, RotateComponentCommand, UpdateComponentCommand } from '../core/commands/commands';
import { ComponentLibraryPanel } from './components/ComponentLibraryPanel';
import { PropertiesPanel } from './components/PropertiesPanel';
import { SchematicCanvas } from './components/SchematicCanvas';
import { AIPanel } from './components/AIPanel';
import { buildPreviewDiff, mapOperationsToCommands } from '../core/ai/editOperationMapper';

export const App: React.FC = () => {
  const [project, setProject] = useState(circuitStore.getState());
  const [selectedId, setSelectedId] = useState<string>();
  const [preview, setPreview] = useState<string[]>([]);
  const [aiError, setAiError] = useState<string>('');

  useEffect(() => circuitStore.subscribe(setProject), []);

  const addComponent = (type: ComponentType) => {
    const id = `${type}_${Date.now()}`;
    const ref = `${type.slice(0, 1).toUpperCase()}${project.components.length + 1}`;
    circuitStore.dispatch(new AddComponentCommand(createComponent(type, id, ref, 100 + project.components.length * 40, 180)));
  };

  const selected = project.components.find((c) => c.id === selectedId);

  const askAi = async (prompt: string) => {
    setAiError('');
    try {
      const response = await window.electronApi.requestAiEdit(prompt, project);
      if (response.mode === 'full_project' && response.fullProject) {
        setPreview(['Replace full project']);
        circuitStore.replaceProject(response.fullProject);
      }
      if (response.mode === 'edit_operations' && response.editOperations) {
        setPreview(buildPreviewDiff(response.editOperations));
        const commands = mapOperationsToCommands(response.editOperations);
        circuitStore.dispatchBatch(commands);
      }
    } catch (error) {
      setAiError(error instanceof Error ? error.message : 'Unknown AI error');
    }
  };

  return (
    <div className="app-root">
      <header className="topbar panel">
        <div>
          <h2>Schematic Studio</h2>
          <p className="muted">Interactive editor + AI assistant</p>
        </div>
        <div className="topbar-stats">
          <span className="badge">Components: {project.components.length}</span>
          <span className="badge">Wires: {project.wires.length}</span>
          <span className="badge">Nets: {project.nets.length}</span>
        </div>
      </header>

      <div className="app-shell">
        <ComponentLibraryPanel onAdd={addComponent} />

        <div className="panel">
          <div className="toolbar">
            <button className="btn btn-danger" onClick={() => selected && circuitStore.dispatch(new RemoveComponentCommand(selected.id))}>Delete</button>
            <button className="btn" onClick={() => selected && circuitStore.dispatch(new RotateComponentCommand(selected.id, ((selected.orientation + 90) % 360) as 0 | 90 | 180 | 270))}>Rotate</button>
            <button className="btn" onClick={() => circuitStore.undo()}>Undo</button>
            <button className="btn" onClick={() => circuitStore.redo()}>Redo</button>
          </div>
          <div className="canvas-wrap">
            <SchematicCanvas project={project} onSelect={setSelectedId} />
          </div>
        </div>

        <PropertiesPanel component={selected} onUpdate={(patch) => selected && circuitStore.dispatch(new UpdateComponentCommand(selected.id, patch))} />

        <div className="panel">
          <AIPanel onAsk={askAi} preview={preview} />
          {aiError ? <p className="error">{aiError}</p> : null}
        </div>
      </div>
    </div>
  );
};
