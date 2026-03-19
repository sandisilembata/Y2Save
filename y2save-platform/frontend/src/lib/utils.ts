export const validateUrl = (url: string): boolean => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

export const getSupportedPlatforms = (): string[] => [
  'youtube.com',
  'youtu.be',
  'vimeo.com',
  'dailymotion.com',
  'facebook.com',
  'twitter.com',
  'x.com',
  'instagram.com',
  'tiktok.com',
]

export const getPlatformFromUrl = (url: string): string | null => {
  try {
    const urlObj = new URL(url)
    const hostname = urlObj.hostname
    
    if (hostname.includes('youtube.com') || hostname.includes('youtu.be')) {
      return 'YouTube'
    } else if (hostname.includes('vimeo.com')) {
      return 'Vimeo'
    } else if (hostname.includes('dailymotion.com')) {
      return 'Dailymotion'
    } else if (hostname.includes('facebook.com')) {
      return 'Facebook'
    } else if (hostname.includes('twitter.com') || hostname.includes('x.com')) {
      return 'Twitter/X'
    } else if (hostname.includes('instagram.com')) {
      return 'Instagram'
    } else if (hostname.includes('tiktok.com')) {
      return 'TikTok'
    }
    return 'Unknown'
  } catch {
    return null
  }
}

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
}

export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
