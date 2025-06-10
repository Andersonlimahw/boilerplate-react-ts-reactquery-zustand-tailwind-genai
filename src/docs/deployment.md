# Deployment Guide

This guide provides instructions for deploying your application to various hosting platforms.

## Table of Contents
- [Build Process](#build-process)
- [Environment Variables](#environment-variables)
- [Static File Serving](#static-file-serving)
- [Platform-Specific Guides](#platform-specific-guides)
  - [Vercel](#vercel)
  - [Netlify](#netlify)
  - [GitHub Pages](#github-pages)
  - [AWS S3 + CloudFront](#aws-s3--cloudfront)
- [CI/CD Integration](#cicd-integration)
- [Performance Optimization](#performance-optimization)
- [Monitoring](#monitoring)

## Build Process

To create a production build of your application:

```bash
# Install dependencies
npm install

# Create a production build
npm run build
```

This will create an optimized production build in the `dist` directory.

## Environment Variables

Create a `.env.production` file in the root of your project with production environment variables:

```env
VITE_API_BASE_URL=https://api.example.com
VITE_APP_TITLE="My Production App"
```

These variables will be embedded into the build at build time.

## Static File Serving

The production build is a static website that can be served by any web server. Example using `serve`:

```bash
# Install serve globally
npm install -g serve

# Serve the production build
serve -s dist
```

## Platform-Specific Guides

### Vercel

1. **Install Vercel CLI** (if deploying manually):
   ```bash
   npm install -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel
   ```
   Or connect your GitHub/GitLab repository through the Vercel dashboard.

3. **Configure Environment Variables** in the Vercel project settings.

### Netlify

1. **Install Netlify CLI** (if deploying manually):
   ```bash
   npm install -g netlify-cli
   ```

2. **Deploy**:
   ```bash
   netlify deploy --prod
   ```
   Or connect your Git repository through the Netlify dashboard.

3. **Configure Environment Variables** in the Netlify site settings.

### GitHub Pages

1. **Install gh-pages**:
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add scripts** to `package.json`:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```

3. **Deploy**:
   ```bash
   npm run deploy
   ```

### AWS S3 + CloudFront

1. **Install AWS CLI** and configure credentials:
   ```bash
   aws configure
   ```

2. **Create an S3 bucket** and enable static website hosting:
   ```bash
   aws s3 mb s3://your-bucket-name
   aws s3 website s3://your-bucket-name --index-document index.html --error-document index.html
   ```

3. **Upload build files**:
   ```bash
   aws s3 sync dist/ s3://your-bucket-name/ --delete
   ```

4. **Set up CloudFront** for CDN and HTTPS.

## CI/CD Integration

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Use Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install Dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
        env:
          VITE_API_BASE_URL: ${{ secrets.VITE_API_BASE_URL }}
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          working-directory: ./
          vercel-args: '--prod'
```

## Performance Optimization

1. **Code Splitting**:
   - Routes are automatically code-split by Vite
   - Use dynamic imports for large components:
     ```typescript
     const HeavyComponent = React.lazy(() => import('./HeavyComponent'));
     ```

2. **Image Optimization**:
   - Use modern image formats (WebP, AVIF)
   - Lazy load images with `loading="lazy"`
   - Consider using a CDN for images

3. **Bundle Analysis**:
   ```bash
   npm install --save-dev rollup-plugin-visualizer
   ```
   Then add to `vite.config.js`:
   ```javascript
   import { visualizer } from 'rollup-plugin-visualizer';
   
   export default defineConfig({
     plugins: [
       // ...
       visualizer(),
     ],
   });
   ```
   Run build and check `dist/stats.html`.

## Monitoring

1. **Error Tracking**:
   - Consider integrating with Sentry or LogRocket
   - Example with Sentry:
     ```bash
     npm install @sentry/react @sentry/tracing
     ```
     Then in your app:
     ```typescript
     import * as Sentry from '@sentry/react';
     
     Sentry.init({
       dsn: 'YOUR_DSN',
       integrations: [new Sentry.BrowserTracing()],
       tracesSampleRate: 1.0,
     });
     ```

2. **Performance Monitoring**:
   - Use the Web Vitals library:
     ```bash
     npm install web-vitals
     ```
     Then in your app:
     ```typescript
     import { getCLS, getFID, getLCP } from 'web-vitals';
     
     function sendToAnalytics(metric) {
       // Send to your analytics
       console.log(metric);
     }
     
     getCLS(sendToAnalytics);
     getFID(sendToAnalytics);
     getLCP(sendToAnalytics);
     ```

## Security

1. **Content Security Policy (CSP)**:
   - Configure CSP headers in your server
   - Example for Nginx:
     ```nginx
     add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self' https://api.example.com";
     ```

2. **Security Headers**:
   - Enable security headers like X-Frame-Options, X-Content-Type-Options, etc.
   - Example for Nginx:
     ```nginx
     add_header X-Frame-Options "SAMEORIGIN" always;
     add_header X-Content-Type-Options "nosniff" always;
     add_header X-XSS-Protection "1; mode=block" always;
     add_header Referrer-Policy "strict-origin-when-cross-origin" always;
     ```
