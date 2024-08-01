import React, { useState, useEffect, useRef } from 'react'
import { toast } from 'react-toastify'
import { getErrorMessage } from './PageManager'

export const DownloadInputForm: React.FC = () => {
  const [catalogIds, setCatalogIds] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const toastId = useRef<string | number | null>(null)

  useEffect(() => {
    const handleDownloadProgress = (_: Electron.IpcRendererEvent, progress: number): void => {
      const progressFraction = progress / 100

      if (toastId.current === null) {
        toastId.current = toast('Download in Progress', { progress: progressFraction })
      } else {
        toast.update(toastId.current, { progress: progressFraction })
      }
    }

    window.electron.ipcRenderer.on('download-progress', handleDownloadProgress)

    return (): void => {
      window.electron.ipcRenderer.removeAllListeners('download-progress')
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()
    setIsLoading(true)
    try {
      toast(`Searching for ${catalogIds}...`, { type: 'info', autoClose: 1500 })
      const filePath: string = await window.electron.ipcRenderer.invoke(
        'download-quicklook',
        JSON.stringify({ catalogIds })
      )
      setCatalogIds('') // Clear input after submission

      toast(
        <div style={{ cursor: 'pointer' }}>
          <span>
            <b>Click to open the folder:</b>
          </span>
          <div>
            Successfully downloaded <span style={{ color: 'red' }}>{catalogIds}</span>!
          </div>
        </div>,
        { type: 'success', onClick: () => window.electron.shell.showItemInFolder(filePath) }
      )
    } catch (error) {
      toast(getErrorMessage((error as Error).message), { type: 'error' })
    } finally {
      setIsLoading(false)
      toast.done(toastId.current!) // Mark toast as done
      toastId.current = null // Reset toastId
    }
  }

  return (
    <div>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Catalog ID</label>
          <input value={catalogIds} onChange={(e) => setCatalogIds(e.target.value)} required />
        </div>
        <button type="submit" className="login-button" disabled={isLoading}>
          {isLoading ? 'Downloading...' : 'Download'}
        </button>
      </form>
    </div>
  )
}
