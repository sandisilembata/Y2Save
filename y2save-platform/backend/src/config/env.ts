import dotenv from 'dotenv'

dotenv.config()

export const config = {
  // Server
  PORT: parseInt(process.env.PORT || '3001'),
  NODE_ENV: process.env.NODE_ENV || 'development',
  API_URL: process.env.API_URL || 'http://localhost:3001',

  // Database
  DATABASE_URL: process.env.DATABASE_URL || 'postgresql://user:password@localhost:5432/y2save',
  
  // Redis
  REDIS_URL: process.env.REDIS_URL || 'redis://localhost:6379',

  // Authentication
  JWT_SECRET: process.env.JWT_SECRET || 'your-super-secret-jwt-key',
  JWT_EXPIRY: process.env.JWT_EXPIRY || '7d',

  // Video Processing
  YTDLP_PATH: process.env.YTDLP_PATH || 'yt-dlp',
  TEMP_STORAGE_PATH: process.env.TEMP_STORAGE_PATH || '/tmp/downloads',
  MAX_FILE_SIZE: parseInt(process.env.MAX_FILE_SIZE || '1073741824'), // 1GB
  DOWNLOAD_EXPIRY: parseInt(process.env.DOWNLOAD_EXPIRY || '3600'), // 1 hour

  // Storage
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID || '',
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY || '',
  AWS_S3_BUCKET: process.env.AWS_S3_BUCKET || 'y2save-downloads',
  AWS_REGION: process.env.AWS_REGION || 'us-east-1',

  // Rate Limiting
  RATE_LIMIT_WINDOW: parseInt(process.env.RATE_LIMIT_WINDOW || '3600000'), // 1 hour in ms
  RATE_LIMIT_FREE: parseInt(process.env.RATE_LIMIT_FREE || '10'),
  RATE_LIMIT_PREMIUM: parseInt(process.env.RATE_LIMIT_PREMIUM || '100'),

  // Monetization
  STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY || '',
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY || '',
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET || '',
  AD_NETWORK_ID: process.env.AD_NETWORK_ID || '',

  // CORS
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:3000',
}

export default config
