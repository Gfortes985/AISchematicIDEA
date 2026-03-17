import { app, BrowserWindow, dialog } from 'electron';
import fs from 'node:fs';
import path from 'node:path';

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

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
