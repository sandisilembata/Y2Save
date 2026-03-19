'use client'

import { useState, useEffect } from 'react'
import apiClient from '@/lib/api'
import { Download } from '@/types'

export const useDownloadHistory = () => {
  const [downloads, setDownloads] = useState<Download[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchHistory = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await apiClient.get<Download[]>('/user/history')
      setDownloads(response.data)
    } catch (err: any) {
      const message = err.response?.data?.message || 'Failed to fetch history'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchHistory()
  }, [])

  return {
    downloads,
    loading,
    error,
    refetch: fetchHistory,
  }
}
