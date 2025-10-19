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

// System prompt for the chatbot
const SYSTEM_PROMPT = `You are an AI assistant for Oussema Amri's portfolio website. You help visitors learn about Oussema's:

Skills: JavaScript, React, Node.js, MongoDB, Express, Docker, AWS, DevOps, Full-Stack Development
Experience: Full-stack developer with expertise in building scalable web applications
Projects: Portfolio websites, e-commerce platforms, AI-powered applications
Education: Computer Science background
Interests: Web development, cloud infrastructure, automation, AI/ML

Be helpful, professional, and concise (max 2-3 sentences). Encourage visitors to check out different sections of the portfolio or contact Oussema for opportunities.`;

// Chat endpoint using direct Gemini REST API
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    console.log('Received message:', message);

    // Create the full prompt
    const fullPrompt = `${SYSTEM_PROMPT}\n\nUser: ${message}\nAssistant:`;

    // Call Gemini API directly via REST - using v1 API with gemini-2.5-flash
    const apiUrl = `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;
    
    const response = await axios.post(apiUrl, {
      contents: [{
        parts: [{
          text: fullPrompt
        }]
      }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 200,
      }
    });

    const reply = response.data.candidates[0].content.parts[0].text;
    
    console.log('AI response:', reply);

    res.json({ message: reply });
    
  } catch (error) {
    console.error('Error in chat endpoint:', error.response?.data || error.message);
    
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
  console.log('Using Gemini 2.5 Flash via REST API');
});
