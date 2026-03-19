# Y2Save - Vercel Deployment Guide

## Quick Deploy to Vercel

### Step 1: Deploy Frontend to Vercel

```bash
# Navigate to frontend directory
cd frontend

# Build locally to test
npm run build

# Deploy using Vercel CLI (recommended)
npm i -g vercel
vercel
```

Or connect your GitHub repository to Vercel:
1. Go to https://vercel.com
2. Click "New Project"
3. Select your GitHub repository
4. Vercel will detect Next.js automatically

### Step 2: Configure Environment Variables on Vercel

**Via Vercel Dashboard:**
1. Go to your project on vercel.com
2. Settings → Environment Variables
3. Add these variables:

```
NEXT_PUBLIC_API_URL = https://your-backend-url.com/api/v1
NEXT_PUBLIC_AD_NETWORK_ID = your-ad-network-id
```

**Via Vercel CLI:**
```bash
vercel env add NEXT_PUBLIC_API_URL
# Enter: https://your-backend-url.com/api/v1

vercel env add NEXT_PUBLIC_AD_NETWORK_ID
# Enter: your-ad-network-id
```

### Step 3: Redeploy After Adding Variables

```bash
# Redeploy to apply environment variables
vercel --prod
```

### Step 4: Verify Deployment

- Check: https://y2-save.vercel.app
- Should see the homepage with the download form
- Check build logs if still seeing 404

---

## Troubleshooting 404 Error

### Issue: Page Not Found (404)

**Solution:**
1. Check build logs on Vercel dashboard
2. Ensure `tsconfig.json` is correct (we fixed this)
3. Verify environment variables are set
4. Check if the build succeeded (green checkmark on Vercel)

**Common Causes:**
- ❌ Missing environment variables
- ❌ Incorrect TypeScript configuration
- ❌ Build errors (check logs)
- ❌ File import errors
- ❌ Missing dependencies

### Fix Applied:
- ✅ Fixed `tsconfig.json` JSX setting (changed to "preserve")
- ✅ Fixed typo in `isolatedModules`
- ✅ Fixed Button component usage in page.tsx
- ✅ Created `vercel.json` configuration
- ✅ Added `.env.local` for local development

### Verify Build Locally:
```bash
cd frontend

# Clear build cache
rm -rf .next

# Build
npm run build

# If build succeeds locally, it will work on Vercel
npm start
```

---

## Backend API Configuration

If you need to use the backend (for video downloading):

### Option 1: Deploy Backend to Vercel (Functions)

```bash
# This doesn't work well for long-running video processing
# Not recommended for Y2Save backend
```

### Option 2: Deploy Backend Elsewhere

Deploy backend to AWS, Heroku, Railway, or similar:

```bash
# Update NEXT_PUBLIC_API_URL on Vercel to point to your backend
# Example: https://y2save-backend.herokuapp.com/api/v1
```

### Option 3: Use Mock API (Development)

Current frontend works with mock data. To use real backend:

1. Deploy backend to server with public URL
2. Set `NEXT_PUBLIC_API_URL` on Vercel
3. Redeploy frontend

---

## Environment Variables Explained

### Required for Vercel

```env
# Backend API endpoint (where videos are downloaded)
NEXT_PUBLIC_API_URL=https://your-backend.com/api/v1

# Ad network configuration
NEXT_PUBLIC_AD_NETWORK_ID=ca-pub-xxxxxxxxxxxxxxxx
```

### For Local Development (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
NEXT_PUBLIC_AD_NETWORK_ID=test-ad-id
```

---

## Step-by-Step Fix If Still Getting 404

### 1. Check Build Log
- Vercel Dashboard → Deployments → Click latest
- Click "Build Logs" tab
- Look for any errors
- Take note of any TypeScript or build errors

### 2. Fix Build Errors
If you see errors:
```bash
cd frontend

# Try these commands locally
npm install
npm run type-check
npm run build
```

### 3. Rebuild on Vercel
```bash
# Trigger new deployment
vercel --prod --force
```

### 4. Check Public Files
Ensure `public/favicon.ico` exists or remove the reference:

```typescript
// In layout.tsx, change:
<link rel="icon" href="/favicon.ico" />

// To:
{/* <link rel="icon" href="/favicon.ico" /> */}
```

---

## Production Deployment Checklist

- [ ] Fixed tsconfig.json ✅
- [ ] Created vercel.json ✅
- [ ] Set environment variables on Vercel
- [ ] Build succeeds locally (`npm run build`)
- [ ] Redeploy with environment variables
- [ ] Test homepage loads (no 404)
- [ ] Test video URL input (if backend connected)
- [ ] Check browser console for errors (F12)
- [ ] Test on mobile device
- [ ] Set up custom domain (optional)

---

## Connecting Custom Domain

1. Vercel Dashboard → Settings → Domains
2. Add your domain (example.com)
3. Update DNS records (Vercel will provide them)
4. SSL certificate auto-generated (free)

---

## Performance Tips

- [ ] Enable image optimization (already in config)
- [ ] Use Next.js analytics (optional)
- [ ] Set up monitoring with Vercel
- [ ] Enable Edge Caching for static assets

---

## Rollback to Previous Version

If new deployment is broken:

1. Vercel Dashboard → Deployments
2. Find working deployment
3. Click the three dots (...)
4. Select "Promote to Production"

---

## Commands Reference

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to staging
vercel

# Deploy to production
vercel --prod

# Preview without merging
vercel --prebuilt

# See project settings
vercel projects ls

# View environment variables
vercel env ls

# Redeploy with new vars
vercel --prod --force
```

---

## Still Having Issues?

### Check These:

1. **Vercel Build Log**
   - Review for error messages
   - Search for "error" keyword

2. **TypeScript Errors**
   - Run locally: `npm run type-check`
   - Fix all errors before deploying

3. **Missing Files**
   - Verify all imports exist
   - Check file paths are correct

4. **Node Modules**
   - Vercel rebuilds automatically
   - Make sure all dependencies are in package.json

5. **Network Issues**
   - Check if backend API is running
   - Verify API URL in environment variables
   - Test API from browser console:
   ```javascript
   fetch('YOUR_API_URL_HERE/health')
     .then(r => r.json())
     .then(console.log)
   ```

---

## Support

For more help:
- Vercel Docs: https://vercel.com/docs
- Next.js Deployment: https://nextjs.org/docs/deployment
- Check Vercel Dashboard build logs for specific errors

---

**Last Updated**: March 2024  
**Status**: Ready for Production ✅
