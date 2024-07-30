import { downloadQuicklookFile } from './api/download-quicklook-file'
import { searchImage } from './api/search-image'

export const downloadQuicklook = async (
  catalogIds: string,
  event: Electron.IpcMainInvokeEvent
): Promise<void> => {
  try {
    const imageData = await searchImage(catalogIds)
    if (imageData.features.length === 0) {
      throw new Error('No images found')
    }
    const quicklookUrl = imageData.features[0].assets.browse.href
    await downloadQuicklookFile(quicklookUrl, event)
  } catch (error) {
    throw new Error((error as Error).message)
  }
}
