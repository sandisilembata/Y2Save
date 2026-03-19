'use client'

import { useDownloadHistory } from '@/hooks/useDownloadHistory'
import { Loader } from '@/components/ui/Loader'
import { Alert } from '@/components/ui/Alert'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { formatDate, formatFileSize } from '@/lib/utils'

export default function HistoryPage() {
  const { downloads, loading, error } = useDownloadHistory()

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-gray-900">Download History</h1>

      {error && (
        <Alert type="error" message={error} />
      )}

      {loading && (
        <div className="flex justify-center py-12">
          <div>
            <Loader size="lg" />
            <p className="text-center text-gray-600 mt-4">
              Loading your download history...
            </p>
          </div>
        </div>
      )}

      {!loading && downloads.length === 0 && (
        <Card>
          <CardContent className="py-12">
            <p className="text-center text-gray-600">
              You haven't downloaded any videos yet.
            </p>
          </CardContent>
        </Card>
      )}

      {!loading && downloads.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-4 px-4 font-semibold">Video Title</th>
                <th className="text-left py-4 px-4 font-semibold">Format</th>
                <th className="text-left py-4 px-4 font-semibold">Size</th>
                <th className="text-left py-4 px-4 font-semibold">Downloaded</th>
                <th className="text-left py-4 px-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {downloads.map((download) => (
                <tr key={download.id} className="border-b hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <p className="font-medium text-gray-900 truncate max-w-md">
                      {download.video_title}
                    </p>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-gray-600">
                      {download.format} • {download.quality}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-gray-600">
                      {formatFileSize(download.file_size)}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-gray-600">
                      {formatDate(download.downloaded_at)}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded ${
                        download.status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : download.status === 'failed'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {download.status.charAt(0).toUpperCase() + download.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
