# 🚀 Free Hosting Guide for Portfolio + AI Chatbot

## 📋 Best Free Hosting Options

### Option 1: Vercel + Backend on Render (Recommended) ⭐

**Frontend (Vercel):** FREE, unlimited bandwidth, auto-deploy from GitHub
**Backend (Render):** FREE tier available, 750 hours/month

#### Pros:
✅ Completely FREE
✅ Easy deployment
✅ Auto-deploy from GitHub
✅ Custom domain support
✅ HTTPS included
✅ Fast CDN

---

### Option 2: Netlify + Railway

**Frontend (Netlify):** FREE, 100GB bandwidth/month
**Backend (Railway):** $5 credit/month FREE

---

### Option 3: GitHub Pages + Render

**Frontend (GitHub Pages):** FREE, unlimited
**Backend (Render):** FREE tier

---

## 🎯 Recommended Setup: Vercel + Render

Let me guide you through deploying to **Vercel (Frontend)** + **Render (Backend)**:

---

## 📦 Part 1: Deploy Frontend to Vercel

### Step 1: Prepare Your Code

1. **Make sure `.env.local` is in `.gitignore`** (already done)
2. **Commit all your changes to GitHub:**

```bash
git add .
git commit -m "Add AI chatbot feature"
git push origin main
```

### Step 2: Sign Up for Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up"
3. Sign up with your **GitHub account**

### Step 3: Deploy to Vercel

1. Click "Add New Project"
2. Select your `Portfolio` repository
3. Configure:
   - **Framework Preset:** Create React App
   - **Build Command:** `npm run build`
   - **Output Directory:** `build`
   - **Install Command:** `npm install`

4. **Add Environment Variable:**
   - Key: `REACT_APP_API_URL`
   - Value: `https://your-backend-url.onrender.com/api` (we'll get this in Part 2)

5. Click "Deploy"

✅ Your frontend will be live at `https://your-site.vercel.app`

---

## 🔧 Part 2: Deploy Backend to Render

### Step 1: Prepare Backend

Create a `render.yaml` file in the `backend` folder:

```yaml
services:
  - type: web
    name: portfolio-api
    env: node
    buildCommand: npm install
    startCommand: npm start
    envVars:
      - key: GEMINI_API_KEY
        sync: false
      - key: PORT
        value: 10000
```

### Step 2: Sign Up for Render

1. Go to [render.com](https://render.com)
2. Click "Get Started"
3. Sign up with your **GitHub account**

### Step 3: Deploy Backend

1. Click "New +" → "Web Service"
2. Connect your GitHub repository
3. Configure:
   - **Name:** portfolio-api
   - **Root Directory:** `backend`
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** FREE

4. **Add Environment Variables:**
   - Click "Environment" tab
   - Add: `GEMINI_API_KEY` = your API key
   - Add: `PORT` = 10000

5. Click "Create Web Service"

✅ Your backend will be live at `https://portfolio-api.onrender.com`

### Step 4: Update Frontend Environment Variable

1. Go back to Vercel dashboard
2. Go to your project → Settings → Environment Variables
3. Update `REACT_APP_API_URL` to: `https://your-backend-url.onrender.com/api`
4. Redeploy

---

## 🌐 Part 3: Add Custom Domain (Optional)

### On Vercel (Frontend):

1. Go to Settings → Domains
2. Add your domain: `oussemaamri.com`
3. Update DNS records as instructed

### On Render (Backend):

1. Go to Settings → Custom Domain
2. Add: `api.oussemaamri.com`
3. Update DNS records

---

## 💡 Alternative: All-in-One Solutions

### Option A: Railway (Easier but $5/month after free tier)

1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Deploy both frontend and backend
4. Get $5 credit FREE every month

### Option B: Netlify Functions (No separate backend needed!)

Convert your backend to Netlify Functions - serverless!

---

## ⚠️ Important Notes

### Free Tier Limitations:

**Render FREE:**
- Spins down after 15 min of inactivity
- First request after sleep takes ~30 seconds
- 750 hours/month (plenty for low traffic)

**Vercel FREE:**
- 100GB bandwidth/month
- Unlimited deployments
- Automatic HTTPS

### Solutions:

1. **Keep backend warm:** Use a service like [UptimeRobot](https://uptimerobot.com/) to ping your API every 5 minutes
2. **Show loading state:** Add a message in chatbot: "Waking up the server..."

---

## 📝 Deployment Checklist

### Before Deploying:

- [ ] All code committed to GitHub
- [ ] `.env` files in `.gitignore`
- [ ] Environment variables documented
- [ ] Build succeeds locally: `npm run build`
- [ ] Backend starts locally: `cd backend && npm start`

### Frontend (Vercel):

- [ ] Sign up for Vercel
- [ ] Connect GitHub repository
- [ ] Configure build settings
- [ ] Add `REACT_APP_API_URL` environment variable
- [ ] Deploy

### Backend (Render):

- [ ] Sign up for Render
- [ ] Connect GitHub repository
- [ ] Set root directory to `backend`
- [ ] Add `GEMINI_API_KEY` environment variable
- [ ] Deploy
- [ ] Copy the backend URL

### Final Steps:

- [ ] Update `REACT_APP_API_URL` in Vercel with Render backend URL
- [ ] Redeploy frontend
- [ ] Test the chatbot on live site
- [ ] (Optional) Add custom domain

---

## 🚀 Quick Deploy Commands

### Step 1: Commit and Push

```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

### Step 2: Deploy Frontend to Vercel

```bash
# Install Vercel CLI (optional)
npm i -g vercel

# Deploy
vercel
```

### Step 3: Deploy Backend to Render

Just connect your GitHub repo through the Render dashboard - no CLI needed!

---

## 🔗 Useful Links

- **Vercel:** https://vercel.com
- **Render:** https://render.com
- **Railway:** https://railway.app
- **Netlify:** https://netlify.com
- **UptimeRobot:** https://uptimerobot.com (keep backend awake)

---

## 🆘 Troubleshooting

### Chatbot not working after deployment?

1. Check backend is running: Visit `https://your-api.onrender.com/api/health`
2. Check environment variable: `REACT_APP_API_URL` in Vercel
3. Check CORS: Backend allows your frontend domain
4. Check API key: `GEMINI_API_KEY` in Render

### Backend sleeping?

Use UptimeRobot to ping your API every 5 minutes:
- URL: `https://your-api.onrender.com/api/health`
- Interval: 5 minutes

---

Ready to deploy? Follow the steps above! 🚀
