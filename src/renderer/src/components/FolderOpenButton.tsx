// Import necessary components from FontAwesome
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons'

interface FolderOpenButtonProps {
  onClick: () => void
}

// FolderOpenButton Component
const FolderOpenButton: React.FC<FolderOpenButtonProps> = ({ onClick }) => {
  return (
    <button onClick={onClick} style={styles.button}>
      <FontAwesomeIcon icon={faFolderOpen} style={styles.icon} />
    </button>
  )
}

// Styles for the button and icon
const styles = {
  button: {
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    outline: 'none'
  },
  icon: {
    fontSize: '24px',
    color: '#fff'
  }
}

export default FolderOpenButton
