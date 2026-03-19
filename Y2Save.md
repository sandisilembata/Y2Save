# Y2Save- Web-Based Video Downloading Platform

## 1. Product Overview

### 1.1 Project Description
A web-based video downloading platform that allows users to download videos and music from various online platforms (YouTube, Vimeo, Dailymotion, Facebook, Instagram, TikTok etc.) by simply pasting URLs. The platform provides high-quality MP4 downloads without requiring software installation.

### 1.2 Target Audience
- General internet users wanting to download videos for offline viewing
- Mobile users with limited internet connectivity
- Content creators needing to download reference materials
- Users who prefer watching videos offline during travel
- Anyone seeking a free, browser-based video downloading solution

### 1.3 Value Proposition
- Free video downloading service
- No software installation required
- High-quality MP4 downloads (up to 4K where available)
- Cross-platform compatibility (desktop & mobile)
- Simple, intuitive user interface

## 2. Features

### 2.1 Core Features
| Feature | Description | Priority |
|---------|-------------|----------|
| URL-based Video Download | Paste URL and fetch available download options | P0 |
| Multiple Format Support | MP4, MP3, WEBM, etc. | P0 |
| Quality Selection | 144p to 4K quality options | P0 |
| Video Preview | Thumbnail and video information display | P1 |
| Download History | Track user download history (with login) | P2 |
| Mobile Responsive Design | Optimized for all devices | P0 |

### 2.2 Monetization Features
| Feature | Description | Priority |
|---------|-------------|----------|
| Ad Integration | Banner ads, interstitial ads between downloads | P0 |
| Premium Subscriptions | Ad-free experience, faster downloads, more formats | P1 |
| Download Limits | Free tier limits (e.g., 5 downloads/hr) | P1 |
| Affiliate Links | Recommended video editing tools/products | P2 |
| Sponsored Content | Promoted videos in search results | P2 |

### 2.3 Browser Extension
| Feature | Description | Priority |
|---------|-------------|----------|
| One-click Download | Download button appears on supported sites | P1 |
| Extension Popup UI | Quick access to download functionality | P1 |
| Settings Panel | Format and quality preferences | P2 |

### 2.4 Mobile App Features (Future Phase)
| Feature | Description | Priority |
|---------|-------------|----------|
| Native Mobile Apps | iOS and Android applications | P2 |
| Background Downloads | Download videos while using other apps | P2 |
| Offline Library | Downloaded content management | P2 |

## 3. Technical Specifications

### 3.1 Functional Requirements
1. **URL Processing**: System must accept and validate URLs from supported platforms
2. **Video Information Extraction**: Extract title, thumbnail, duration, available formats
3. **Download Processing**: Generate secure download links with expiration
4. **Rate Limiting**: Prevent abuse (max 10 downloads per IP per hour for free tier)
5. **File Management**: Temporary storage with auto-deletion after 24 hours

### 3.2 Non-Functional Requirements
1. **Performance**: Video processing within 30 seconds for HD content
2. **Availability**: 99.9% uptime
3. **Scalability**: Handle 10,000 concurrent users
4. **Security**: HTTPS only, no stored user data without consent
5. **Compliance**: Adhere to platform terms of service and copyright laws

## 4. System Architecture

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│   Client    │────▶│  Load        │────▶│  Web        │
│  (Browser)  │◀────│  Balancer    │◀────│  Servers    │
└─────────────┘     └──────────────┘     └──────┬──────┘
                                                  │
                                                  ▼
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│  CDN for    │◀────│  Video       │────▶│  Database   │
│  Static     │     │  Processing  │     │  (Redis/    │
│  Assets     │     │  Service     │     │  PostgreSQL)│
└─────────────┘     └──────────────┘     └─────────────┘
                           │
                           ▼
                    ┌─────────────┐
                    │  Temporary  │
                    │  File       │
                    │  Storage    │
                    └─────────────┘
