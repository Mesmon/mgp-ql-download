import storage from 'electron-json-storage'
import { promisify } from 'util'

const storeSet = promisify(storage.set)
const storeGet = promisify(storage.get)

let config: Config = {
  apiConfig: {
    tokenHost: '',
    host: '',
    version: '',
    clientId: ''
  },
  appConfig: {
    downloadPath: ''
  }
}

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

export const loadConfig = async (): Promise<void> => {
  try {
    config = await getConfig()
  } catch (error) {
    console.error('Error loading config:', error)
    throw error
  }
}

export default config
