# Portfolio Backend API

Backend server for Oussema's portfolio website with AI-powered chatbot.

## Features

- AI Chatbot powered by OpenAI GPT-3.5
- Contact form API
- CORS enabled for frontend communication
- Environment-based configuration

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the backend directory:

```bash
cp .env.example .env
```

Then edit `.env` and add your OpenAI API key:

```
OPENAI_API_KEY=sk-your-actual-api-key-here
PORT=5000
```

### 3. Get OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in
3. Navigate to [API Keys](https://platform.openai.com/api-keys)
4. Click "Create new secret key"
5. Copy the key and paste it in your `.env` file

**Note:** OpenAI API is a paid service. You'll need to add credits to your account.

### 4. Run the Server

Development mode (with auto-restart):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### POST /api/chat
Chat with the AI assistant

**Request:**
```json
{
  "message": "What are your skills?"
}
```

**Response:**
```json
{
  "message": "I specialize in JavaScript, React, Node.js..."
}
```

### POST /api/contact
Submit contact form

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "I'd like to discuss a project"
}
```

### GET /api/health
Check server status

## Alternative: Use Other AI Services

If you don't want to use OpenAI, you can integrate:

1. **Google Gemini** (Free tier available)
2. **Anthropic Claude**
3. **Hugging Face models**
4. **Cohere**

Let me know if you need help setting up any of these alternatives!
