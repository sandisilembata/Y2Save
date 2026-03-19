export interface User {
  id: string
  email: string
  subscription_tier: 'free' | 'premium' | 'pro'
  download_count: number
  created_at: string
}

export interface VideoInfo {
  id: string
  title: string
  thumbnail: string
  duration: number
  formats: Format[]
  platform: string
}

export interface Format {
  format_id: string
  format_name: string
  ext: string
  height?: number
  width?: number
  fps?: number
  audio?: boolean
  quality?: string
}

export interface DownloadRequest {
  video_url: string
  format_id: string
  quality?: string
}

export interface DownloadResponse {
  download_id: string
  video_title: string
  download_url: string
  expires_at: string
  estimated_size: number
}

export interface Download {
  id: string
  user_id: string
  video_url: string
  video_title: string
  format: string
  quality: string
  file_size: number
  downloaded_at: string
  status: 'completed' | 'failed' | 'pending'
}
