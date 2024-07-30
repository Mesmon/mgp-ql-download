import React from 'react'

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

// Configuration page component
const ConfigurationPage = (): React.JSX.Element => {
  const [config, setConfig] = React.useState<Config | null>(null)
  const [loading, setLoading] = React.useState<boolean>(true)

  React.useEffect(() => {
    window.electron.ipcRenderer.invoke('get-config').then((config) => {
      setConfig(config)
      setLoading(false)
    })
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>Configuration</h1>
      <pre>{JSON.stringify(config, null, 2)}</pre>
    </div>
  )
}

export default ConfigurationPage
