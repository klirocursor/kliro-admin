import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FinishButton } from '@/components/ui'
import Undo from '@/assets/icons/undo.svg'

const AccessDenied: React.FC = () => {
  const navigate = useNavigate()

  const handleGoHome = () => {
    navigate(-1)
  }

  return (
    <div className="flex h-full flex-col items-center justify-center text-center">
      <h1 className="mb-4 text-4xl font-bold text-red-500">Access Denied</h1>
      <p className="mb-8 text-lg">You do not have permission to view this page.</p>
      <FinishButton icon={<img src={Undo} />} status="success" onClick={handleGoHome}>
        Go to back
      </FinishButton>
    </div>
  )
}

export default AccessDenied
