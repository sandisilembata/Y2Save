# Y2Save - Quick Start Guide

Get Y2Save up and running in 5 minutes!

## Option 1: Docker Compose (Easiest)

### Step 1: Clone/Navigate to Project
```bash
cd y2save-platform
```

### Step 2: Set Environment Variables
```bash
cp .env.example .env
```

No changes needed - defaults work for local development!

### Step 3: Start Services
```bash
docker-compose -f docker/docker-compose.yml up -d
```

### Step 4: Initialize Database
```bash
docker exec y2save-backend npm run db:migrate
```

### Step 5: Access Application
| Service | URL |
|---------|-----|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:3001 |
| API Health | http://localhost:3001/health |
| Database | localhost:5432 (user/password) |
| Redis | localhost:6379 |

### Done! 🎉

Try pasting a YouTube URL into the app!

---

## Option 2: Local Development (Advanced)

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- Redis 7+

### Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create environment
cat > .env << EOF
DATABASE_URL=postgresql://user:password@localhost:5432/y2save
REDIS_URL=redis://localhost:6379
JWT_SECRET=development-secret-key
NODE_ENV=development
EOF

# Run migrations
npm run db:migrate

# Start server
npm run dev
# Backend ready at http://localhost:3001
```

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create environment
cat > .env.local << EOF
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
EOF

# Start dev server
npm run dev
# Frontend ready at http://localhost:3000
```

---

## Testing the App

### 1. Test Homepage
Open http://localhost:3000 - should see the download form

### 2. Paste Video URL
Example URLs to test with:
- YouTube: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
- TikTok: `https://www.tiktok.com/@username/video/1234567890`
- Instagram: `https://www.instagram.com/p/ABC123/`

### 3. View Video Info
After pasting URL, you should see:
- Video thumbnail
- Available formats (360p, 720p, 1080p, 4K)
- Video duration and platform

### 4. Download Video
- Select your preferred quality
- Click "Download"
- Download link is generated
- File expires in 1 hour

### 5. Check History
Visit http://localhost:3000/history to see your downloads

---

## Useful Commands

### Docker Compose

```bash
# View logs
docker-compose -f docker/docker-compose.yml logs -f backend
docker-compose -f docker/docker-compose.yml logs -f frontend

# Stop services
docker-compose -f docker/docker-compose.yml down

# Remove volumes (reset database)
docker-compose -f docker/docker-compose.yml down -v

# Rebuild containers
docker-compose -f docker/docker-compose.yml build
```

### Database

```bash
# Access PostgreSQL
psql postgresql://user:password@localhost:5432/y2save

# View tables
\dt

# View users
SELECT * FROM users;

# View downloads
SELECT * FROM downloads;
```

### Redis

```bash
# Connect to Redis
redis-cli

# Ping server
ping

# View keys
keys *

# Get value
get key-name
```

### Backend API Testing

```bash
# Health check
curl http://localhost:3001/health

# Get video info (replace URL)
curl -X POST http://localhost:3001/api/v1/video/info \
  -H "Content-Type: application/json" \
  -d '{"url": "https://youtube.com/watch?v=dQw4w9WgXcQ"}'
```

---

## Troubleshooting

### Service Won't Start

```bash
# Check if ports are in use
lsof -i :3000  # Frontend
lsof -i :3001  # Backend
lsof -i :5432  # Database
lsof -i :6379  # Redis

# Kill process using port (macOS/Linux)
kill -9 <PID>
```

### Database Connection Error

```bash
# Check PostgreSQL is running
psql --version

# Test connection
psql postgresql://user:password@localhost:5432/y2save

# If using Docker
docker ps | grep postgres
```

### Redis Connection Error

```bash
# Check Redis is running
redis-cli ping

# If using Docker
docker ps | grep redis
```

### Frontend Won't Load

```bash
# Clear cache
rm -rf frontend/.next
npm cache clean --force

# Reinstall
cd frontend
rm -rf node_modules
npm install
npm run dev
```

### Backend Won't Start

```bash
# Check Node modules
cd backend
rm -rf node_modules
npm install
npm run dev
```

---

## Next Steps

After getting the app running:

1. **Read Documentation**
   - [Main README](README.md)
   - [Frontend Guide](frontend/README.md)
   - [Backend API Docs](backend/README.md)

2. **Customize**
   - Add your branding
   - Configure ad networks
   - Set up payment processing

3. **Deploy**
   - Follow [Deployment Guide](DEPLOYMENT.md)
   - Choose cloud provider (AWS, GCP, Azure)
   - Set up SSL certificate

4. **Integrate**
   - Build Chrome extension
   - Create mobile apps
   - Add social features

5. **Monitor**
   - Set up error tracking
   - Configure analytics
   - Monitor performance

---

## Project Structure

```
y2save-platform/
├── frontend/          - React/Next.js app
├── backend/           - Express.js API
├── docker/            - Docker containers
├── kubernetes/        - K8s manifests
├── .env.example       - Environment template
├── README.md          - Main docs
├── DEPLOYMENT.md      - Deployment guide
└── docker-compose.yml - Local dev setup
```

---

## Environment Variables Cheat Sheet

### Minimum Required
```env
NODE_ENV=development
DATABASE_URL=postgresql://user:password@localhost:5432/y2save
REDIS_URL=redis://localhost:6379
JWT_SECRET=dev-secret-key
```

### Optional Advanced
```env
AWS_ACCESS_KEY_ID=your-key
AWS_SECRET_ACCESS_KEY=your-secret
AWS_S3_BUCKET=bucket-name
STRIPE_SECRET_KEY=sk_test_...
RATE_LIMIT_FREE=10
AD_NETWORK_ID=your-ad-id
```

---

## API Quick Reference

### Get Video Info
```bash
POST /api/v1/video/info
Body: { "url": "https://youtube.com/watch?v=..." }
```

### Request Download
```bash
POST /api/v1/download/request
Auth: Bearer {token}
Body: { 
  "video_url": "...",
  "format_id": "22",
  "quality": "720p"
}
```

### Get Download History
```bash
GET /api/v1/user/history
Auth: Bearer {token}
```

### Health Check
```bash
GET /health
```

---

## Common Port Numbers

| Service | Port |
|---------|------|
| Frontend | 3000 |
| Backend | 3001 |
| PostgreSQL | 5432 |
| Redis | 6379 |
| Nginx | 80, 443 |

---

## Performance Tips

- Use Chrome DevTools Network tab to see API calls
- Check database query performance
- Monitor Redis memory usage
- Watch for large file uploads
- Keep browser dev console open for errors

---

## Support

**Something not working?**

1. Check the logs: `docker-compose -f docker/docker-compose.yml logs -f`
2. Read [Troubleshooting](README.md#troubleshooting) section
3. Check [Backend README](backend/README.md) for API errors
4. Check [Frontend README](frontend/README.md) for UI issues

---

## What's Included

✅ Full-stack web application  
✅ Video downloading from 30+ platforms  
✅ User authentication & history  
✅ Admin dashboard ready  
✅ Payment processing ready  
✅ Monetization features (ads, premium)  
✅ Responsive design (desktop & mobile)  
✅ Docker & Kubernetes setup  
✅ Database migrations  
✅ CI/CD pipeline  

---

## Ready to Deploy?

See [DEPLOYMENT.md](DEPLOYMENT.md) for production deployment instructions!

---

**Version**: 1.0.0  
**Last Updated**: March 2024  
**Estimated Setup Time**: 5 minutes
