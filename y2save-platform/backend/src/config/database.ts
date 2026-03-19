import { Pool } from 'pg'
import config from './env'

const pool = new Pool({
  connectionString: config.DATABASE_URL,
})

pool.on('error', (err) => {
  console.error('Unexpected pool error:', err)
})

export const db = pool

export const query = (text: string, params?: any[]) => {
  return pool.query(text, params)
}

export default pool
