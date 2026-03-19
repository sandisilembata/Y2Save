# Y2Save - Web-Based Video Downloading Platform

A complete, production-ready web application for downloading videos from popular streaming platforms including YouTube, TikTok, Instagram, Vimeo, and more. Built with modern tech stack: Next.js frontend, Express.js backend, PostgreSQL database, and Redis caching.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Docker & Docker Compose (for containerized setup)
- PostgreSQL 14+ (if running locally)
- Redis 7+ (if running locally)

### Using Docker Compose (Recommended)

```bash
# Clone and navigate to project
cd y2save-platform

# Copy environment file
cp .env.example .env

# Start all services
docker-compose -f docker/docker-compose.yml up -d

# Initialize database
docker exec y2save-backend npm run db:migrate

# Access the application
# Frontend: http://localhost:3000
# Backend API: http://localhost:3001
# Database: localhost:5432
# Redis: localhost:6379
```

### Local Development Setup

#### Backend Setup
```bash
cd backend

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your settings

# Run migrations
npm run db:migrate

# Start development server
npm run dev
# Server runs on http://localhost:3001
```

#### Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# NEXT_PUBLIC_API_URL should point to your backend

# Start development server
npm run dev
# App runs on http://localhost:3000
```

## 📁 Project Structure

```
y2save-platform/
├── frontend/                    # Next.js 14 React application
│   ├── src/
│   │   ├── app/                # Next.js App Router pages
│   │   ├── components/         # React components
│   │   │   ├── ui/            # Reusable UI components
│   │   │   ├── forms/         # Form components
│   │   │   ├── video/         # Video-related components
│   │   │   └── layout/        # Layout components
│   │   ├── hooks/             # React hooks
│   │   ├── lib/               # Utility functions and API client
│   │   ├── styles/            # Global CSS and Tailwind
│   │   └── types/             # TypeScript types
│   ├── public/                # Static assets
│   ├── package.json
│   └── tsconfig.json
│
├── backend/                     # Express.js TypeScript backend
│   ├── src/
│   │   ├── app.ts            # Express app entry point
│   │   ├── config/           # Configuration files
│   │   ├── controllers/      # Route controllers
│   │   ├── middleware/       # Express middleware
│   │   ├── models/           # Data models
│   │   ├── routes/           # API routes
│   │   ├── services/         # Business logic
│   │   └── utils/            # Helper utilities
│   ├── migrations/           # Database migrations
│   ├── queue-workers/        # Background job processors
│   ├── package.json
│   └── tsconfig.json
│
├── docker/                     # Docker configuration
│   ├── Dockerfile.backend
│   ├── Dockerfile.frontend
│   └── docker-compose.yml
│
├── kubernetes/                 # Kubernetes deployment
│   ├── deployment.yaml
│   ├── service.yaml
│   └── ingress.yaml
│
├── extension/                  # Chrome extension (future)
│   ├── manifest.json
│   └── ...
│
├── .github/workflows/         # CI/CD pipelines
│   └── deploy.yml
│
├── .env.example              # Environment variables template
└── README.md
```

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 with React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS + custom components
- **State Management**: Zustand
- **Form Handling**: React Hook Form + Zod validation
- **HTTP Client**: Axios with interceptors
- **UI Components**: Custom Shadcn-style components

### Backend
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL with connection pooling
- **Cache**: Redis
- **Job Queue**: Bull (Redis-based)
- **Authentication**: JWT with bcrypt
- **Validation**: Custom middleware
- **Video Processing**: yt-dlp integration

### Infrastructure
- **Containerization**: Docker & Docker Compose
- **Orchestration**: Kubernetes-ready manifests
- **CI/CD**: GitHub Actions
- **Database Migrations**: SQL scripts
- **API Documentation**: OpenAPI/Swagger ready

## 📖 API Endpoints

### Video Operations
```
POST /api/v1/video/info
  - Get video info and available formats
  - Body: { url: string }
  - Returns: VideoInfo object

POST /api/v1/download/request
  - Request video download
  - Body: { video_url: string, format_id: string, quality?: string }
  - Returns: Download link with expiration

GET /api/v1/download/:id
  - Get download information
  - Returns: Download object
```

### Authentication
```
POST /api/v1/auth/register
  - Register new user
  - Body: { email: string, password: string }
  - Returns: User object + JWT token

POST /api/v1/auth/login
  - Login user
  - Body: { email: string, password: string }
  - Returns: User object + JWT token

GET /api/v1/user/profile
  - Get authenticated user profile
  - Requires: Bearer token
  - Returns: User profile

GET /api/v1/user/history
  - Get user's download history
  - Requires: Bearer token
  - Returns: Array of downloads
