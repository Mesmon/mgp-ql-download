import Versions from './components/Versions'
import electronLogo from './assets/electron.svg'
import { DownloadInputForm } from './components/DownloadInputForm'

function App(): JSX.Element {
  // const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  return (
    <>
      <img alt="logo" className="logo" src={electronLogo} />
      <div className="creator">Developed by Michael Berezovsky</div>
      <div className="text">
        Download <span className="react">QuickLook</span>
      </div>
      <DownloadInputForm />
      {/* <p className="tip">
        Please try pressing <code>F12</code> to open the devTool
      </p>
      <button className="btn" onClick={ipcHandle}>
        Ping
      </button> */}
      <Versions />
    </>
  )
}

export default App
