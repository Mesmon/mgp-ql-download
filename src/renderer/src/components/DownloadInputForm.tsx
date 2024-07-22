import React, { useState, ChangeEvent, KeyboardEvent } from 'react'

export const DownloadInputForm: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('')
  // const ipcHandle = (value: string): void => window.electron.ipcRenderer.invoke('download', value)

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.target.value)
  }

  const handleSubmit = async (): Promise<void> => {
    try {
      console.log(`Submitting: ${inputValue}`)
      // const x = await ipcHandle(inputValue)
      // console.log(x)
      setInputValue('') // Clear input after submission
    } catch (error) {
      console.log('Mishka')
    }
  }

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      handleSubmit()
    }
  }

  return (
    <div>
      <input type="text" value={inputValue} onChange={handleInputChange} onKeyUp={handleKeyPress} />
      <button className="ts" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  )
}
