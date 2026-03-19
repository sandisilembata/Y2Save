import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import config from '@/config/env'

export interface AuthRequest extends Request {
  userId?: string
  user?: any
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Missing or invalid token' })
    }

    const token = authHeader.substring(7)
    const decoded = jwt.verify(token, config.JWT_SECRET) as any
    req.userId = decoded.id
    req.user = decoded
    next()
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' })
  }
}

export const optionalAuthMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7)
      const decoded = jwt.verify(token, config.JWT_SECRET) as any
      req.userId = decoded.id
      req.user = decoded
    }
    next()
  } catch (err) {
    next()
  }
}
