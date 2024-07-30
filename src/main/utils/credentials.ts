import storage from 'electron-json-storage'
import keytar from 'keytar'
import { promisify } from 'util'

const storeSet = promisify(storage.set)
const storeGet = promisify(storage.get)

type Credentials = {
  username: string
  password: string | null
}

const APP_NAME = import.meta.env.MAIN_VITE_APP_NAME || 'swiss'

// Function to save username and password
export async function saveCredentials(username: string, password: string): Promise<void> {
  try {
    // Save username using electron-json-storage
    await storeSet('user', { username })

    // Save password using keytar
    await keytar.setPassword(APP_NAME, username, password)
  } catch (error) {
    console.error('Error saving credentials:', error)
  }
}

// Function to retrieve username and password
export async function getCredentials(): Promise<Credentials> {
  try {
    // Get username using electron-json-storage
    const data = (await storeGet('user')) as { username: string }

    if (data.username) {
      // Get password using keytar
      const password = await keytar.getPassword(APP_NAME, data.username)
      return { username: data.username, password: password }
    } else {
      throw new Error('No username found')
    }
  } catch (error) {
    throw new Error((error as Error).message)
  }
}
