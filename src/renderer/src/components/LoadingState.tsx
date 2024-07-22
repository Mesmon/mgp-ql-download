import React from 'react'
import { CircularProgress, Box, Typography } from '@mui/material'

interface LoadingStateProps {
  message?: string
}

const LoadingState: React.FC<LoadingStateProps> = ({ message = 'Loading...' }) => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
      <CircularProgress />
      <Typography variant="h6" style={{ marginTop: '20px' }}>
        {message}
      </Typography>
    </Box>
  )
}

export default LoadingState
