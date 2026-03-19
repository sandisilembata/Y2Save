import { Request, Response, NextFunction } from 'express'
import rateLimit from 'express-rate-limit'
import config from '@/config/env'

export const rateLimiterMiddleware = rateLimit({
  windowMs: config.RATE_LIMIT_WINDOW,
  max: config.RATE_LIMIT_FREE,
  message: 'Too many requests, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
})

export const strictRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5,
  message: 'Too many requests, please wait before retrying',
})
