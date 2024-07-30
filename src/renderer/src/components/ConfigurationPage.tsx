import React from 'react'
import { Box, TextField, Typography, Button, CircularProgress } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { styled } from '@mui/system'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import FolderOpenButton from './FolderOpenButton'

export type Config = {
  apiConfig: {
    tokenHost: string
    host: string
    version: string
    clientId: string
  }
  appConfig: {
    downloadPath: string
  }
}

const theme = createTheme({
  palette: {
    text: {
      primary: '#ffffff' // Brighter text color
    }
  }
})

const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#ffffff'
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#ffffff'
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#ffffff'
    },
    '&:hover fieldset': {
      borderColor: '#ffffff'
    },
    '&.Mui-focused fieldset': {
      borderColor: '#ffffff'
    }
  }
})

const ConfigurationPage = (): React.JSX.Element => {
  const [config, setConfig] = React.useState<Config | null>(null)
  const [loading, setLoading] = React.useState<boolean>(true)
  const toastId = React.useRef<string | number | null>(null)

  React.useEffect(() => {
    if (!loading) return
    window.electron.ipcRenderer.invoke('get-config').then((config) => {
      setConfig(config)
      setLoading(false)
    })
  }, [loading])

  React.useEffect(() => {
    // listen to changes in config
    window.electron.ipcRenderer.on('config-changed', () => {
      setLoading(true)
    })
  }, [])

  const handleInputChange = async (section: string, key: string, value: string) => {
    if (config) {
      const updatedConfig = {
        ...config,
        [section]: {
          ...config[section],
          [key]: value
        }
      }
      setConfig(updatedConfig)
      await window.electron.ipcRenderer.invoke('set-config', updatedConfig).then(() => {
        if (toastId.current === null) {
          toastId.current = toast.success('Configuration updated successfully!', {
            autoClose: 1000
          })
        } else {
          toast.update(toastId.current)
        }
      })
    }
  }

  const handleSelectDownloadPath = async () => {
    const result = await window.electron.ipcRenderer.invoke('select-download-path')
    if (result && config) {
      handleInputChange('appConfig', 'downloadPath', result)
    }
  }

  const formatCamelCase = (text: string) => {
    return text.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())
  }

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <Box p={3} style={{ backgroundColor: '#333', color: '#fff' }}>
        <Typography variant="h4" gutterBottom>
          Configuration
        </Typography>
        <Box mb={4}>
          <Typography variant="h6">API Configuration</Typography>
          {config &&
            Object.entries(config.apiConfig).map(([key, value]) => (
              <CssTextField
                key={key}
                label={formatCamelCase(key)}
                value={value}
                onChange={(e) => handleInputChange('apiConfig', key, e.target.value)}
                fullWidth
                margin="normal"
                InputLabelProps={{ style: { color: '#fff' } }}
                InputProps={{ style: { color: '#fff' } }}
                variant="outlined"
              />
            ))}
        </Box>
        <Box mb={4}>
          <Typography variant="h6">App Configuration</Typography>
          {config &&
            Object.entries(config.appConfig).map(([key, value]) => (
              <Box key={key} display="flex" alignItems="center" marginBottom={2}>
                <CssTextField
                  label={formatCamelCase(key)}
                  value={value}
                  onChange={(e) => handleInputChange('appConfig', key, e.target.value)}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{ style: { color: '#fff' } }}
                  InputProps={{ style: { color: '#fff' } }}
                  variant="outlined"
                />
                {key === 'downloadPath' && (
                  <FolderOpenButton onClick={handleSelectDownloadPath}></FolderOpenButton>
                )}
              </Box>
            ))}
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default ConfigurationPage
