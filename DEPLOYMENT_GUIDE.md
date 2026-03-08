# TerminAItor Deployment Guide

Complete step-by-step guide to deploy TerminAItor to production.

---

## Table of Contents

1. [Quick Start](#quick-start)
2. [Frontend Deployment](#frontend-deployment)
3. [Backend Setup](#backend-setup)
4. [Environment Configuration](#environment-configuration)
5. [Testing](#testing)
6. [Monitoring](#monitoring)
7. [Troubleshooting](#troubleshooting)

---

## Quick Start

**Fastest way to deploy (5 minutes):**

1. Deploy frontend to Vercel
2. Ensure n8n workflow is active
3. Update environment variables
4. Test the application

---

## Frontend Deployment

### Option 1: Vercel (Recommended - Easiest)

**Why Vercel?**
- Automatic builds from git
- Global CDN
- Free tier available
- One-click deployment

**Steps:**

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Navigate to frontend**
   ```bash
   cd frontend
   ```

3. **Deploy**
   ```bash
   vercel
   ```
   - Follow the prompts
   - Select "Create a new project"
   - Choose "React" as framework

4. **Configure Environment Variables**
   - Go to https://vercel.com/dashboard
   - Select your project
   - Go to Settings → Environment Variables
   - Add new variable:
     - Name: `VITE_API_URL`
     - Value: `https://tooez4mohit.app.n8n.cloud/webhook/autocomplete`
   - Click "Save"

5. **Redeploy with new variables**
   ```bash
   vercel --prod
   ```

6. **Get your URL**
   - Your app is now live at: `https://your-project.vercel.app`

---

### Option 2: Netlify

**Why Netlify?**
- Similar to Vercel
- Good free tier
- Easy GitHub integration

**Steps:**

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Build the project**
   ```bash
   cd frontend
   npm run build
   ```

3. **Deploy**
   ```bash
   netlify deploy --prod --dir=dist
   ```

4. **Configure Environment Variables**
   - Go to https://app.netlify.com
   - Select your site
   - Go to Site settings → Build & deploy → Environment
   - Add variable:
     - Key: `VITE_API_URL`
     - Value: `https://tooez4mohit.app.n8n.cloud/webhook/autocomplete`

5. **Redeploy**
   ```bash
   netlify deploy --prod --dir=dist
   ```

---

### Option 3: GitHub Pages (Free but Limited)

**Steps:**

1. **Update vite.config.js**
   ```javascript
   export default defineConfig({
     base: '/terminaitor/',  // Your repo name
     plugins: [react()],
   });
   ```

2. **Build**
   ```bash
   cd frontend
   npm run build
   ```

3. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push origin main
   ```

4. **Enable GitHub Pages**
   - Go to your repo settings
   - Scroll to "GitHub Pages"
   - Select "Deploy from a branch"
   - Choose "main" branch and "/docs" folder
   - Or use GitHub Actions for automatic deployment

---

### Option 4: Custom VPS (Advanced)

**Prerequisites:**
- Ubuntu 20.04+ server
- Domain name (optional)
- SSH access

**Steps:**

1. **SSH into server**
   ```bash
   ssh user@your-server-ip
   ```

2. **Install Node.js**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

3. **Install Nginx**
   ```bash
   sudo apt update
   sudo apt install nginx
   ```

4. **Clone repository**
   ```bash
   git clone https://github.com/yourusername/terminaitor.git
   cd terminaitor/frontend
   ```

5. **Build**
   ```bash
   npm install
   npm run build
   ```

6. **Configure Nginx**
   ```bash
   sudo nano /etc/nginx/sites-available/terminaitor
   ```

   Add this configuration:
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       
       root /home/user/terminaitor/frontend/dist;
       index index.html;
       
       location / {
           try_files $uri $uri/ /index.html;
       }
       
       # Gzip compression
       gzip on;
       gzip_types text/plain text/css application/json application/javascript;
   }
   ```

7. **Enable site**
   ```bash
   sudo ln -s /etc/nginx/sites-available/terminaitor /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

8. **Setup SSL (Recommended)**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com
   ```

9. **Setup auto-renewal**
   ```bash
   sudo systemctl enable certbot.timer
   sudo systemctl start certbot.timer
   ```

---

## Backend Setup

### n8n Cloud (Recommended)

**Why n8n Cloud?**
- No server management
- Automatic scaling
- Free tier available
- Easy workflow management

**Steps:**

1. **Sign up for n8n Cloud**
   - Go to https://n8n.io
   - Click "Start free"
   - Create account

2. **Import Workflow**
   - In n8n dashboard, click "Add workflow"
   - Click menu (⋮) → "Import from File"
   - Select `n8n-workflow.json` from project root
   - Click "Import"

3. **Configure Gemini API Key**
   - Click on "Gemini API" node
   - In settings, find "Authentication"
   - Click credentials dropdown
   - Click "Create New Credential"
   - Select "HTTP Query Auth"
   - Fill in:
     - Name: `Gemini API Key`
     - Query Parameter Name: `key`
     - Query Parameter Value: `YOUR_GEMINI_API_KEY`
   - Click "Save"

4. **Activate Workflow**
   - Toggle the workflow to "Active" (green)
   - Copy the webhook URL from Webhook node
   - Format: `https://your-instance.app.n8n.cloud/webhook/autocomplete`

5. **Test**
   ```bash
   curl -X POST https://your-instance.app.n8n.cloud/webhook/autocomplete \
     -H "Content-Type: application/json" \
     -d '{"text": "git push"}'
   ```

---

### Self-Hosted n8n (Advanced)

**Prerequisites:**
- Docker or Node.js
- Server with 2GB+ RAM
- Domain name

**Using Docker:**

1. **Install Docker**
   ```bash
   curl -fsSL https://get.docker.com -o get-docker.sh
   sudo sh get-docker.sh
   ```

2. **Run n8n**
   ```bash
   docker run -d \
     -p 5678:5678 \
     -v ~/.n8n:/home/node/.n8n \
     --name n8n \
     n8nio/n8n
   ```

3. **Access n8n**
   - Open `http://localhost:5678`
   - Create account
   - Import workflow
   - Configure as above

4. **Setup Nginx Reverse Proxy**
   ```nginx
   server {
       listen 80;
       server_name n8n.your-domain.com;
       
       location / {
           proxy_pass http://localhost:5678;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection "upgrade";
           proxy_set_header Host $host;
       }
   }
   ```

---

## Environment Configuration

### Frontend Environment Variables

Create `frontend/.env.production`:

```bash
# Required
VITE_API_URL=https://your-instance.app.n8n.cloud/webhook/autocomplete

# Optional
VITE_GA_ID=your-google-analytics-id
```

### n8n Credentials

Store securely in n8n:
- **Gemini API Key** - Get from https://makersuite.google.com/app/apikey
- Never commit API keys to git
- Use environment variables in n8n

---

## Testing

### 1. Test Frontend

```bash
# Build locally
cd frontend
npm run build

# Test build
npm run preview
```

### 2. Test API Endpoint

```bash
# Test webhook
curl -X POST https://your-instance.app.n8n.cloud/webhook/autocomplete \
  -H "Content-Type: application/json" \
  -d '{"text": "git push"}'

# Expected response
{
  "suggestions": [
    "git push origin main # push to main branch",
    "git push -u origin feature-branch # push and set upstream",
    "git push --force-with-lease # safely force push"
  ],
  "originalText": "git push"
}
```

### 3. Test Full Application

1. Open deployed URL
2. Type a command: `docker ps`
3. Verify suggestions appear
4. Test copy button
5. Check animations work

---

## Monitoring

### Frontend Monitoring

**Vercel:**
- Dashboard shows analytics
- Monitor build status
- Check error logs

**Netlify:**
- Analytics dashboard
- Deploy logs
- Error tracking

**Custom VPS:**
- Monitor with `htop`
- Check Nginx logs: `sudo tail -f /var/log/nginx/error.log`
- Monitor disk space: `df -h`

### Backend Monitoring

**n8n Cloud:**
- Check execution logs
- Monitor API usage
- View error details

**Self-Hosted:**
- Monitor Docker: `docker stats`
- Check logs: `docker logs n8n`
- Monitor disk: `df -h`

### Gemini API Monitoring

- Check quota at https://makersuite.google.com
- Monitor request count
- Set up alerts for quota limits

---

## Troubleshooting

### Frontend Won't Load

**Check:**
1. Deployment completed successfully
2. Environment variables are set
3. Build has no errors
4. Browser cache cleared

**Fix:**
```bash
# Rebuild and redeploy
npm run build
vercel --prod
```

### API Returns Empty Response

**Check:**
1. n8n workflow is active
2. Gemini API key is valid
3. Webhook URL is correct
4. n8n executions show success

**Fix:**
- Go to n8n workflow
- Click "Executions"
- Check failed executions
- Fix the error

### Slow Response Times

**Causes:**
- Gemini API rate limits
- Network latency
- n8n processing time

**Solutions:**
1. Wait between requests
2. Upgrade Gemini to paid tier
3. Add caching in n8n
4. Use CDN for frontend

### CORS Errors

**n8n Cloud:**
- Automatically handles CORS
- No configuration needed

**Self-Hosted n8n:**
- Enable CORS in settings
- Configure allowed origins

---

## Performance Optimization

### Frontend

1. **Enable Gzip Compression**
   - Vercel/Netlify: Automatic
   - Nginx: Add to config

2. **Optimize Images**
   - Already using SVG icons
   - No raster images to optimize

3. **Caching**
   - Set cache headers in Nginx
   - Use CDN for static assets

### Backend

1. **Add Response Caching**
   - Cache common commands
   - 5-minute TTL

2. **Rate Limiting**
   - Prevent API abuse
   - Implement in n8n

3. **Database Optimization**
   - If adding persistence
   - Index frequently queried fields

---

## Security Checklist

- [ ] API keys stored in environment variables
- [ ] HTTPS enabled on all endpoints
- [ ] CORS properly configured
- [ ] Rate limiting implemented
- [ ] Input validation on backend
- [ ] No sensitive data in logs
- [ ] Regular security updates
- [ ] Backup credentials securely

---

## Deployment Checklist

### Before Deployment

- [ ] Code committed to git
- [ ] Environment variables configured
- [ ] API keys obtained
- [ ] n8n workflow tested
- [ ] Frontend builds without errors
- [ ] All tests passing

### During Deployment

- [ ] Frontend deployed successfully
- [ ] Environment variables set
- [ ] n8n workflow active
- [ ] Webhook URL verified
- [ ] SSL certificate installed

### After Deployment

- [ ] Test full application flow
- [ ] Verify all features work
- [ ] Check error logs
- [ ] Monitor performance
- [ ] Set up alerts
- [ ] Document deployment

---

## Cost Estimation

### Free Tier (Recommended for starting)

| Service | Cost | Limit |
|---------|------|-------|
| Vercel | Free | 100GB bandwidth/month |
| n8n Cloud | Free | 5,000 executions/month |
| Gemini API | Free | 60 requests/minute |
| **Total** | **$0** | - |

### Paid Tier (For production)

| Service | Cost | Benefit |
|---------|------|---------|
| Vercel Pro | $20/month | Unlimited bandwidth |
| n8n Cloud Starter | $20/month | 50,000 executions/month |
| Gemini Pro | $0.00025/request | Higher limits |
| **Total** | **~$40/month** | Production-ready |

---

## Support & Resources

- **n8n Docs**: https://docs.n8n.io
- **Gemini API Docs**: https://ai.google.dev/docs
- **Vercel Docs**: https://vercel.com/docs
- **Netlify Docs**: https://docs.netlify.com

---

## Next Steps

1. Choose deployment platform
2. Follow the steps for your platform
3. Test the application
4. Monitor performance
5. Iterate and improve

---

**Deployment complete! Your TerminAItor is now live.** 🚀
