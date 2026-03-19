'use client'

import React from 'react'

interface CardProps {
  children: React.ReactNode
  className?: string
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      {children}
    </div>
  )
}

interface CardHeaderProps {
  children: React.ReactNode
}

export const CardHeader: React.FC<CardHeaderProps> = ({ children }) => {
  return <div className="mb-4 pb-4 border-b border-gray-200">{children}</div>
}

interface CardTitleProps {
  children: React.ReactNode
}

export const CardTitle: React.FC<CardTitleProps> = ({ children }) => {
  return <h2 className="text-2xl font-bold text-gray-900">{children}</h2>
}

interface CardContentProps {
  children: React.ReactNode
}

export const CardContent: React.FC<CardContentProps> = ({ children }) => {
  return <div>{children}</div>
}
