import { getAccessToken } from './api/get-access-token'

export const downloadQuicklook = async (catalogId: string): Promise<void> => {
  try {
    const token = await getAccessToken()
    console.log(token, catalogId)
  } catch (error) {
    throw new Error((error as Error).message)
  }
}
