// GearButton.tsx
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog } from '@fortawesome/free-solid-svg-icons'

interface GearButtonProps {
  onClick: () => void
}

const GearButton: React.FC<GearButtonProps> = ({ onClick }) => {
  return (
    <button onClick={onClick} className="gear-button">
      <FontAwesomeIcon icon={faCog} />
    </button>
  )
}

export default GearButton
