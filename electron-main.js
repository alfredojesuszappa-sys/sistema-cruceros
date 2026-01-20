const { app, BrowserWindow } = require('electron');
const path = require('path');
const express = require('express');

let mainWindow;
let server;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    title: 'Sistema de Gestión de Cruceros',
    icon: path.join(__dirname, 'public', 'favicon.ico'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  // Cargar desde el servidor local
  mainWindow.loadURL('http://localhost:3456');

  // Abrir DevTools en desarrollo
  // mainWindow.webContents.openDevTools();

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

function startServer() {
  const expressApp = express();
  const distPath = path.join(__dirname, 'dist');

  // Servir archivos estáticos
  expressApp.use(express.static(distPath));

  // SPA fallback - todas las rutas devuelven index.html
  expressApp.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });

  server = expressApp.listen(3456, () => {
    console.log('Servidor corriendo en http://localhost:3456');
  });
}

app.on('ready', () => {
  startServer();
  createWindow();
});

app.on('window-all-closed', function () {
  if (server) {
    server.close();
  }
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});
