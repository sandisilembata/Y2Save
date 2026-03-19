# Y2Save Frontend - Complete Troubleshooting Guide

## Quick Checklist - Getting Y2Save Working on Vercel

- [ ] Created vercel.json ✅
- [ ] Fixed tsconfig.json ✅
- [ ] Fixed Button component usage ✅
- [ ] Committed and pushed changes to GitHub
- [ ] Set environment variables on Vercel dashboard
- [ ] Triggered redeployment
- [ ] Verified homepage loads
- [ ] Checked health endpoint (/health)

---

## 404 Error - Root Causes & Solutions

### Cause 1: TypeScript Configuration Error ❌ → ✅ FIXED

**Symptoms:**
- Build fails with JSX errors
- Pages not found after deployment
- "Cannot find module" errors

**Root Cause:**
```json
{
  "jsx": "react-jsx",        // ❌ WRONG - causes Next.js build failure
  "isolated Modules": true   // ❌ TYPO - should be "isolatedModules"
}
```

**Solution (Already Applied):**
```json
{
  "jsx": "preserve",          // ✅ CORRECT - Next.js handles JSX
  "isolatedModules": true     // ✅ CORRECT - proper spacing
}
```

### Cause 2: Invalid Component Props ❌ → ✅ FIXED

**Symptoms:**
- Build errors about unknown prop "as"
- Compilation fails
- Cannot build static pages

**Root Cause:**
```tsx
<Button as="span">Text</Button>  // ❌ Button doesn't have 'as' prop
```

**Solution (Already Applied):**
```tsx
<Button onClick={handleClick}>Text</Button>  // ✅ CORRECT - use onClick
```

### Cause 3: Missing vercel.json ❌ → ✅ FIXED

**Symptoms:**
- Vercel uses default settings
- Build might fail if dependencies aren't specified
- Deployments unstable

**Solution (Already Applied):**
Created `vercel.json` with explicit build configuration

### Cause 4: Environment Variables Not Set ❌ → ✅ NEEDS YOUR ACTION

**Symptoms:**
- Page loads but API calls fail
- Errors in console about missing URLs
- "Cannot connect to backend"

**Solution (YOU NEED TO DO THIS):**

1. Go to https://vercel.com/dashboard
2. Select your project (y2-save)
3. Settings → Environment Variables
4. Add variables:

```
NEXT_PUBLIC_API_URL = http://localhost:3001/api/v1
NEXT_PUBLIC_AD_NETWORK_ID = test-ad-id
```

5. Redeploy

### Cause 5: Build Cache Issues ❌ → ✅ CAN CLEAR

**Symptoms:**
- Old version keeps showing
- Changes not reflecting
- "Deployment successful but no changes"

**Solution:**
```bash
# Clear local cache
rm -rf .next/

# On Vercel dashboard: 
# Deployments → Click three dots → 'Redeploy' (not just rebuild)
```

---

## Step-by-Step Fix Guide

### Phase 1: Apply Code Fixes ✅ DONE

Fixes already applied to these files:
- ✅ `frontend/tsconfig.json` - Fixed JSX and isolatedModules
- ✅ `frontend/src/app/page.tsx` - Fixed Button component
- ✅ `frontend/vercel.json` - Created
- ✅ `frontend/.env.local` - Created
- ✅ `frontend/src/app/health/page.tsx` - Created

### Phase 2: Commit and Push (YOU DO THIS)

```bash
cd frontend

# Verify fixes locally
npm install
npm run build  # Should succeed!
npm start      # Visit http://localhost:3000

# If build succeeds locally, deploy to Vercel
git add -A
git commit -m "Fix: Resolve 404 error - fix tsconfig and API errors"
git push origin main
```

### Phase 3: Configure Environment Variables (YOU DO THIS)

1. Open https://vercel.com
2. Click your project (y2-save)
3. Settings tab → Environment Variables
4. Click "Add New"
5. Create these two:

| Key | Value |
|-----|-------|
| NEXT_PUBLIC_API_URL | http://localhost:3001/api/v1 |
| NEXT_PUBLIC_AD_NETWORK_ID | test-ad-id |

6. Click "Save"

### Phase 4: Redeploy (YOU DO THIS)

Vercel will auto-deploy when you push, but to force it:

1. Go to Vercel Deployments
2. Click latest deployment's three-dot menu
3. Choose "Redeploy"
4. Wait for build to complete (green checkmark)

### Phase 5: Verify (YOU DO THIS)

Test these URLs:

| URL | Expected Result |
|-----|-----------------|
| https://y2-save.vercel.app | Homepage loads, no 404 |
| https://y2-save.vercel.app/health | ✅ status page |
| https://y2-save.vercel.app/history | History page loads |
| https://y2-save.vercel.app/nonexistent | Should show 404 |

---

## Build Locally First (Recommended)

This ensures everything works before pushing:

```bash
cd frontend

# Install dependencies
npm install

# Check for TypeScript errors
npm run type-check
# Should output: "✓ No type errors"

# Build production version
npm run build
# Should output: "✓ Compiled successfully"

# Test production build locally
npm start
# Visit http://localhost:3000
```

