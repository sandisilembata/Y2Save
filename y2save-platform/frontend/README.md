# Y2Save Frontend Documentation

## Overview

The Y2Save frontend is built with Next.js 14, React 18, TypeScript, and Tailwind CSS. It provides a modern, responsive user interface for downloading videos from various platforms.

## Setup

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Start development server
npm run dev
```

The app will be available at `http://localhost:3000`

## Project Structure

```
frontend/
├── src/
│   ├── app/                    # Next.js 14 App Router
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Home page
│   │   ├── download/           # Download pages
│   │   └── history/            # History pages
│   │
│   ├── components/             # React components
│   │   ├── ui/                 # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Alert.tsx
│   │   │   └── Loader.tsx
│   │   ├── forms/              # Form components
│   │   │   └── UrlInput.tsx
│   │   ├── video/              # Video-specific components
│   │   │   ├── VideoInfo.tsx
│   │   │   └── DownloadOptions.tsx
│   │   └── layout/             # Layout components
│   │       ├── Header.tsx
│   │       ├── Footer.tsx
│   │       └── AdBanner.tsx
│   │
│   ├── hooks/                  # Custom React hooks
│   │   ├── useDownload.ts      # Download functionality
│   │   └── useDownloadHistory.ts
│   │
│   ├── lib/                    # Utility functions
│   │   ├── api.ts              # Axios API client
│   │   └── utils.ts            # Helper functions
│   │
│   ├── styles/                 # CSS files
│   │   └── globals.css         # Global styles
│   │
│   ├── types/                  # TypeScript types
│   │   └── index.ts            # All app types
│   │
│   └── public/                 # Static assets
│
├── package.json
├── tsconfig.json
├── next.config.js
├── tailwind.config.ts
└── postcss.config.js
```

## Key Components

### UI Components

#### Button
```tsx
import { Button } from '@/components/ui/Button'

<Button 
  variant="primary" 
  size="md" 
  loading={false}
  onClick={handleClick}
>
  Click me
</Button>
```

Available variants: `primary`, `secondary`, `danger`
Available sizes: `sm`, `md`, `lg`

#### Input
```tsx
import { Input } from '@/components/ui/Input'

<Input
  label="Video URL"
  placeholder="Paste URL here"
  error={errorMessage}
  onChange={handleChange}
/>
```

#### Card
```tsx
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>
    Content goes here
  </CardContent>
</Card>
```

#### Alert
```tsx
import { Alert } from '@/components/ui/Alert'

<Alert 
  type="success" 
  message="Success message" 
  onClose={() => {}}
/>
```

Available types: `success`, `error`, `warning`, `info`

#### Loader
```tsx
import { Loader } from '@/components/ui/Loader'

<Loader size="md" />
```

Available sizes: `sm`, `md`, `lg`

## Custom Hooks

### useDownload
Handles video info retrieval and download requests.

```tsx
const { 
  loading, 
  error, 
  videoInfo, 
  getVideoInfo, 
  requestDownload 
} = useDownload()

// Get video info
await getVideoInfo(url)

// Request download
const result = await requestDownload({
  video_url: url,
  format_id: '22',
  quality: '720p'
})
```

### useDownloadHistory
Fetches and manages user's download history.

```tsx
const { 
  downloads, 
  loading, 
  error, 
  refetch 
} = useDownloadHistory()
```

## API Integration

The frontend uses an Axios instance configured in `lib/api.ts`:

```tsx
import apiClient from '@/lib/api'

// GET request
const data = await apiClient.get('/endpoint')

// POST request
const response = await apiClient.post('/endpoint', { body })

// With auth token (automatically added):
// Authorization: Bearer {token}
```

## Styling

The project uses Tailwind CSS for styling. Custom configurations are in `tailwind.config.ts`.

### Custom Colors
```tsx
colors: {
  primary: '#3B82F6',
  secondary: '#1F2937',
  success: '#10B981',
  danger: '#EF4444',
  warning: '#F59E0B',
}
```

### Utility Classes
```tsx
// Use Tailwind classes
<div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
  Content
</div>
```

## Environment Variables

Create `.env.local` from `.env.example`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
NEXT_PUBLIC_AD_NETWORK_ID=your-ad-id
```

**Note**: Only variables prefixed with `NEXT_PUBLIC_` are exposed to the browser.

## Pages

### Home Page (`/`)
Main landing page with:
- URL input form
- Video information display
- Format selection
- Download options
- Feature showcase
- Supported platforms

### Download Page (`/download`)
Dedicated download page with:
- Advanced options
- Quality selection
- Format filters
- Download history access

### History Page (`/history`)
User's download history with:
- Table of past downloads
- File details (size, quality, format)
- Download dates
- Status indicators

## Building for Production

```bash
# Build the app
npm run build

# Start production server
npm start

# Export as static HTML (if applicable)
npm run export
```

## Performance Optimization

- Image optimization with Next.js Image component
- Code splitting and lazy loading
- CSS optimization with Tailwind
- Bundle analysis with `npm run analyze`

## Type Safety

The project uses TypeScript with strict mode enabled:

```tsx
// All types defined in src/types/index.ts
interface User {
  id: string
  email: string
  subscription_tier: 'free' | 'premium' | 'pro'
  download_count: number
  created_at: string
}
```

## Error Handling

The app includes comprehensive error handling:

```tsx
try {
  await getVideoInfo(url)
} catch (err) {
  // Error is caught and displayed as Alert
  setError(err.message)
}
```

All errors are displayed to users via Alert components.

## Testing

```bash
# Run tests
npm test

# Run with coverage
npm test -- --coverage

# Watch mode
npm test -- --watch
```

## Deployment

### Vercel (Recommended for Next.js)
```bash
npm install -g vercel
vercel
```

### Docker
```bash
docker build -f docker/Dockerfile.frontend -t y2save-frontend .
docker run -p 3000:3000 y2save-frontend
```

### Manual Deployment
1. Build: `npm run build`
2. Deploy `dist` or `.next` folder to hosting service
3. Set environment variables on host
4. Restart server

## Troubleshooting

### API Connection Issues
- Check `NEXT_PUBLIC_API_URL` in `.env.local`
- Verify backend is running on correct port
- Check CORS settings on backend

### Styling Issues
- Clear `.next` cache: `rm -rf .next`
- Rebuild Tailwind: `npm run build`

### Performance Issues
- Check Network tab in DevTools
- Look for large bundle sizes
- Enable compression on server

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

**Version**: 1.0.0  
**Last Updated**: March 2024
