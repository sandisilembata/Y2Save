import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import config from '@/config/env'
import { errorHandler } from '@/middleware/errorHandler'

// Routes
import videoRoutes from '@/routes/video'
import downloadRoutes from '@/routes/download'
import authRoutes from '@/routes/auth'

const app = express()

// Middleware
app.use(helmet())
app.use(cors({ origin: config.CORS_ORIGIN }))
app.use(morgan('combined'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// API Routes
app.use('/api/v1', videoRoutes)
app.use('/api/v1', downloadRoutes)
app.use('/api/v1', authRoutes)

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'Not found' })
})

// Error handler
app.use(errorHandler)

const PORT = config.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`Environment: ${config.NODE_ENV}`)
})

export default app
