'use client'

import React from 'react'

interface AlertProps {
  type: 'success' | 'error' | 'warning' | 'info'
  message: string
  onClose?: () => void
}

export const Alert: React.FC<AlertProps> = ({ type, message, onClose }) => {
  const typeStyles = {
    success: 'bg-green-50 text-green-800 border-green-200',
    error: 'bg-red-50 text-red-800 border-red-200',
    warning: 'bg-yellow-50 text-yellow-800 border-yellow-200',
    info: 'bg-blue-50 text-blue-800 border-blue-200',
  }

  return (
    <div className={`border rounded-lg p-4 mb-4 flex justify-between items-center ${typeStyles[type]}`}>
      <p>{message}</p>
      {onClose && (
        <button onClick={onClose} className="font-bold">
          ×
        </button>
      )}
    </div>
  )
}