If any errors, they'll show here before deploying.

---

## Vercel Build Issues - Diagnosis

### Check Build Log

1. Vercel Dashboard → Deployments
2. Click the failed deployment
3. Click "Build Logs" tab
4. Search for "error"
5. Look for lines like:
   - "SyntaxError"
   - "Cannot find module"
   - "Type error"

### Common Build Errors & Fixes

#### Error: "Cannot find module '@/components/...'"
```
❌ Cause: tsconfig.json path alias not working
✅ Fix: We already fixed this! Redeploy.
```

#### Error: "JSX syntax error"
```
❌ Cause: jsx setting in tsconfig.json
✅ Fix: We changed it to "preserve". Redeploy.
```

#### Error: "Property 'as' does not exist on type 'ButtonProps'"
```
❌ Cause: Invalid prop usage in components
✅ Fix: We fixed Button usage. Redeploy.
```

#### Error: "NEXT_PUBLIC_API_URL is undefined"
```
❌ Cause: Missing environment variable
✅ Fix: Set it in Vercel dashboard Environment Variables
```

---

## Browser Console Debugging

When visiting the deployed site (F12 to open DevTools):

### **Console Tab** (red errors = problems)

Example errors to look for:
```
Uncaught TypeError: Cannot read property 'something'
Failed to fetch from API
CORS error
```

### **Network Tab** (red requests = failed)

1. Open DevTools (F12)
2. Click Network tab
3. Reload page
4. Look for red status codes:
   - 404 = File not found
   - 500 = Server error
   - 503 = Service unavailable

### **Application Tab** (for debugging)

Check Environment variables:
1. Open DevTools (F12)
2. Application tab
3. Local Storage
4. See if variables are stored

---

## Performance & Loading Issues

### Page Loads Slowly

```bash
# Check bundle size
npm run build
# Look for: "Compiled successfully" and file sizes

# Optimize if needed
npm install -D webpack-bundle-analyzer
```

### Images Not Loading

Check image domain configuration in `next.config.js`:
```javascript
images: {
  domains: ['i.ytimg.com', 'i.vimeocdn.com'],
}
```

Add more domains if needed for your video thumbnails.

---

## Common Vercel Deployment Issues

### Issue: "Deployment successful, but page shows old version"

**Solution:**
```bash
# Option 1: Clear cache on Vercel
vercel env pull  # Pull current env vars
rm -rf .next     # Clear local build

# Option 2: Redeploy with --force
vercel --prod --force

# Option 3: Go to Vercel dashboard and redeploy
```

### Issue: "Can't connect to backend API"

**Check:**
1. Is backend running? (Not needed for frontend-only demo)
2. Is API URL correct in `.env`?
3. Check browser console for CORS errors
4. Verify NEXT_PUBLIC_API_URL environment variable is set on Vercel

### Issue: "Deployment takes too long or times out"

**Solution:**
- Vercel usually takes 30-60 seconds
- If longer, check build logs for hanging commands
- Check Dependencies in package.json for unnecessary packages

---

## Rollback to Previous Version

If something breaks after redeploy:

1. Vercel Dashboard → Deployments
2. Find the working deployment
3. Click its three-dot menu
4. Select "Promote to Production"
5. It brings back previous version

---

## Advanced Debugging - Checking Files on Vercel

Deploy with verbose logging:

```bash
# Using Vercel CLI
vercel deploy --prod --debug

# Check build output
vercel logs <deployment-url>
```

---

## Contact Support / Get Help

If still stuck:

1. **Check these files first:**
   - `FIXES-APPLIED.md` - What was changed
   - `VERCEL-DEPLOYMENT.md` - Deployment steps
   - This file - Troubleshooting guide

2. **Provide this info when asking for help:**
   ```
   - Vercel deployment URL
   - Build log error (if any)
   - Browser console error (F12)
   - Screenshot of the issue
   - Steps to reproduce
   ```

3. **Resources:**
   - https://vercel.com/docs
   - https://nextjs.org/docs/deployment
   - https://github.com/vercel/next.js/discussions

---

## Success Criteria - You Know It's Worked When...

✅ Homepage loads without 404  
✅ No red errors in browser console (F12)  
✅ Navigation to /history works  
✅ Navigation to /health shows status page  
✅ No TypeScript errors when building locally  
✅ Vercel dashboard shows green checkmark  
✅ Build completes in under 2 minutes  

If all above pass → **Deployment successful!** 🎉

---

## Quick Command Reference

```bash
# Local testing
npm install
npm run type-check
npm run build
npm start

# Git operations
git add .
git commit -m "Fix: Vercel deployment issues"
git push origin main

# Vercel operations
npm i -g vercel
vercel login
vercel                    # Deploy to staging
vercel --prod            # Deploy to production
vercel --prod --force    # Force redeploy
vercel env ls            # List env vars
```

---

**Last Updated:** March 2024  
**Status:** Troubleshooting Guide Complete ✅