```

## 5. Tech Stack

### 5.1 Frontend
- **Framework**: Next.js 14 (React) with TypeScript
- **Styling**: Tailwind CSS + Shadcn UI components
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Form Handling**: React Hook Form + Zod validation

### 5.2 Backend
- **API Framework**: Node.js + Express.js or NestJS
- **Language**: TypeScript
- **Authentication**: JWT-based auth
- **Video Processing**: youtube-dl-exec / ytdl-core / pytube
- **Task Queue**: BullMQ (Redis-based)

### 5.3 Database
- **Primary DB**: PostgreSQL (user data, download history)
- **Cache**: Redis (session management, rate limiting)
- **File Storage**: AWS S3 or similar (temporary video storage)

### 5.4 Infrastructure
- **Cloud Provider**: AWS / Google Cloud / DigitalOcean
- **Containerization**: Docker
- **Orchestration**: Kubernetes (for scaling)
- **CI/CD**: GitHub Actions
- **Monitoring**: Prometheus + Grafana

## 6. Boilerplate Structure

```
y2save-clone/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── app/                    # Next.js app router
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx            # Home page
│   │   │   ├── download/
│   │   │   │   └── page.tsx        # Download page
│   │   │   └── history/
│   │   │       └── page.tsx        # Download history
│   │   ├── components/
│   │   │   ├── ui/                  # Reusable UI components
│   │   │   ├── forms/
│   │   │   │   └── UrlInput.tsx
│   │   │   ├── video/
│   │   │   │   ├── VideoInfo.tsx
│   │   │   │   └── DownloadOptions.tsx
│   │   │   └── layout/
│   │   │       ├── Header.tsx
│   │   │       ├── Footer.tsx
│   │   │       └── AdBanner.tsx     # Monetization
│   │   ├── hooks/
│   │   │   ├── useDownload.ts
│   │   │   └── useVideoInfo.ts
│   │   ├── lib/
│   │   │   ├── api.ts
│   │   │   └── utils.ts
│   │   ├── styles/
│   │   │   └── globals.css
│   │   └── types/
│   │       └── index.ts
│   ├── package.json
│   └── tsconfig.json
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── download.controller.ts
│   │   │   ├── auth.controller.ts
│   │   │   └── user.controller.ts
│   │   ├── services/
│   │   │   ├── video.service.ts      # ytdl-core integration
│   │   │   ├── download.service.ts
│   │   │   └── queue.service.ts
│   │   ├── middleware/
│   │   │   ├── auth.middleware.ts
│   │   │   ├── rateLimiter.ts
│   │   │   └── errorHandler.ts
│   │   ├── models/
│   │   │   ├── User.model.ts
│   │   │   └── Download.model.ts
│   │   ├── utils/
│   │   │   ├── videoParser.ts
│   │   │   └── fileManager.ts
│   │   ├── config/
│   │   │   └── database.ts
│   │   └── app.ts
│   ├── queue-workers/
│   │   └── videoProcessor.ts
│   ├── package.json
│   └── tsconfig.json
│
├── extension/                        # Chrome Extension
│   ├── manifest.json
│   ├── popup.html
│   ├── popup.ts
│   ├── background.ts
│   └── content.ts
│
├── docker/
│   ├── Dockerfile.frontend
│   ├── Dockerfile.backend
│   └── docker-compose.yml
│
├── kubernetes/
│   ├── deployment.yaml
│   ├── service.yaml
│   └── ingress.yaml
│
├── .github/
│   └── workflows/
│       └── deploy.yml
│
├── .env.example
├── .gitignore
└── README.md
```

## 7. System Design Details

### 7.1 Video Download Flow
1. User submits URL → Frontend validation
2. Backend validates URL and extracts video info
3. Video service fetches available formats/qualities
4. Frontend displays options with thumbnails
5. User selects format → Request queued
6. Video processing worker downloads and temporarily stores file
7. Signed URL generated for download (expires in 1 hour)
8. File auto-deleted after 24 hours

### 7.2 Database Schema

**Users Table**
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  password_hash VARCHAR(255),
  subscription_tier VARCHAR(50) DEFAULT 'free',
  download_count INTEGER DEFAULT 0,
  created_at TIMESTAMP
);
```

**Downloads Table**
```sql
CREATE TABLE downloads (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  video_url TEXT,
  video_title VARCHAR(500),
  format VARCHAR(20),
  quality VARCHAR(20),
  file_size INTEGER,
  downloaded_at TIMESTAMP,
  ip_address VARCHAR(45)
);
```

### 7.3 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/v1/video/info | Get video information from URL |
| POST | /api/v1/download/request | Request video download |
| GET | /api/v1/download/:id | Download file (signed URL) |
| GET | /api/v1/user/history | Get download history |
| POST | /api/v1/auth/register | User registration |
| POST | /api/v1/auth/login | User login |
| POST | /api/v1/subscribe | Upgrade subscription |

## 8. Environment Variables

Create a `.env` file with the following:

