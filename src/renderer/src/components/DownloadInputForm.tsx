import React, { useState } from 'react'
import { toast } from 'react-toastify'

export const DownloadInputForm: React.FC = () => {
  const [catalogIds, setCatalogIds] = useState<string>('')

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()
    try {
      await window.electron.ipcRenderer.invoke('download-quicklook', JSON.stringify({ catalogIds }))
      setCatalogIds('') // Clear input after submission
      toast(
        <>
          Successfully downloaded <span style={{ color: 'red' }}>{catalogIds}</span>!
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
          <input value={catalogIds} onChange={(e) => setCatalogIds(e.target.value)} required />
        </div>
        <button type="submit" className="login-button">
          Download
        </button>
      </form>
    </div>
  )
}
