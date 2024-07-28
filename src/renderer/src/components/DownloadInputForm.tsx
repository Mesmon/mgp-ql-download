import React, { useState } from 'react'
import { toast } from 'react-toastify'

export const DownloadInputForm: React.FC = () => {
  const [catalogId, setCatalogId] = useState<string>('')
  // const ipcHandle = (value: string): void => window.electron.ipcRenderer.invoke('download', value)

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()
    try {
      await window.electron.ipcRenderer.invoke('download-quicklook', JSON.stringify({ catalogId }))
      setCatalogId('') // Clear input after submission
      toast(
        <>
          Successfully downloaded <span style={{ color: 'red' }}>{catalogId}</span>!
        </>,
        { type: 'success' }
      )
    } catch (error) {
      toast((error as Error).message, { type: 'error' })
    }
  }

  return (
    <div>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Catalog ID</label>
          <input value={catalogId} onChange={(e) => setCatalogId(e.target.value)} required />
        </div>
        <button type="submit" className="login-button">
          Download
        </button>
      </form>
    </div>
  )
}
