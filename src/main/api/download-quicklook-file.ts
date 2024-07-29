import { writeFile } from 'node:fs/promises'
import path from 'node:path'
import { axiosClient } from './axiosClient'
import config from '../config'

const extractIdFromUrl = (url: string): string => {
  const pattern = /\/items\/(\w+)\/assets/
  const match = url.match(pattern)
  return match ? match[1] : ''
}

export const downloadQuicklookFile = async (quicklookUrl: string): Promise<void> => {
  try {
    const response = await axiosClient.get(quicklookUrl, {
      responseType: 'arraybuffer'
    })

    await writeFile(
      path.join(config.appConfig.downloadPath, `${extractIdFromUrl(quicklookUrl)}.png`),
      response.data
    )
  } catch (error) {
    console.error('Error downloading the file:', error)
    throw error
  }
}
