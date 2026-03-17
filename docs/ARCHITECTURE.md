# Architecture

## Layers
1. **Domain model (`src/core/model`)**: canonical `CircuitProject` with metadata, components, pins, wires, nets, placement, orientation and footprint mapping.
2. **Command engine (`src/core/commands`)**: all mutations represented as commands and executed only through `CommandEngine`.
3. **History (`src/core/history`)**: undo/redo snapshots shared by manual and AI editing.
4. **Store (`src/renderer/store/circuitStore.ts`)**: single source of truth for UI and AI.
5. **Renderer/UI (`src/renderer`)**: React UI panels + schematic canvas. UI dispatches commands only.
6. **AI integration (`src/core/ai`)**: OpenAI call, structured-response validation, edit operation mapping to commands, preview diff.
7. **Export/IO (`src/core/export`, `src/core/io`)**: JSON/SVG/PNG/netlist/BOM/KiCad intermediate and save/open.

## Editing flow
- Manual action -> UI event -> command instance -> `circuitStore.dispatch` -> command engine -> history snapshot -> new project state -> renderer refresh.
- AI action -> prompt -> OpenAI structured response -> validator -> preview diff -> operations mapped to commands -> `dispatchBatch`.

## Extensibility
- New mutations added via new Command classes.
- AI operations extend union type + mapper.
- Exporters are isolated pure functions.
