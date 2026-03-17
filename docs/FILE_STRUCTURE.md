# File Structure

- `src/core/model/*`: circuit types, component library, model factory/clone.
- `src/core/commands/*`: command definitions and execution orchestration.
- `src/core/history/*`: undo/redo manager.
- `src/core/ai/*`: OpenAI integration, schema and validation.
- `src/core/renderer/*`: schematic SVG rendering.
- `src/core/export/*`: export pipeline.
- `src/core/io/*`: save/open project.
- `src/renderer/*`: React app, canvas, panels, store.
- `src/main/*`, `src/preload/*`: Electron shell.
- `tests/*`: command/history/model/AI/renderer/export tests.
