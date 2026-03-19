import { Request, Response } from 'express'
import { VideoModel } from '@/models/Video'
import { asyncHandler } from '@/middleware/errorHandler'

export const VideoController = {
  getVideoInfo: asyncHandler(async (req: Request, res: Response) => {
    const { url } = req.body

    if (!url) {
      return res.status(400).json({ message: 'URL is required' })
    }

    try {
      const videoInfo = await VideoModel.getInfo(url)
      return res.json(videoInfo)
    } catch (err: any) {
      return res.status(400).json({
        message: err.message || 'Failed to fetch video information',
      })
    }
  }),
}

export default VideoController
