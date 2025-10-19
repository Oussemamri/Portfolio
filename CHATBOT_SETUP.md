# 🤖 AI Chatbot Setup Guide

## What You Need

1. **Backend Server** - Node.js/Express API
2. **AI Service** - Choose one:
   - **Google Gemini** (FREE) ✅ Recommended
   - **OpenAI GPT** (Paid)
3. **API Key** - From your chosen AI service

---

## 📋 Setup Steps

### Step 1: Install Backend Dependencies

Open a new terminal and navigate to the backend folder:

```powershell
cd backend
npm install
```

This will install:
- `express` - Web server framework
- `cors` - Allow frontend to connect
- `dotenv` - Environment variables
- `@google/generative-ai` - Google Gemini SDK
- `openai` - OpenAI SDK (optional)
- `nodemon` - Auto-restart server (dev)

---

### Step 2: Get Your FREE API Key

#### Option A: Google Gemini (FREE - Recommended)

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click "Get API Key"
3. Sign in with your Google account
4. Click "Create API Key"
5. Copy the key (starts with `AIza...`)

#### Option B: OpenAI (Paid - $$$)

1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign up and add payment method
3. Go to [API Keys](https://platform.openai.com/api-keys)
4. Create new secret key
5. Copy the key (starts with `sk-...`)

---

### Step 3: Configure Environment

Create a `.env` file in the `backend` folder:

```powershell
cd backend
cp .env.example .env
```

Then edit the `.env` file and add your API key:

**For Gemini (FREE):**
```env
GEMINI_API_KEY=AIzaYourActualKeyHere
PORT=5000
```

**For OpenAI (Paid):**
```env
OPENAI_API_KEY=sk-YourActualKeyHere
PORT=5000
```

---

### Step 4: Start the Backend Server

**Using Gemini (default):**
```powershell
npm run dev
```

**Using OpenAI:**
```powershell
npm run dev:openai
```

You should see:
```
Server is running on http://localhost:5000
API endpoint: http://localhost:5000/api/chat
```

---

### Step 5: Test the Chatbot

1. Make sure the backend server is running (Step 4)
2. Make sure the frontend is running (`npm start` in main folder)
3. Open `http://localhost:3000` in your browser
4. Click the robot icon 🤖 in the bottom-right
5. Type a message like "Hello" or "What are your skills?"
6. You should get an AI-powered response! 🎉

---

## 🔧 Troubleshooting

### Error: "ERR_CONNECTION_REFUSED"
- ✅ Make sure backend server is running on port 5000
- ✅ Check that `.env.local` has `REACT_APP_API_URL=http://localhost:5000/api`

### Error: "API Key not valid"
- ✅ Check your API key is correct in `.env`
- ✅ Make sure there are no extra spaces
- ✅ For Gemini, key should start with `AIza`
- ✅ For OpenAI, key should start with `sk-`

### Backend server won't start
- ✅ Run `npm install` in backend folder
- ✅ Make sure Node.js is installed: `node --version`
- ✅ Check port 5000 isn't already in use

---

## 🚀 Production Deployment

For production on your EC2 server:

1. **Update frontend `.env.local`:**
   ```env
   REACT_APP_API_URL=https://oussemaamri.com/api
   ```

2. **Deploy backend to EC2:**
   - Copy backend folder to EC2
   - Install dependencies: `npm install`
   - Set environment variables
   - Use PM2 to keep server running:
     ```bash
     npm install -g pm2
     pm2 start server-gemini.js --name portfolio-api
     pm2 save
     pm2 startup
     ```

3. **Configure Nginx** to proxy `/api` requests to backend

---

## 📊 Cost Comparison

| Service | Free Tier | Pricing |
|---------|-----------|---------|
| **Google Gemini** | ✅ 60 requests/min | FREE |
| **OpenAI GPT-3.5** | ❌ No free tier | ~$0.002/request |
| **OpenAI GPT-4** | ❌ No free tier | ~$0.03/request |

**Recommendation:** Start with Google Gemini (free) for development and testing!

---

## 🎯 Next Steps

1. **Customize the AI responses** - Edit the `SYSTEM_PROMPT` in server file
2. **Add conversation history** - Store previous messages
3. **Add rate limiting** - Prevent abuse
4. **Improve error handling** - Better user experience
5. **Add analytics** - Track chatbot usage

---

## 🆘 Need Help?

If you run into any issues:
1. Check the backend console for error messages
2. Check browser console (F12) for frontend errors
3. Verify API key is correct
4. Make sure both servers are running

---

Ready to test? Follow the steps above! 🚀
