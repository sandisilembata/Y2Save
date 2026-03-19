import { Router } from 'express'
import { authMiddleware } from '@/middleware/auth'
import AuthController from '@/controllers/auth'
import { strictRateLimiter } from '@/middleware/rateLimiter'

const router = Router()

router.post('/auth/register', strictRateLimiter, AuthController.register)
router.post('/auth/login', strictRateLimiter, AuthController.login)
router.get('/user/profile', authMiddleware, AuthController.getProfile)
router.get('/user/history', authMiddleware, AuthController.getDownloadHistory)

export default router
