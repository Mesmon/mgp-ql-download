import storage from 'electron-json-storage'
import { promisify } from 'util'

const storeSet = promisify(storage.set)
const storeGet = promisify(storage.get)

export type Config = {
  apiConfig: {
    tokenHost: string
    host: string
    version: string
    clientId: string
  }
  appConfig: {
    downloadPath: string
  }
}

export const getConfig = async (): Promise<Config> => {
  try {
    const data = await storeGet('config')
    return data as Config
  } catch (error) {
    console.error('Error getting config:', error)
    throw error
  }
}

export const setConfig = async (config: Config): Promise<void> => {
  try {
    await storeSet('config', config)
  } catch (error) {
    console.error('Error setting config:', error)
    throw error
  }
}

const config = await getConfig()

export default config
