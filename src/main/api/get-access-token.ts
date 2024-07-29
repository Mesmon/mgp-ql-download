import axios from 'axios'
import { getCredentials } from '../utils/credentials'
import config from '../config'

export const getAccessToken = async (): Promise<{
  token: string
  expiresIn: number
}> => {
  const credentials = await getCredentials()
  if (!credentials || !credentials.username || !credentials.password) {
    throw new Error('No credentials found')
  }

  const data = new URLSearchParams({
    client_id: config.apiConfig.clientId,
    username: credentials.username,
    password: credentials.password,
    grant_type: 'password',
    scope: 'openid'
  })

  const tokenRequestConfig = {
    method: 'post',
    url: `${config.apiConfig.tokenHost}/auth/realms/mds/protocol/openid-connect/token`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: data.toString()
  }
  const response = await axios(tokenRequestConfig)
  return { token: response.data.access_token, expiresIn: response.data.expires_in }
}
