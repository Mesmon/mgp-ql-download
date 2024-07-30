import Versions from './components/Versions'
import electronLogo from './assets/electron.svg'
import PageManager from './components/PageManager'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App(): JSX.Element {
  return (
    <>
      <img alt="logo" className="logo" src={electronLogo} />
      <div className="creator">Developed by Michael Berezovsky</div>
      <div className="text-no-margin">
        Download <span className="react">QuickLook</span>
      </div>
      <PageManager />
      <Versions />
      <ToastContainer />
    </>
  )
}

export default App
