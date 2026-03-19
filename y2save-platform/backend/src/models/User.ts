import { v4 as uuidv4 } from 'uuid'
import { db } from '@/config/database'

export interface User {
  id: string
  email: string
  password_hash: string
  subscription_tier: 'free' | 'premium' | 'pro'
  download_count: number
  created_at: string
}

export const UserModel = {
  async create(email: string, passwordHash: string): Promise<User> {
    const id = uuidv4()
    const result = await db.query(
      `INSERT INTO users (id, email, password_hash, subscription_tier, download_count, created_at)
       VALUES ($1, $2, $3, $4, $5, NOW())
       RETURNING *`,
      [id, email, passwordHash, 'free', 0]
    )
    return result.rows[0]
  },

  async findById(id: string): Promise<User | null> {
    const result = await db.query('SELECT * FROM users WHERE id = $1', [id])
    return result.rows[0] || null
  },

  async findByEmail(email: string): Promise<User | null> {
    const result = await db.query('SELECT * FROM users WHERE email = $1', [email])
    return result.rows[0] || null
  },

  async updateDownloadCount(userId: string, count: number): Promise<void> {
    await db.query(
      'UPDATE users SET download_count = download_count + $1 WHERE id = $2',
      [count, userId]
    )
  },
}
