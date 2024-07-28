import axios from 'axios'
import { getCredentials } from '../utils/credentials'
import config from '../config'

export const getAccessToken = async (): Promise<string> => {
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

  const tokenRequestConfig = {
    method: 'post',
    // url: 'https://account.maxar.com/auth/realms/mds/protocol/openid-connect/token',
    url: `${config.tokenHost}/auth/realms/mds/protocol/openid-connect/token`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: data.toString()
  }
  const response = await axios(tokenRequestConfig)
  return response.data.access_token
}
