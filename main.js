const { app, BrowserWindow } = require("electron");

let win;

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1280,
    height: 1024,
    backgroundColor: "#ffffff",
    // icon: `file://${__dirname}/dist/assets/logo.png`
    // fullscreen: true
  });

  win.loadURL(`http://localhost:8100`);

  //// uncomment below to open the DevTools.
  win.webContents.openDevTools()

  // Event when the window is closed.
  win.on("closed", function() {
    win = null;
  });
  const shell = require("electron").shell;

  win.webContents.on("will-navigate", (event, url) => {
    event.preventDefault();
    console.log( event, url ) ;
    shell.openExternal(url);
  });
}
var exp = require("./server/index.js"); //

// Create window on electron intialization
app.on("ready", function() {
  exp.run(function() {
    createWindow();
  });
});

// Quit when all windows are closed.
app.on("window-all-closed", function() {
  // On macOS specific close process
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function() {
  // macOS specific close process
  if (win === null) {
    exp.run(function() {
      createWindow();
    });
  }
});
