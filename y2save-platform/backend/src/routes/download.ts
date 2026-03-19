import { Router } from 'express'
import { authMiddleware } from '@/middleware/auth'
import DownloadController from '@/controllers/download'
import { rateLimiterMiddleware } from '@/middleware/rateLimiter'

const router = Router()

router.post('/download/request', rateLimiterMiddleware, DownloadController.requestDownload)
router.get('/download/:id', DownloadController.getDownload)

export default router
