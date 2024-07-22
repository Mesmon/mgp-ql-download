import React, { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const queryClient = useQueryClient()

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()
    // Handle form submission logic
    await window.electron.ipcRenderer.invoke(
      'save-credentials',
      JSON.stringify({ username, password })
    )
    // Invalidate the 'checkCredentials' query to trigger refetch
    queryClient.invalidateQueries({ queryKey: ['checkCredentials'] })
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">Login</h2>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  )
}

export default LoginForm
