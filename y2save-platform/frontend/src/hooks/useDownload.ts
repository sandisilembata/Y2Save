'use client'

import { useState } from 'react'
import apiClient from '@/lib/api'
import { VideoInfo, DownloadRequest, DownloadResponse } from '@/types'

export const useDownload = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null)

  const getVideoInfo = async (url: string) => {
    setLoading(true)
    setError(null)
    try {
      const response = await apiClient.post<VideoInfo>('/video/info', { url })
      setVideoInfo(response.data)
      return response.data
    } catch (err: any) {
      const message = err.response?.data?.message || 'Failed to fetch video info'
      setError(message)
      throw new Error(message)
    } finally {
      setLoading(false)
    }
  }

  const requestDownload = async (req: DownloadRequest) => {
    setLoading(true)
    setError(null)
    try {
      const response = await apiClient.post<DownloadResponse>('/download/request', req)
      return response.data
    } catch (err: any) {
      const message = err.response?.data?.message || 'Failed to request download'
      setError(message)
      throw new Error(message)
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    error,
    videoInfo,
    getVideoInfo,
    requestDownload,
  }
}
