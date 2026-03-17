import React, { useEffect, useState } from 'react';
import { circuitStore } from './store/circuitStore';
import { ComponentType } from '../core/model/types';
import { createComponent } from '../core/model/circuitModel';
import { AddComponentCommand, MoveComponentCommand, RemoveComponentCommand, RotateComponentCommand, UpdateComponentCommand } from '../core/commands/commands';
import { ComponentLibraryPanel } from './components/ComponentLibraryPanel';
import { PropertiesPanel } from './components/PropertiesPanel';
import { SchematicCanvas } from './components/SchematicCanvas';
import { AIPanel } from './components/AIPanel';
import { AiService } from '../core/ai/aiService';
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
    const key = import.meta.env.VITE_OPENAI_API_KEY;
    if (!key) {
      setAiError('VITE_OPENAI_API_KEY is not set. Configure it in your environment.');
      return;
    }

    try {
      const service = new AiService(key);
      const response = await service.requestEdit(prompt, project);
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
    <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr 280px 320px', gap: 10, padding: 10 }}>
      <ComponentLibraryPanel onAdd={addComponent} />
      <div>
        <div>
          <button onClick={() => selected && circuitStore.dispatch(new RemoveComponentCommand(selected.id))}>Delete</button>
          <button onClick={() => selected && circuitStore.dispatch(new MoveComponentCommand(selected.id, { x: selected.position.x + 10, y: selected.position.y + 10 }))}>Move</button>
          <button onClick={() => selected && circuitStore.dispatch(new RotateComponentCommand(selected.id, ((selected.orientation + 90) % 360) as 0 | 90 | 180 | 270))}>Rotate</button>
          <button onClick={() => circuitStore.undo()}>Undo</button>
          <button onClick={() => circuitStore.redo()}>Redo</button>
        </div>
        <SchematicCanvas project={project} onSelect={setSelectedId} />
      </div>
      <PropertiesPanel component={selected} onUpdate={(patch) => selected && circuitStore.dispatch(new UpdateComponentCommand(selected.id, patch))} />
      <div>
        <AIPanel onAsk={askAi} preview={preview} />
        {aiError ? <p style={{ color: 'crimson' }}>{aiError}</p> : null}
      </div>
    </div>
  );
};
