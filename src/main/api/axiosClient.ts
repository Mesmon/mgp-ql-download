import axios, { AxiosInstance } from 'axios'
import { getAccessToken } from './get-access-token'
import config from '../config'

let axiosClient: AxiosInstance

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

const createAxiosClient = async (): Promise<void> => {
  axiosClient = axios.create({
    baseURL: config.apiConfig.host
  })

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
}

export { axiosClient, createAxiosClient }
