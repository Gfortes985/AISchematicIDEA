import { app, BrowserWindow } from 'electron';
import path from 'node:path';

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1600,
    height: 900,
    webPreferences: {
      preload: path.join(__dirname, '../preload/preload.js')
    }
  });

  win.loadFile(path.join(__dirname, '../renderer/index.html'));
};

app.whenReady().then(createWindow);
