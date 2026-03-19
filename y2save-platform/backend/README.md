# Y2Save Backend API Documentation

## Overview

The Y2Save backend is an Express.js server built with TypeScript, providing RESTful APIs for video downloading, user management, and content delivery.

## Setup

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- Redis 7+
- npm or yarn

### Installation

```bash
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Run database migrations
npm run db:migrate

# Start development server
npm run dev
```

The API will be available at `http://localhost:3001`

## Project Structure

```
backend/
├── src/
│   ├── app.ts                 # Main Express app
│   │
│   ├── config/                # Configuration
│   │   ├── env.ts             # Environment variables
│   │   ├── database.ts        # PostgreSQL connection
│   │   └── redis.ts           # Redis connection
│   │
│   ├── controllers/           # Route handlers
│   │   ├── auth.ts            # Authentication
│   │   ├── video.ts           # Video operations
│   │   └── download.ts        # Download operations
│   │
│   ├── middleware/            # Express middleware
│   │   ├── auth.ts            # JWT authentication
│   │   ├── errorHandler.ts    # Error handling
│   │   └── rateLimiter.ts     # Rate limiting
│   │
│   ├── models/                # Database models
│   │   ├── User.ts            # User model
│   │   ├── Download.ts        # Download model
│   │   └── Video.ts           # Video model
│   │
│   ├── routes/                # API routes
│   │   ├── auth.ts
│   │   ├── video.ts
│   │   └── download.ts
│   │
│   ├── services/              # Business logic
│   │   └── video.service.ts   # Video processing
│   │
│   ├── utils/                 # Helper functions
│   │   └── validators.ts
│   │
│   └── queue-workers/         # Background jobs
│       └── videoProcessor.ts
│
├── migrations/                # Database migrations
│   └── 001_initial_schema.sql
│
├── package.json
├── tsconfig.json
└── jest.config.js
```

## API Endpoints

### Authentication

#### Register User
```
POST /api/v1/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "secure_password"
}

Response 201:
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "subscription_tier": "free"
  },
  "token": "eyJhbGc..."
}
```

#### Login
```
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "secure_password"
}

Response 200:
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "subscription_tier": "free"
  },
  "token": "eyJhbGc..."
}
```

#### Get Profile
```
GET /api/v1/user/profile
Authorization: Bearer {token}

Response 200:
{
  "id": "uuid",
  "email": "user@example.com",
  "subscription_tier": "free",
  "download_count": 5
}
```

### Video Operations

#### Get Video Information
```
POST /api/v1/video/info
Content-Type: application/json

{
  "url": "https://www.youtube.com/watch?v=video123"
}

Response 200:
{
  "id": "video_id_123",
  "title": "Video Title",
  "thumbnail": "https://url.to/thumbnail.jpg",
  "duration": 600,
  "platform": "YouTube",
  "formats": [
    {
      "format_id": "18",
      "format_name": "MP4 360p",
      "ext": "mp4",
      "height": 360,
      "width": 640,
      "quality": "360p",
      "audio": true
    },
    ...
  ]
}
```

### Downloads

#### Request Download
```
POST /api/v1/download/request
Authorization: Bearer {token}
Content-Type: application/json

{
  "video_url": "https://youtube.com/watch?v=xyz",
  "format_id": "22",
  "quality": "720p"
}

Response 200:
{
  "download_id": "uuid",
  "video_title": "Video Title",
  "download_url": "https://s3.bucket.url/...",
  "expires_at": "2024-03-20T12:00:00Z",
  "estimated_size": 50000000
}
```

#### Get Download
```
GET /api/v1/download/:id
Authorization: Bearer {token}

Response 200:
{
  "id": "uuid",
  "user_id": "uuid",
  "video_url": "https://youtube.com/watch?v=xyz",
  "video_title": "Video Title",
  "format": "mp4",
  "quality": "720p",
  "file_size": 50000000,
  "downloaded_at": "2024-03-20T12:00:00Z",
  "status": "completed"
}
```

#### Get Download History
```
GET /api/v1/user/history
Authorization: Bearer {token}

Response 200:
[
  {
    "id": "uuid",
    "user_id": "uuid",
    "video_url": "...",
    "video_title": "...",
    "format": "mp4",
    "quality": "720p",
    "file_size": 50000000,
    "downloaded_at": "2024-03-20T12:00:00Z",
    "status": "completed"
  },
  ...
]
```

## Authentication

The API uses JWT (JSON Web Tokens) for authentication.

### Token Format
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Token Claims
```json
{
  "id": "user_uuid",
  "email": "user@example.com",
  "iat": 1234567890,
  "exp": 1234567890
}
```

### Token Expiry
- Default: 7 days
- Configurable via `JWT_EXPIRY` env variable

## Error Handling

