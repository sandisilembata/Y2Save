import { Router } from 'express'
import { authMiddleware } from '@/middleware/auth'
import VideoController from '@/controllers/video'
import { rateLimiterMiddleware } from '@/middleware/rateLimiter'

const router = Router()

router.post('/video/info', rateLimiterMiddleware, VideoController.getVideoInfo)

export default router
