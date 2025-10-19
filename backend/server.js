const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const OpenAI = require('openai');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// System prompt for the chatbot
const SYSTEM_PROMPT = `You are an AI assistant for Oussema Amri's portfolio website. You help visitors learn about Oussema's:

- Skills: JavaScript, React, Node.js, MongoDB, Express, Docker, AWS, DevOps, Full-Stack Development
- Experience: Full-stack developer with expertise in building scalable web applications
- Projects: Portfolio websites, e-commerce platforms, AI-powered applications
- Education: Computer Science background
- Interests: Web development, cloud infrastructure, automation, AI/ML

Be helpful, professional, and concise. Encourage visitors to check out different sections of the portfolio or contact Oussema for opportunities.`;

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    console.log('Received message:', message);

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: message }
      ],
      temperature: 0.7,
      max_tokens: 200
    });

    const reply = completion.choices[0].message.content;
    
    console.log('AI response:', reply);

    res.json({ message: reply });
    
  } catch (error) {
    console.error('Error in chat endpoint:', error);
    res.status(500).json({ 
      error: 'Failed to get response',
      message: 'Sorry, I encountered an error. Please try again.'
    });
  }
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    console.log('Contact form submission:', { name, email, message });
    
    // Here you would typically:
    // 1. Validate the data
    // 2. Send an email notification
    // 3. Save to database
    
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
});
