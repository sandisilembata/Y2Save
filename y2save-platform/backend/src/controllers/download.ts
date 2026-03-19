import { Request, Response } from 'express'
import { AuthRequest } from '@/middleware/auth'
import { asyncHandler } from '@/middleware/errorHandler'
import { DownloadModel } from '@/models/Download'

export const DownloadController = {
  requestDownload: asyncHandler(async (req: AuthRequest, res: Response) => {
    const { video_url, format_id, quality } = req.body
    const userId = req.userId

    if (!video_url || !format_id) {
      return res.status(400).json({ message: 'Missing required fields' })
    }

    // In production, would process the download
    const download = await DownloadModel.create(
      userId || 'anonymous',
      video_url,
      'Sample Video',
      'mp4',
      quality || '720p',
      50000000
    )

    return res.json({
      download_id: download.id,
      video_title: download.video_title,
      download_url: `https://example.com/download/${download.id}`,
      expires_at: new Date(Date.now() + 3600000).toISOString(),
      estimated_size: download.file_size,
    })
  }),

  getDownload: asyncHandler(async (req: AuthRequest, res: Response) => {
    const { id } = req.params

    const download = await DownloadModel.findById(id)
    if (!download) {
      return res.status(404).json({ message: 'Download not found' })
    }

    return res.json(download)
  }),
}

export default DownloadController
