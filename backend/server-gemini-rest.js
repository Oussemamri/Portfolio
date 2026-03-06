const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Groq API key (set GROQ_API_KEY in your .env file or environment)
const GROQ_API_KEY = process.env.GROQ_API_KEY;

// System prompt for the chatbot
const SYSTEM_PROMPT = `You are an AI assistant for Oussema Amri's portfolio website. You help visitors learn about Oussema's background and skills.

About Oussema:
- Current Role: Full Stack Software Intern at Rocket Factory Augsburg (RFA), Munich, Germany
- Languages: Python, TypeScript, JavaScript, SQL
- Frameworks: React, FastAPI, Django, NestJS, Spring Boot, Node.js
- Cloud & DevOps: AWS, Docker, Jenkins, GitLab CI/CD
- Databases: PostgreSQL, MongoDB, Redis
- AI/ML: OpenAI/Gemini APIs, Hugging Face
- Education: ESPRIT School of Engineering (Tunisia) + exchange semester at Hochschule Schmalkalden (Germany)
- Based in: Munich, Germany

Be helpful, professional, and concise (max 2-3 sentences). Encourage visitors to check out different sections of the portfolio or contact Oussema for opportunities.`;

// Chat endpoint using Groq REST API
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    console.log('Received message:', message);

    // Call Groq API (OpenAI-compatible)
    const response = await axios.post('https://api.groq.com/openai/v1/chat/completions', {
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: message }
      ],
      temperature: 0.7,
      max_tokens: 200
    }, {
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    // Check if response has the expected structure
    if (!response.data || !response.data.choices || !response.data.choices[0]) {
      console.error('Unexpected API response structure:', JSON.stringify(response.data, null, 2));
      throw new Error('Invalid response from Groq API');
    }

    const reply = response.data.choices[0].message.content;
    
    console.log('AI response:', reply);

    res.json({ message: reply });
    
  } catch (error) {
    console.error('Error in chat endpoint:', error.response?.data || error.message);
    console.error('Full error:', error);
    
    res.status(500).json({ 
      error: 'Failed to get response',
      message: 'Sorry, I encountered an error. Please try again.',
      details: error.response?.data?.error?.message || error.message
    });
  }
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    console.log('Contact form submission:', { name, email, message });
    
    res.json({ 
      success: true,
      message: 'Thank you for your message! I will get back to you soon.' 
    });
    
  } catch (error) {
    console.error('Error in contact endpoint:', error);
    res.status(500).json({ 
      error: 'Failed to send message',
      message: 'Sorry, there was an error sending your message.'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`API endpoint: http://localhost:${PORT}/api/chat`);
  console.log('Using Groq (Llama 3.3 70B)');
});