```env
# Server
NODE_ENV=production
PORT=3001
API_URL=https://api.savefromclone.com

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/savefrom
REDIS_URL=redis://localhost:6379

# Authentication
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRY=7d

# Video Processing
YTDLP_PATH=/usr/local/bin/yt-dlp
TEMP_STORAGE_PATH=/tmp/downloads
MAX_FILE_SIZE=1073741824  # 1GB
DOWNLOAD_EXPIRY=3600  # 1 hour in seconds

# Storage
AWS_ACCESS_KEY_ID=your-aws-key
AWS_SECRET_ACCESS_KEY=your-aws-secret
AWS_S3_BUCKET=savefrom-downloads
AWS_REGION=us-east-1

# Rate Limiting
RATE_LIMIT_WINDOW=3600000  # 1 hour in ms
RATE_LIMIT_FREE=10  # 10 downloads per hour
RATE_LIMIT_PREMIUM=100  # 100 downloads per hour

# Monetization
STRIPE_PUBLIC_KEY=pk_test_xxx
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
AD_NETWORK_ID=your-ad-network-id
AD_SLOT_ID=123456789

# Frontend
NEXT_PUBLIC_API_URL=https://api.savefromclone.com
NEXT_PUBLIC_STRIPE_KEY=pk_test_xxx
NEXT_PUBLIC_AD_NETWORK_ID=your-ad-network-id
```

## 9. README.md

```markdown
# Y2Save - Video Downloader Platform

A feature-rich, web-based video downloading platform that allows users to download videos from popular streaming sites.

## 🚀 Features

- **URL-based downloading** - Paste any video URL and get download options
- **Multiple formats** - Download as MP4, MP3, WEBM
- **Quality options** - From 144p to 4K (where available)
- **Browser extension** - One-click downloads from supported sites
- **Mobile responsive** - Works perfectly on all devices
- **Monetization ready** - Ad integration and premium subscriptions

## 📋 Supported Platforms

- YouTube
- Vimeo
- Dailymotion
- Facebook
- Twitter/X
- Instagram
- TikTok
- And many more...

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express, TypeScript
- **Database**: PostgreSQL, Redis
- **Video Processing**: yt-dlp, FFmpeg
- **Infrastructure**: Docker, Kubernetes, AWS

## 🏁 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL 14+
- Redis 7+
- FFmpeg
- yt-dlp

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/savefrom-clone.git
cd savefrom-clone
```

2. Install dependencies
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Set up the database
```bash
npm run db:migrate
npm run db:seed
```

5. Start development servers
```bash
# Backend (from /backend)
npm run dev

# Frontend (from /frontend)
npm run dev
```

6. Access the application
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

## 📦 Deployment

### Docker Deployment
```bash
docker-compose up -d
```

### Kubernetes Deployment
```bash
kubectl apply -f kubernetes/
```

## 💰 Monetization Setup

1. **Ad Integration**: Configure your ad network ID in `.env`
2. **Paypal Payments**: Set up Paypal keys for premium subscriptions
3. **Subscription Plans**: Configure plans in Stripe dashboard
4. **Download Limits**: Adjust rate limits in environment variables

## 🔒 Legal Compliance

⚠️ **Important**: This software should only be used to download content:
- You have permission to download
- That is in the public domain
- Under Creative Commons licenses
- For personal, non-commercial use where permitted

Always respect copyright laws and platform terms of service.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines first.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📧 Contact

Your Name - [@yourtwitter](https://twitter.com/yourtwitter) - email@example.com

Project Link: [https://github.com/yourusername/savefrom-clone](https://github.com/yourusername/savefrom-clone)

## 🙏 Acknowledgements

- [yt-dlp](https://github.com/yt-dlp/yt-dlp) for video extraction
- [Next.js](https://nextjs.org/) for the frontend framework
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Stripe](https://paypal.com/) for payment processing
```

## 10. Implementation Roadmap

### Phase 1: MVP 
- Basic URL input and video info extraction
- Support for YouTube only
- Simple download functionality
- Basic responsive UI

### Phase 2: Enhancement 
- Add more platform support
- Implement download queue system
- User authentication
- Download history

### Phase 3: Monetization 
- Ad integration
- Paypal payment processing
- Premium tier with higher limits
- Subscription management

### Phase 4: Extension & Scale (Weeks 13-16)
- Chrome extension development
- Performance optimization
- CDN integration
- Analytics and monitoring

This comprehensive PRD provides everything needed to build a SaveFrom.net clone with monetization features. The architecture is scalable, the tech stack is modern, and the implementation details are clear for development teams.