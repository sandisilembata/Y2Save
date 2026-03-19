'use client'

import { useState } from 'react'
import { Format } from '@/types'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { formatFileSize } from '@/lib/utils'

interface DownloadOptionsProps {
  formats: Format[]
  onSelect: (formatId: string, quality?: string) => Promise<void>
  loading?: boolean
}

export const DownloadOptions: React.FC<DownloadOptionsProps> = ({ 
  formats, 
  onSelect, 
  loading = false 
}) => {
  const [selectedFormat, setSelectedFormat] = useState<string | null>(null)

  const handleSelect = async (format: Format) => {
    setSelectedFormat(format.format_id)
    try {
      await onSelect(format.format_id, format.quality)
    } finally {
      setSelectedFormat(null)
    }
  }

  // Group formats by quality
  const qualityGroups: { [key: string]: Format[] } = {}
  formats.forEach((format) => {
    const quality = format.quality || format.height?.toString() || 'Unknown'
    if (!qualityGroups[quality]) {
      qualityGroups[quality] = []
    }
    qualityGroups[quality].push(format)
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Select Download Format</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Object.entries(qualityGroups).map(([quality, formats]) => (
            <div key={quality} className="border rounded-lg p-4">
              <h3 className="font-semibold mb-3">{quality}</h3>
              <div className="space-y-2">
                {formats.map((format) => (
                  <div
                    key={format.format_id}
                    className="flex items-center justify-between p-2 hover:bg-gray-50 rounded"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-medium">{format.format_name}</p>
                      <p className="text-xs text-gray-500">
                        {format.ext?.toUpperCase()} 
                        {format.audio && ' + Audio'} 
                        {format.width && ` • ${format.width}×${format.height}`}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => handleSelect(format)}
                      loading={loading && selectedFormat === format.format_id}
                      disabled={loading && selectedFormat !== format.format_id}
                    >
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
