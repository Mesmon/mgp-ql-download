import axios from 'axios'
import { getCredentials } from '../utils/credentials'

export const getAccessToken = async (): Promise<string> => {
  try {
    const credentials = await getCredentials()
    if (!credentials || !credentials.username || !credentials.password) {
      throw new Error('No credentials found')
    }

    const data = new URLSearchParams({
      client_id: 'mgp',
      username: credentials.username,
      password: credentials.password,
      grant_type: 'password',
      scope: 'openid'
    })

    const config = {
      method: 'post',
      url: 'https://account.maxar.com/auth/realms/mds/protocol/openid-connect/token',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: data.toString()
    }
    const response = await axios.request(config)
    return response.data.access_token
  } catch (error) {
    throw new Error((error as Error).message)
  }
}
