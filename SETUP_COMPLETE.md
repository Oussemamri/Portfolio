# ✅ Chatbot Setup Complete - What's Next

## 🎉 What We've Built

✅ **Backend API Server** (`backend/server-gemini.js`)
- Express.js server on port 5000
- Google Gemini AI integration (FREE)
- OpenAI GPT integration (alternative, paid)
- CORS enabled for frontend
- Health check endpoint

✅ **Frontend Integration** (Already connected!)
- ChatWidget component updated
- Environment variables configured
- Ready to connect to backend

✅ **Dependencies Installed**
- Backend: All npm packages ready
- Frontend: Already set up

---

## 🚀 Quick Start - 3 Steps

### 1️⃣ Get FREE API Key (2 minutes)

Visit: **https://makersuite.google.com/app/apikey**
- Click "Get API Key"
- Sign in with Google
- Click "Create API Key"
- Copy the key

### 2️⃣ Create `.env` File

In the `backend` folder, create a file named `.env`:

```env
GEMINI_API_KEY=paste_your_key_here
PORT=5000
```

### 3️⃣ Start Both Servers

**Terminal 1 - Backend:**
```powershell
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```powershell
npm start
```

---

## 🧪 Test Your Chatbot

1. Open `http://localhost:3000`
2. Click the 🤖 robot icon (bottom-right)
3. Type: "Hello, what are your skills?"
4. Get AI-powered response! ✨

---

## 📁 Project Structure

```
portfolio-website/
├── backend/
│   ├── server-gemini.js      ← Gemini AI (FREE)
│   ├── server.js              ← OpenAI GPT (Paid)
│   ├── package.json
│   ├── .env                   ← CREATE THIS!
│   ├── .env.example
│   └── README.md
├── src/
│   └── components/
│       └── ChatWidget/
│           └── ChatWidget.js  ← Updated!
├── .env.local                 ← Already configured
└── CHATBOT_SETUP.md          ← Full guide
```

---

## 🔑 API Keys - Where to Get

### Google Gemini (Recommended - FREE)
- URL: https://makersuite.google.com/app/apikey
- Cost: FREE
- Limits: 60 requests/minute
- Format: `AIzaSy...`

### OpenAI (Alternative - Paid)
- URL: https://platform.openai.com/api-keys
- Cost: ~$0.002 per request (GPT-3.5)
- Format: `sk-...`

---

## ⚙️ Configuration Files

### Frontend `.env.local` (Already set!)
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### Backend `.env` (YOU NEED TO CREATE THIS!)
```env
GEMINI_API_KEY=your_actual_key_here
PORT=5000
```

---

## 🐛 Common Issues & Solutions

### Issue: "Network Error" in chatbot
**Solution:** Backend server not running
```powershell
cd backend
npm run dev
```

### Issue: "API key not valid"
**Solution:** Check your `.env` file
- Make sure key is correct
- No extra spaces
- File is named `.env` (not `.env.txt`)

### Issue: Port 5000 already in use
**Solution:** Change port in backend `.env`:
```env
PORT=5001
```
And update frontend `.env.local`:
```env
REACT_APP_API_URL=http://localhost:5001/api
```

---

## 🎨 Customize Your Chatbot

Edit `SYSTEM_PROMPT` in `backend/server-gemini.js`:

```javascript
const SYSTEM_PROMPT = `You are an AI assistant for Oussema Amri...

Add your custom information here:
- Your specific skills
- Your projects
- Your experience
- Your personality

Keep responses short and helpful!`;
```

---

## 📊 What Each File Does

| File | Purpose |
|------|---------|
| `backend/server-gemini.js` | Main server with Gemini AI |
| `backend/server.js` | Alternative with OpenAI |
| `backend/.env` | Your secret API keys |
| `src/components/ChatWidget/ChatWidget.js` | Chat interface |
| `.env.local` | Frontend API URL |

---

## 🌐 Production Deployment

When ready to deploy to `oussemaamri.com`:

1. **Update frontend `.env.local`:**
   ```env
   REACT_APP_API_URL=https://oussemaamri.com/api
   ```

2. **Deploy backend to EC2:**
   ```bash
   # On EC2
   cd ~/portfolio-backend
   npm install
   # Create .env with production API key
   pm2 start server-gemini.js --name portfolio-api
   ```

3. **Configure Nginx** to proxy `/api` to port 5000

---

## ✨ Your Chatbot Features

✅ Real-time AI responses
✅ Typing indicator
✅ Error handling
✅ Mobile responsive
✅ Clean UI with animations
✅ Conversation context
✅ Professional greeting

---

## 🎯 Next Task

**Create your `.env` file in the backend folder:**

1. Open `backend` folder
2. Create new file named `.env`
3. Add:
   ```env
   GEMINI_API_KEY=get_from_google_ai_studio
   PORT=5000
   ```
4. Save the file
5. Run `npm run dev` in backend folder
6. Test the chatbot!

---

## 📞 Need Help?

Check these in order:
1. ✅ Backend running? (`npm run dev` in backend/)
2. ✅ Frontend running? (`npm start` in root/)
3. ✅ `.env` file created with API key?
4. ✅ Browser console for errors (F12)
5. ✅ Backend console for errors

---

**You're all set! Just need to add your API key and start the servers! 🚀**
