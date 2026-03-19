import { createClient } from 'redis'
import config from './env'

let redisClient: any = null

export const initRedis = async () => {
  if (redisClient) return redisClient

  const client = createClient({
    url: config.REDIS_URL,
  })

  client.on('error', (err) => {
    console.error('Redis client error:', err)
  })

  await client.connect()
  redisClient = client
  return client
}

export const getRedis = () => {
  if (!redisClient) {
    throw new Error('Redis client not initialized')
  }
  return redisClient
}

export default getRedis
