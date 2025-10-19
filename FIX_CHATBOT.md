# 🚨 Quick Fix Guide - Deploy Backend & Fix Chatbot

## Issue: Chatbot Not Working

**Error**: `your-backend-url.onrender.com` is not a real URL - it's a placeholder!

**Solution**: Deploy your backend to Render first, then update Vercel.

---

## 🔧 Step 1: Deploy Backend to Render (5 minutes)

### 1. Sign Up for Render

1. Go to: https://render.com
2. Click "Get Started"
3. Sign up with your **GitHub account**

### 2. Create Web Service

1. Click "New +" → "Web Service"
2. Click "Connect GitHub"
3. Find and select your `Portfolio` repository

### 3. Configure Service

Fill in these settings:

- **Name**: `portfolio-api` (or any name you like)
- **Root Directory**: `backend`
- **Environment**: `Node`
- **Region**: `Oregon (US West)` (or closest to you)
- **Branch**: `main`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Plan**: **Free** ✅

### 4. Add Environment Variable

**IMPORTANT:** Before clicking "Create Web Service":

1. Scroll down to "Environment Variables"
2. Click "Add Environment Variable"
3. Add:
   - **Key**: `GEMINI_API_KEY`
   - **Value**: `AIzaSyCgG4OxnlTqWWbQgs36sa0cmWnWzXCACCw`

### 5. Deploy!

1. Click "Create Web Service"
2. Wait 2-3 minutes for deployment
3. **Copy your backend URL** when it's ready
   - It will look like: `https://portfolio-api-xyz.onrender.com`
   - **SAVE THIS URL!**

### 6. Test Backend

Visit: `https://your-backend-url.onrender.com/api/health`

You should see: `{"status":"OK","timestamp":"..."}`

---

## 🔧 Step 2: Update Vercel with Real Backend URL

### 1. Go to Vercel Dashboard

Visit: https://vercel.com/dashboard

### 2. Open Your Project

Click on your portfolio project

### 3. Update Environment Variables

1. Go to **Settings** → **Environment Variables**
2. Find `REACT_APP_API_URL`
3. Click "Edit"
4. Update the value to: `https://your-actual-render-url.onrender.com/api`
   - Example: `https://portfolio-api-xyz.onrender.com/api`
   - **Important:** Add `/api` at the end!
5. Select "Production", "Preview", and "Development"
6. Click "Save"

### 4. Redeploy

1. Go to **Deployments** tab
2. Click the "..." on the latest deployment
3. Click "Redeploy"
4. Wait ~1-2 minutes

### 5. Test Chatbot!

1. Visit your Vercel URL
2. Click the robot icon 🤖
3. Send a message
4. You should get an AI response! ✨

---

## 🌐 Step 3: Change Vercel URL to Your Name

### Option A: Custom Vercel Subdomain (Free & Easy)

1. Go to Vercel Dashboard → Your Project
2. Click **Settings** → **Domains**
3. Click "Add"
4. Enter: `oussema-amri.vercel.app` (or similar)
5. Click "Add"
6. Your site will be available at the new URL!

**Available names:**
- `oussema-amri.vercel.app`
- `oussemaamri.vercel.app`
- `oussema-portfolio.vercel.app`

### Option B: Custom Domain (If you own one)

If you have `oussemaamri.com`:

1. Go to Vercel Dashboard → Settings → Domains
2. Add: `oussemaamri.com`
3. Follow DNS instructions from Vercel
4. Update your domain registrar (Namecheap, GoDaddy, etc.)
5. Wait 10-60 minutes for DNS propagation

---

## ✅ Final Checklist

After completing all steps:

- [ ] Backend deployed to Render
- [ ] Backend health check works: `/api/health`
- [ ] Vercel environment variable updated with real backend URL
- [ ] Vercel redeployed
- [ ] Chatbot works on live site
- [ ] Custom domain added (optional)

---

## 🐛 Troubleshooting

### Chatbot still not working?

**Check 1:** Backend URL is correct
- Go to Vercel → Settings → Environment Variables
- `REACT_APP_API_URL` should be: `https://your-render-url.onrender.com/api`
- Must end with `/api`

**Check 2:** Backend is running
- Visit: `https://your-render-url.onrender.com/api/health`
- Should show: `{"status":"OK"}`

**Check 3:** Redeploy frontend
- Vercel → Deployments → Redeploy

### Backend sleeping (30 second response)?

**Solution:** Set up UptimeRobot (free)
- Go to: https://uptimerobot.com
- Add monitor for your backend `/api/health`
- Ping every 5 minutes
- Backend will never sleep!

---

## 📞 Need Help?

Common issues:
1. **CORS Error** → Backend not deployed or URL wrong
2. **404 Error** → Missing `/api` at end of URL
3. **Network Error** → Backend sleeping (first request after 15min)

---

**Start with Step 1: Deploy your backend to Render!** 🚀
