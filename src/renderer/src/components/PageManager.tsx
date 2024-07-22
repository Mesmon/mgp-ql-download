import { useQuery } from '@tanstack/react-query'
import { CredentialsResponse } from '../types/CredentialsResponse'
import { DownloadInputForm } from '../components/DownloadInputForm'
import LoginForm from './LoginForm'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'

const fetchCredentials = async (): Promise<CredentialsResponse> => {
  try {
    const response = await window.electron.ipcRenderer.invoke('check-credentials')
    return response
  } catch (error) {
    throw new Error('Failed to fetch credentials')
  }
}
const PageManager = (): JSX.Element => {
  const { data, error, isLoading, isError } = useQuery<CredentialsResponse, Error>({
    queryKey: ['checkCredentials'],
    queryFn: fetchCredentials,
    retry: false, // Disable automatic retries
    refetchOnWindowFocus: false // Disable refetch on window focus
  })

  const [hasNotified, setHasNotified] = useState(false)

  useEffect(() => {
    if (isError && !hasNotified) {
      toast(error?.message, { type: 'error' })
      setHasNotified(true)
    }
  }, [isError, hasNotified])

  return (
    <>
      {isLoading && <div>Loading credentials...</div>}
      {isError && <LoginForm />}
      {data && (
        <div>
          <DownloadInputForm />
        </div>
      )}
    </>
  )
}

export default PageManager
