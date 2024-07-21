import React, { useState, ChangeEvent, KeyboardEvent } from 'react'

export const DownloadInputForm: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('')
  const ipcHandle = (value: string): void => window.electron.ipcRenderer.send('download', value)

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.target.value)
  }

  const handleSubmit = (): void => {
    console.log(`Submitting: ${inputValue}`)
    ipcHandle(inputValue)
    setInputValue('') // Clear input after submission
  }

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      handleSubmit()
    }
  }

  return (
    <div>
      <input type="text" value={inputValue} onChange={handleInputChange} onKeyUp={handleKeyPress} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  )
}
