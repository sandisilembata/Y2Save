'use client'

import { useState } from 'react'
import { useDownload } from '@/hooks/useDownload'
import { UrlInput } from '@/components/forms/UrlInput'
import { VideoInfoDisplay } from '@/components/video/VideoInfo'
import { DownloadOptions } from '@/components/video/DownloadOptions'
import { Alert } from '@/components/ui/Alert'
import { Loader } from '@/components/ui/Loader'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'

export default function HomePage() {
  const { loading, error, videoInfo, getVideoInfo, requestDownload } = useDownload()
  const [downloadSuccess, setDownloadSuccess] = useState(false)
  const [downloadLink, setDownloadLink] = useState<string | null>(null)

  const handleGetVideoInfo = async (url: string) => {
    try {
      setDownloadSuccess(false)
      setDownloadLink(null)
      await getVideoInfo(url)
    } catch (err) {
      console.error('Error getting video info:', err)
    }
  }

  const handleDownloadSelect = async (formatId: string, quality?: string) => {
    if (!videoInfo) return
    
    try {
      const response = await requestDownload({
        video_url: videoInfo.id || '',
        format_id: formatId,
        quality,
      })
      setDownloadLink(response.download_url)
      setDownloadSuccess(true)
    } catch (err) {
      console.error('Error requesting download:', err)
    }
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center py-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Download Videos Online
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Fast, easy, and free. Download videos from popular platforms.
        </p>
      </div>

      {/* Input Section */}
      <Card>
        <CardContent className="pt-6">
          <UrlInput 
            onSubmit={handleGetVideoInfo}
            loading={loading}
            error={error}
          />
        </CardContent>
      </Card>

      {/* Results Section */}
      {downloadSuccess && downloadLink && (
        <Alert 
          type="success" 
          message="Your download is ready!"
        />
      )}

      {downloadSuccess && downloadLink && (
        <Card>
          <CardHeader>
            <CardTitle>Download Ready</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Your video download is ready. Click the button below to start.
            </p>
            <a
              href={downloadLink}
              download
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button as="span">Start Download</Button>
            </a>
            <p className="text-xs text-gray-500 mt-2">
              Link expires in 1 hour
            </p>
          </CardContent>
        </Card>
      )}

      {loading && !videoInfo && (
        <div className="flex justify-center py-12">
          <div>
            <Loader size="lg" />
            <p className="text-center text-gray-600 mt-4">
              Processing your video...
            </p>
          </div>
        </div>
      )}

      {videoInfo && !downloadSuccess && (
        <>
          <VideoInfoDisplay video={videoInfo} />
          <DownloadOptions 
            formats={videoInfo.formats} 
            onSelect={handleDownloadSelect}
            loading={loading}
          />
        </>
      )}

      {/* Supported Platforms */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Supported Platforms</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            'YouTube',
            'TikTok',
            'Instagram',
            'Twitter/X',
            'Vimeo',
            'Dailymotion',
            'Facebook',
            'And More...',
          ].map((platform) => (
            <div
              key={platform}
              className="bg-white rounded-lg p-4 text-center shadow-sm hover:shadow-md transition"
            >
              <p className="font-medium text-gray-900">{platform}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Choose Y2Save?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'Fast & Easy',
              description: 'Simply paste the URL and choose your format. Downloads start instantly.',
            },
            {
              title: 'High Quality',
              description: 'Download up to 4K quality where available. Multiple format options.',
            },
            {
              title: 'No Installation',
              description: 'Works directly in your browser. No software to install or configure.',
            },
          ].map((feature, idx) => (
            <Card key={idx}>
              <CardContent className="pt-6">
                <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
