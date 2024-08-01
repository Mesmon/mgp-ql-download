import { downloadQuicklookFile } from './download-quicklook-file'
import { searchImage } from './search-image'

export const downloadQuicklook = async (
  catalogIds: string,
  event: Electron.IpcMainInvokeEvent
): Promise<string> => {
  try {
    const imageData = await searchImage(catalogIds)
    if (imageData.features.length === 0) {
      throw new Error('No images found')
    }
    const quicklookUrl = imageData.features[0].assets.browse.href
    return await downloadQuicklookFile(quicklookUrl, event)
  } catch (error) {
    throw new Error((error as Error).message)
  }
}
