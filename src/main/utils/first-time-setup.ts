import storage from 'electron-json-storage'
import { promisify } from 'util'

const storeSet = promisify(storage.set)
const storeHas = promisify(storage.has)

export const firstTimeSetup = async (app: Electron.App): Promise<void> => {
  try {
    const appFirstRun = !(await storeHas('app-first-run'))
    if (appFirstRun) {
      await storeSet('app-first-run', { appFirstRun: false })
      await storeSet('config', {
        apiConfig: {
          tokenHost: 'https://account.maxar.com',
          host: 'https://api.maxar.com',
          version: 'v1',
          clientId: 'mgp'
        },
        appConfig: {
          downloadPath: `${app.getPath('desktop')}/QuickLooks`
        }
      })
    }
  } catch (error) {
    console.error('Error setting up app:', error)
    throw error
  }
}
