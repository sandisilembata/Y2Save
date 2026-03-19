import { v4 as uuidv4 } from 'uuid'
import { db } from '@/config/database'

export interface Download {
  id: string
  user_id: string
  video_url: string
  video_title: string
  format: string
  quality: string
  file_size: number
  downloaded_at: string
  status: 'completed' | 'failed' | 'pending'
}

export const DownloadModel = {
  async create(
    userId: string,
    videoUrl: string,
    videoTitle: string,
    format: string,
    quality: string,
    fileSize: number
  ): Promise<Download> {
    const id = uuidv4()
    const result = await db.query(
      `INSERT INTO downloads (id, user_id, video_url, video_title, format, quality, file_size, downloaded_at, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), $8)
       RETURNING *`,
      [id, userId, videoUrl, videoTitle, format, quality, fileSize, 'completed']
    )
    return result.rows[0]
  },

  async findByUserId(userId: string, limit: number = 50): Promise<Download[]> {
    const result = await db.query(
      `SELECT * FROM downloads WHERE user_id = $1 ORDER BY downloaded_at DESC LIMIT $2`,
      [userId, limit]
    )
    return result.rows
  },

  async findById(id: string): Promise<Download | null> {
    const result = await db.query('SELECT * FROM downloads WHERE id = $1', [id])
    return result.rows[0] || null
  },
}
