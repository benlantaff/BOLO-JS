const { app, BrowserWindow, ipcMain, screen } = require("electron");
const path = require("path");
const updater = require("./updater");

/* Keep a global reference of the window objects. If you don't, the windows will
 be closed automatically when the JavaScript object is garbage collected. */
let mainWindow;
let updateWindow;

/* Switch env to 'Dev' while you are working in development mode */
let env = "Dev";

/* Create a new BrowserWindow when `app` is ready */
function createWindows() {
  const primaryDisplay = screen.getPrimaryDisplay();

  mainWindow = new BrowserWindow({
    width: 350,
    height: 300,
    frame: false,
    resizable: false,
    webSecurity: false,
    show: false,
    icon: __dirname + "/icon.png",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  updateWindow = new BrowserWindow({
    width: 300,
    height: 200,
    frame: false,
    resizable: false,
    show: false,
    icon: __dirname + "/icon.png",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      parent: mainWindow,
    },
  });

  practiceWindow = new BrowserWindow({
    width: primaryDisplay.size.width / 2 + 200,
    height: primaryDisplay.size.height / 2 + 200,
    resizable: false,
    movable: true,
    show: false,
    webSecurity: false,
    frame: false,
    icon: __dirname + "/icon.png",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      preload: path.join(__dirname, "practice.js"),
    },
  });

  mainWindow.loadFile("src/index.html");
  updateWindow.loadFile("src/updates.html");

  /* While in Dev mode, turn off automatic updates window */
  if (env == "Dev") {
    updateWindow.close();
    mainWindow.show();
    // Turn on dev tools if needed
    //mainWindow.webContents.openDevTools();
  } else {
    updateWindow.show();
    updater(updateWindow, mainWindow);
  }

  /* Listen for window being closed */
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

// IPC messaging
ipcMain.on("practice", async (e, data) => {
  practiceWindow.loadFile("src/practice.html");
  //practiceWindow.webContents.openDevTools();
  practiceWindow.show();

  mainWindow.close();
});

ipcMain.on("exit", async (e, data) => {
  app.quit();
});

/* When Electron `app` is ready, create the window. */
app.on("ready", createWindows);

/* Quit when all windows are closed */
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

/* When app icon is clicked and app is running, (macOS) recreate the BrowserWindow */
app.on("activate", () => {
  if (mainWindow === null) createWindow();
});
