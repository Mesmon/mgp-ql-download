import config from '../config'
import { type FeatureCollection } from '../../types/FeatureCollection'
import { axiosClient } from './axiosClient'
import { isAxiosError } from 'axios'

export const searchImage = async (catalogIds: string): Promise<FeatureCollection> => {
  try {
    const url = `/discovery/${config.apiConfig.version}/search?ids=${catalogIds}`

    const imageData = await axiosClient.get<FeatureCollection>(url)
    return imageData.data
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.message || error.message)
    }
    throw new Error((error as Error).message)
  }
}
