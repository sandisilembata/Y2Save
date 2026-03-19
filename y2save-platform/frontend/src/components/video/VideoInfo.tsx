'use client'

import Image from 'next/image'
import { VideoInfo } from '@/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'

interface VideoInfoProps {
  video: VideoInfo
}

export const VideoInfoDisplay: React.FC<VideoInfoProps> = ({ video }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{video.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-6">
          <div className="flex-shrink-0">
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-48 h-auto rounded-lg"
            />
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-semibold">Platform:</span> {video.platform}
            </p>
            <p className="text-sm text-gray-600 mb-4">
              <span className="font-semibold">Available Formats:</span> {video.formats.length}
            </p>
            <div className="text-sm text-gray-700">
              <p className="font-semibold mb-2">Details:</p>
              <ul className="space-y-1">
                <li>Duration: {Math.floor(video.duration / 60)} minutes</li>
                <li>Video ID: {video.id}</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
