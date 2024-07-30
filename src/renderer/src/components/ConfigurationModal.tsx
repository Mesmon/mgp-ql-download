import React from 'react'
import { Modal, Box } from '@mui/material'
import ConfigurationPage from './ConfigurationPage'
import GearButton from './GearButton'

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80vw',
  bgcolor: '#303030', // Custom background color
  boxShadow: 24,
  p: 4,
  borderRadius: '8px' // Optional: Add border radius
}

const ConfigurationModal = (): React.JSX.Element => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = (): void => setOpen(true)
  const handleClose = (): void => setOpen(false)

  return (
    <div>
      <GearButton onClick={handleOpen} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
          <ConfigurationPage />
        </Box>
      </Modal>
    </div>
  )
}

export default ConfigurationModal
