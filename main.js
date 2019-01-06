// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600})

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

var http = require('http');
var fs = require('fs');

http.createServer(function (req, res) {
    res.setHeader('Set-Cookie', 'MyCookie=2');
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(`<!doctype html>
<html>
    <head>
        <title>localhost</title>
    </head>
    <body>
        <h1>localhost</h1>
        <pre>${req.headers.cookie}</pre>
        ` +
        (req.url === '/' ? `
        <script>
            setTimeout(() => {
                location.href = 'http://localhost?' + Date.now();
            }, 1000);
        </script>` : '') + `
    </body>
</html>`);
}).listen(80);
