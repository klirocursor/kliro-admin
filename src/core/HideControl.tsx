import React from 'react'

type HideControlProps = {
  hide: boolean
  children: React.ReactNode
}

const HideControl: React.FC<HideControlProps> = ({ hide, children }) => {
  if (hide) {
    return null
  }
  return children
}

export default HideControl
