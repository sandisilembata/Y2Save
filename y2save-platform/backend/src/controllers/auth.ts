import { Request, Response } from 'express'
import { AuthRequest } from '@/middleware/auth'
import { asyncHandler } from '@/middleware/errorHandler'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import config from '@/config/env'
import { UserModel } from '@/models/User'
import { DownloadModel } from '@/models/Download'

export const AuthController = {
  register: asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' })
    }

    const existingUser = await UserModel.findByEmail(email)
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' })
    }

    const passwordHash = await bcrypt.hash(password, 10)
    const user = await UserModel.create(email, passwordHash)

    const token = jwt.sign(
      { id: user.id, email: user.email },
      config.JWT_SECRET,
      { expiresIn: config.JWT_EXPIRY }
    )

    return res.status(201).json({
      user: {
        id: user.id,
        email: user.email,
        subscription_tier: user.subscription_tier,
      },
      token,
    })
  }),

  login: asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' })
    }

    const user = await UserModel.findByEmail(email)
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const validPassword = await bcrypt.compare(password, user.password_hash)
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      config.JWT_SECRET,
      { expiresIn: config.JWT_EXPIRY }
    )

    return res.json({
      user: {
        id: user.id,
        email: user.email,
        subscription_tier: user.subscription_tier,
      },
      token,
    })
  }),

  getProfile: asyncHandler(async (req: AuthRequest, res: Response) => {
    const user = await UserModel.findById(req.userId!)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    return res.json({
      id: user.id,
      email: user.email,
      subscription_tier: user.subscription_tier,
      download_count: user.download_count,
    })
  }),

  getDownloadHistory: asyncHandler(async (req: AuthRequest, res: Response) => {
    const downloads = await DownloadModel.findByUserId(req.userId!)
    return res.json(downloads)
  }),
}

export default AuthController