### Error Response Format
```json
{
  "success": false,
  "message": "Error description",
  "code": "ERROR_CODE"
}
```

### Common Error Codes
- `INVALID_URL` - Invalid video URL
- `RATE_LIMIT_EXCEEDED` - Rate limit reached
- `UNAUTHORIZED` - Missing or invalid token
- `NOT_FOUND` - Resource not found
- `VALIDATION_ERROR` - Input validation failed

### HTTP Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not found
- `409` - Conflict
- `429` - Too many requests
- `500` - Server error

## Rate Limiting

### Free Tier
- 10 requests/hour per IP address
- 5 requests/minute for auth endpoints

### Premium Tier
- 100 requests/hour per authenticated user
- 5 requests/minute for auth endpoints

### Response Headers
```
RateLimit-Limit: 10
RateLimit-Remaining: 9
RateLimit-Reset: 1234567890
```

## Database

### Connection
Uses PostgreSQL connection pool for performance:
```typescript
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20, // max clients in pool
})
```

### Migrations
Run migrations:
```bash
npm run db:migrate
```

### Schema
See [backend/migrations/001_initial_schema.sql](migrations/001_initial_schema.sql)

## Caching

Redis is used for:
- Rate limit tracking
- Session management
- Download queue
- Temporary data storage

```typescript
const redis = getRedis()
await redis.set('key', 'value', { EX: 3600 }) // 1 hour expiry
```

## Background Jobs

Video downloads are processed asynchronously using Bull (Redis-based job queue):

```typescript
// Queue a download job
await downloadQueue.add('process-download', { 
  videoUrl, 
  formatId, 
  userId 
})

// Process jobs in queue-workers/videoProcessor.ts
downloadQueue.process('process-download', async (job) => {
  // Download video
  // Store in S3
  // Create signed URL
})
```

## Environment Variables

Create `.env` from `.env.example`:

```env
# Server
NODE_ENV=development
PORT=3001
API_URL=http://localhost:3001

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/y2save

# Redis
REDIS_URL=redis://localhost:6379

# Authentication
JWT_SECRET=your-secret-key
JWT_EXPIRY=7d

# Video Processing
YTDLP_PATH=/usr/local/bin/yt-dlp
TEMP_STORAGE_PATH=/tmp/downloads
MAX_FILE_SIZE=1073741824
DOWNLOAD_EXPIRY=3600

# AWS S3
AWS_ACCESS_KEY_ID=key
AWS_SECRET_ACCESS_KEY=secret
AWS_S3_BUCKET=y2save-downloads

# Rate Limiting
RATE_LIMIT_WINDOW=3600000
RATE_LIMIT_FREE=10
RATE_LIMIT_PREMIUM=100

# CORS
CORS_ORIGIN=http://localhost:3000
```

## Testing

```bash
# Run all tests
npm test

# Watch mode
npm test -- --watch

# Coverage report
npm test -- --coverage
```

## Building

```bash
# Build TypeScript
npm run build

# Output in dist/ directory
npm start
```

## Development

```bash
# Start dev server with hot reload
npm run dev

# Type check
npm run type-check

# Lint code
npm run lint
```

## Logging

The API uses Morgan for HTTP request logging:

```
GET /api/v1/video/info 200 234ms 1024b
POST /api/v1/download/request 201 567ms 2048b
```

## Performance Tips

1. **Database Queries**
   - Use indexes for common queries
   - Implement pagination for large result sets
   - Use connection pooling

2. **Caching**
   - Cache video info for 1 hour
   - Cache user profiles for 30 minutes
   - Use Redis for rate limiting

3. **Processing**
   - Use background jobs for video downloads
   - Implement timeout for long operations
   - Monitor queue size

## Security

- All passwords hashed with bcrypt
- HTTPS/TLS in production
- CORS enabled for frontend origin
- Helmet.js for security headers
- Input validation on all endpoints
- SQL injection prevention via parameterized queries
- Rate limiting to prevent abuse

## Deployment

### Docker
```bash
docker build -f docker/Dockerfile.backend -t y2save-backend .
docker run -p 3001:3001 --env-file .env y2save-backend
```

### Kubernetes
```bash
kubectl apply -f kubernetes/deployment.yaml
kubectl apply -f kubernetes/service.yaml
```

### Health Check
```
GET /health
Response: { "status": "ok", "timestamp": "2024-03-20T12:00:00Z" }
```

## Monitoring

Key metrics to monitor:
- API response times
- Error rates
- Database connection pool usage
- Redis memory usage
- Queue job count
- Rate limit hit rates

## Resources

- [Express.js Docs](https://expressjs.com/)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)
- [Redis Docs](https://redis.io/docs/)
- [yt-dlp Docs](https://github.com/yt-dlp/yt-dlp)
- [JWT.io](https://jwt.io/)

---

**Version**: 1.0.0  
**Last Updated**: March 2024
