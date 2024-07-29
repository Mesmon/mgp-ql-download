import axios from 'axios'
import config from '../config'
import { getAccessToken } from './get-access-token'

// Create an Axios instance
const axiosClient = axios.create({
  baseURL: config.apiConfig.host
})

let cachedToken: string | null = null
let tokenExpiration: number | null = null

const getCachedAccessToken = async (): Promise<string> => {
  if (!cachedToken || (tokenExpiration && Date.now() >= tokenExpiration)) {
    const { token, expiresIn } = await getAccessToken()
    cachedToken = token
    tokenExpiration = Date.now() + expiresIn * 1000 // assuming expiresIn is in seconds
  }
  return cachedToken
}

// Set up request interceptor to inject the token
axiosClient.interceptors.request.use(
  async (config) => {
    try {
      const token = await getCachedAccessToken()
      if (config.headers) {
        config.headers.set('Authorization', `Bearer ${token}`)
      } else {
        config.headers = new axios.AxiosHeaders()
        config.headers.set('Authorization', `Bearer ${token}`)
      }
      return config
    } catch (error) {
      console.error('Error fetching access token:', error)
      return Promise.reject(error)
    }
  },
  (error) => {
    console.error('Request error:', error)
    return Promise.reject(error)
  }
)

export { axiosClient }
