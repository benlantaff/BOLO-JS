const { autoUpdater } = require('electron-updater');

// Configure log debugging
autoUpdater.logger = require('electron-log');
autoUpdater.logger.transports.file.level = 'info';
autoUpdater.autoDownload = false;

module.exports = (updateWindow, mainWindow) => {
  autoUpdater.logger.info(
    '\n--------      Checking for updates       --------'
  );

  // Check for updates (GitHub releases)
  autoUpdater.checkForUpdates();

  autoUpdater.on('check-for-updates', () => {
    autoUpdater.logger.info(
      '\n--------      Checking for updates       --------'
    );
  });

  autoUpdater.on('update-not-available', () => {
    autoUpdater.logger.info('\n ------ update-not-available listener ------');

    updateWindow.close();

    setTimeout(() => {
      mainWindow.show();
    }, 500);
  });

  // Listen for update found
  autoUpdater.on('update-available', () => {
    autoUpdater.logger.info('\n ------ update-available listener ------');

    let code =
      "document.getElementById('msg').innerHTML = 'Downloading latest version.';";
    updateWindow.webContents.executeJavaScript(code);

    setTimeout(() => {
      autoUpdater.downloadUpdate();
    }, 3000);
  });

  // Listen for update download
  autoUpdater.on('update-downloaded', () => {
    let code =
      "document.getElementById('msg').innerHTML = 'BoloJS will now install and restart.';";

    updateWindow.webContents.executeJavaScript(code);

    setTimeout(() => {
      autoUpdater.quitAndInstall();
    }, 3000);
  });
};
