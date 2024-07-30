import { writeFile, mkdir } from 'node:fs/promises'
import path from 'node:path'
import { axiosClient } from './axiosClient'
import config from '../config'

const extractIdFromUrl = (url: string): string => {
  const pattern = /\/items\/(\w+)\/assets/
  const match = url.match(pattern)
  return match ? match[1] : ''
}

export const downloadQuicklookFile = async (
  quicklookUrl: string,
  event: Electron.IpcMainInvokeEvent
): Promise<string> => {
  try {
    const response = await axiosClient.get(quicklookUrl, {
      responseType: 'arraybuffer',
      onDownloadProgress(progressEvent) {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total!)
        event.sender.send('download-progress', percentCompleted)
      }
    })

    const filePath = path.join(
      config.appConfig.downloadPath,
      `${extractIdFromUrl(quicklookUrl)}.png`
    )

    // ensure the download path exists. If it doesn't, create it.
    const downloadDir = path.dirname(filePath)
    await mkdir(downloadDir, { recursive: true })

    await writeFile(filePath, response.data)
    return filePath
  } catch (error) {
    console.error('Error downloading the file:', error)
    throw error
  }
}
