import { app, BrowserWindow, dialog, ipcMain } from 'electron';
import fs from 'node:fs';
import path from 'node:path';
import { AiService } from '../core/ai/aiService';
import { CircuitProject } from '../core/model/types';

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1600,
    height: 900,
    backgroundColor: '#1f2937',
    webPreferences: {
      preload: path.join(__dirname, '../preload/preload.js')
    }
  });

  win.webContents.on('did-fail-load', (_event, code, description, validatedUrl) => {
    console.error(`[Renderer load failed] code=${code}, description=${description}, url=${validatedUrl}`);
    if (!win.webContents.isDevToolsOpened()) win.webContents.openDevTools({ mode: 'detach' });
  });

  win.webContents.on('render-process-gone', (_event, details) => {
    console.error('[Renderer process gone]', details);
    dialog.showErrorBox('Renderer crashed', `Reason: ${details.reason}`);
  });

  const devUrl = process.env.ELECTRON_RENDERER_URL;
  if (devUrl) {
    win.loadURL(devUrl);
    return;
  }

  const rendererHtml = path.join(__dirname, '../renderer/index.html');
  if (!fs.existsSync(rendererHtml)) {
    const help = [
      '<h2>Renderer build not found</h2>',
      '<p>The UI is blank because <code>dist/renderer/index.html</code> is missing.</p>',
      '<p>Run:</p>',
      '<pre>npm install\nnpm run build\nnpm run start</pre>'
    ].join('');
    win.loadURL(`data:text/html,${encodeURIComponent(help)}`);
    return;
  }

  win.loadFile(rendererHtml);
};

ipcMain.handle('ai:request-edit', async (_event, payload: { prompt: string; project: CircuitProject }) => {
  const key = process.env.OPENAI_API_KEY;
  if (!key) {
    throw new Error('OPENAI_API_KEY is not set in main process environment');
  }

  const service = new AiService(key);
  return service.requestEdit(payload.prompt, payload.project);
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
