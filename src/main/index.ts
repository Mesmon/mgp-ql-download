import { app, shell, BrowserWindow, ipcMain, dialog } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import { updateElectronApp } from 'update-electron-app'
import icon from '../../resources/icon.png?asset'
import { downloadQuicklook } from './api/download-quicklook'
import { getCredentials, saveCredentials } from './utils/credentials'
import { getAccessToken } from './api/get-access-token'
import { firstTimeSetup } from './utils/first-time-setup'
import config, { loadConfig, setConfig } from './config'
import { createAxiosClient } from './api/axiosClient'
import log from 'electron-log/main'

log.initialize()

if (require('electron-squirrel-startup')) app.quit()

updateElectronApp()

const initializeApp = async (app: Electron.App): Promise<void> => {
  log.info('Starting first time setup...')
  await firstTimeSetup(app)
  log.info('First time setup completed.')

  log.info('Loading configuration...')
  await loadConfig()
  log.info('Configuration loaded.')

  log.info('Creating Axios client...')
  await createAxiosClient()
  log.info('Axios client created.')
}

function createWindow(): void {
  log.info('Creating main browser window...')
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    log.info('Main window ready to show.')
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

app.whenReady().then(async () => {
  log.info('App is ready.')

  await initializeApp(app)
  log.info('App initialization completed.')

  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  ipcMain.handle('download-quicklook', async (event, catalogIds) => {
    log.info('Handling download-quicklook IPC event.')
    return await downloadQuicklook(JSON.parse(catalogIds).catalogIds, event)
  })

  ipcMain.handle('check-credentials', async () => {
    log.info('Handling check-credentials IPC event.')
    const result = await getCredentials()
    await getAccessToken()
    return { status: 200, data: result }
  })

  ipcMain.handle('save-credentials', async (_, data) => {
    log.info('Handling save-credentials IPC event.')
    const { username, password } = JSON.parse(data)
    await saveCredentials(username, password)
  })

  ipcMain.handle('get-config', async () => {
    log.info('Handling get-config IPC event.')
    return config
  })

  ipcMain.handle('set-config', async (_, data) => {
    log.info('Handling set-config IPC event.')
    await setConfig(data)
    await loadConfig()
  })

  ipcMain.handle('select-download-path', async () => {
    log.info('Handling select-download-path IPC event.')
    const result = await dialog.showOpenDialog({
      properties: ['openDirectory'],
      defaultPath: config.appConfig.downloadPath
    })
    if (!result.canceled) {
      const path = result.filePaths[0]
      await setConfig({ ...config, appConfig: { ...config.appConfig, downloadPath: path } })
      await loadConfig()
      log.info(`Download path set to ${path}.`)

      BrowserWindow.getAllWindows().forEach((window) => {
        window.webContents.send('config-changed')
      })
    }
  })

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