```

## 🔐 Security Features

- **HTTPS Only**: Helmet.js for security headers
- **Authentication**: JWT-based token auth with secure storage
- **Password Security**: Bcrypt password hashing
- **Rate Limiting**: Request throttling for both free and premium tiers
- **CORS**: Configurable cross-origin policies
- **Input Validation**: Zod schema validation on frontend and backend
- **SQL Injection Prevention**: Parameterized queries
- **Environment Secrets**: Sensitive data in .env files

## 📊 Database Schema

### Users Table
- `id` (UUID, Primary Key)
- `email` (VARCHAR, Unique)
- `password_hash` (VARCHAR)
- `subscription_tier` (VARCHAR) - free, premium, pro
- `download_count` (INTEGER)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### Downloads Table
- `id` (UUID, Primary Key)
- `user_id` (UUID, Foreign Key)
- `video_url` (TEXT)
- `video_title` (VARCHAR)
- `format` (VARCHAR)
- `quality` (VARCHAR)
- `file_size` (BIGINT)
- `downloaded_at` (TIMESTAMP)
- `status` (VARCHAR)
- `ip_address` (VARCHAR)

### Additional Tables
- `transactions` - Payment tracking
- `payouts` - Creator payouts
- `follows` - User follows
- `sessions` - Session management

## Monetization Features

### Ad Integration
- Banner ad placements (configurable)
- Interstitial ads between downloads
- Ad network integration ready (Configure `AD_NETWORK_ID` in .env)

### Premium Subscription Tiers
- **Free**: 10 downloads/hour, basic quality
- **Premium**: 100 downloads/hour, up to 1080p
- **Pro**: Unlimited downloads, 4K support

### Payment Processing
- Stripe integration (configure keys in .env)
- Webhook handling for events
- Subscription management

## 🚀 Deployment

### Local Testing with Docker
```bash
docker-compose -f docker/docker-compose.yml up -d
docker-compose -f docker/docker-compose.yml down
```

### Kubernetes Deployment
```bash
# Apply configurations
kubectl apply -f kubernetes/deployment.yaml
kubectl apply -f kubernetes/service.yaml
kubectl apply -f kubernetes/ingress.yaml

# Check status
kubectl get deployment
kubectl get pods
kubectl get service
```

### Production Checklist
- [ ] Set strong `JWT_SECRET` in production
- [ ] Configure database with proper backups
- [ ] Set up Redis with persistence
- [ ] Configure S3 or similar for file storage
- [ ] Set up SSL/TLS certificates
- [ ] Configure rate limits appropriately
- [ ] Set up monitoring and alerting
- [ ] Configure email notifications
- [ ] Enable database backups
- [ ] Set up CDN for static assets
- [ ] Configure payment processing keys
- [ ] Set up error tracking (Sentry, etc.)

## 🧪 Testing

### Backend Unit Tests
```bash
cd backend
npm test
```

### Frontend Component Tests
```bash
cd frontend
npm test
```

### E2E Testing (Future)
```bash
npm run e2e
```

## 📝 Environment Variables

See [.env.example](.env.example) for complete configuration options.

**Key Variables:**
- `NODE_ENV` - Environment (development/production)
- `DATABASE_URL` - PostgreSQL connection string
- `REDIS_URL` - Redis connection string
- `JWT_SECRET` - Secret key for JWT signing
- `AWS_S3_BUCKET` - S3 bucket for file storage
- `STRIPE_SECRET_KEY` - Stripe API key
- `CORS_ORIGIN` - Frontend URL for CORS

## 🔄 Video Download Flow

1. User pastes video URL into the interface
2. Frontend validates URL and sends to backend
3. Backend uses yt-dlp to extract video information
4. Available formats and qualities are returned to frontend
5. User selects desired format
6. Download is queued in Redis using Bull
7. Background worker processes the download
8. Temporary S3 URL is generated (1-hour expiration)
9. Download link is sent to user
10. File is auto-deleted after 24 hours

## 🛡️ Rate Limiting

- **Free Tier**: 10 requests/hour per IP
- **Premium Tier**: 100 requests/hour per user
- **Strict Limits**: 5 requests/minute for auth endpoints
- **Window**: Configurable via `RATE_LIMIT_WINDOW`

## 📱 Supported Platforms

- YouTube & YouTube Shorts
- TikTok
- Instagram (Posts, Reels, Stories)
- Vimeo
- Dailymotion
- Facebook
- Twitter/X
- Twitch (VODs)
- Reddit
- And many more via yt-dlp support

## 🚦 CI/CD Pipeline

The project includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that:
1. Runs on push to main branch
2. Builds and tests backend and frontend
3. Runs linting and type checking
4. Builds Docker images
5. Deploys to Kubernetes cluster

## 📚 Additional Documentation

- [Frontend Setup Guide](./frontend/README.md)
- [Backend API Documentation](./backend/README.md)
- [Database Migration Guide](./backend/migrations/README.md)
- [Deployment Guide](./docs/DEPLOYMENT.md)
- [Architecture Overview](./docs/ARCHITECTURE.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## ⚠️ Legal Disclaimer

This platform should only be used to download content that:
- You have permission to download
- Is in the public domain
- Is under Creative Commons or similar permissive licenses
- Is for personal, non-commercial use where permitted

The platform respects platform terms of service. Always comply with copyright laws and terms of service of the original content platforms. Users are responsible for ensuring their use is legal in their jurisdiction.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [yt-dlp](https://github.com/yt-dlp/yt-dlp) - Video extraction
- [Next.js](https://nextjs.org/) - React framework
- [Express.js](https://expressjs.com/) - Web framework
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [PostgreSQL](https://www.postgresql.org/) - Database

## 📧 Support & Contact

For issues, questions, or suggestions:
- Open an issue on GitHub
- Email: support@y2save.com
- Documentation: See docs/ folder

## 🎯 Roadmap

### Phase 1 (MVP)
- ✅ Basic video downloading
- ✅ YouTube support
- ✅ Multi-format selection
- ✅ User authentication

### Phase 2
- [ ] Multi-platform support expansion
- [ ] Advanced search & filters
- [ ] Download history & playlists
- [ ] Ad integration

### Phase 3
- [ ] Chrome extension
- [ ] Mobile apps (iOS/Android)
- [ ] Premium subscriptions
- [ ] Creator dashboard

### Phase 4
- [ ] Live streaming support
- [ ] Advanced analytics
- [ ] Creator monetization
- [ ] Community features

---

**Version**: 1.0.0  
**Last Updated**: March 2024  
**Status**: Production Ready ✅
