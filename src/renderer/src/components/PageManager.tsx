import { useQuery } from '@tanstack/react-query'
import { type CredentialsResponse } from '../../../types/CredentialsResponse'
import { DownloadInputForm } from '../components/DownloadInputForm'
import LoginForm from './LoginForm'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import LoadingState from './LoadingState'

const getErrorMessage = (errorMessage: string): string => {
  // Regular expression to match the part after "Error: "
  const regex = /Error: (.*)/

  // Using match to get the desired part
  const match = errorMessage.match(regex)

  // Returning the extracted message if found, otherwise a default message
  return match && match[1] ? match[1] : 'No error message found'
}

const fetchAndVerifyCredentials = async (): Promise<CredentialsResponse> => {
  try {
    const response = await window.electron.ipcRenderer.invoke('check-credentials')
    return response
  } catch (error) {
    if ((error as Error).message.includes('Request failed with status code 401')) {
      throw new Error('Invalid credentials. Please login again.')
    }
    throw new Error(getErrorMessage((error as Error).message))
  }
}

const PageManager = (): JSX.Element => {
  const { data, error, isLoading, isError } = useQuery<CredentialsResponse, Error>({
    queryKey: ['checkCredentials'],
    queryFn: fetchAndVerifyCredentials,
    retry: false,
    refetchOnWindowFocus: false
  })

  const [hasNotified, setHasNotified] = useState(false)

  useEffect(() => {
    if (isError && !hasNotified) {
      toast(error?.message, { type: 'error' })
      setHasNotified(true)
    }
    if (data && !hasNotified) {
      toast('Successfully logged in!', { type: 'success' })
      setHasNotified(true)
    }
  }, [isError, hasNotified, data])

  return (
    <>
      {isLoading && <LoadingState message="Please wait while we check your credentials..." />}
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
