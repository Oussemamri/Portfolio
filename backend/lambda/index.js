const https = require('https');

// System prompt for the chatbot
const SYSTEM_PROMPT = `You are an AI assistant for Oussema Amri's portfolio website. You help visitors learn about Oussema's:

Skills: JavaScript, React, Node.js, MongoDB, Express, Docker, AWS, DevOps, Full-Stack Development
Experience: Full-stack developer with expertise in building scalable web applications
Projects: Portfolio websites, e-commerce platforms, AI-powered applications
Education: Computer Science background
Interests: Web development, cloud infrastructure, automation, AI/ML

Be helpful, professional, and concise (max 2-3 sentences). Encourage visitors to check out different sections of the portfolio or contact Oussema for opportunities.`;

// CORS headers for all responses
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Content-Type': 'application/json'
};

// Main Lambda handler
exports.handler = async (event) => {
  console.log('Event:', JSON.stringify(event, null, 2));

  // Handle CORS preflight
  if (event.requestContext?.http?.method === 'OPTIONS' || event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: ''
    };
  }

  // Get HTTP method and path
  const method = event.requestContext?.http?.method || event.httpMethod;
  const path = event.requestContext?.http?.path || event.path;

  try {
    // Route handling
    if (path === '/api/health' && method === 'GET') {
      return handleHealth();
    }
    
    if (path === '/api/chat' && method === 'POST') {
      return await handleChat(event);
    }
    
    if (path === '/api/contact' && method === 'POST') {
      return handleContact(event);
    }

    // 404 for unknown routes
    return {
      statusCode: 404,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Not Found' })
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ 
        error: 'Internal Server Error',
        message: error.message 
      })
    };
  }
};

// Health check handler
function handleHealth() {
  return {
    statusCode: 200,
    headers: corsHeaders,
    body: JSON.stringify({ 
      status: 'OK', 
      timestamp: new Date().toISOString(),
      service: 'portfolio-api-lambda'
    })
  };
}

// Helper function to make HTTPS requests (no external dependencies)
function httpsRequest(url, options, postData) {
  return new Promise((resolve, reject) => {
    const req = https.request(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({ statusCode: res.statusCode, data: JSON.parse(data) });
        } catch (e) {
          resolve({ statusCode: res.statusCode, data: data });
        }
      });
    });
    req.on('error', reject);
    req.setTimeout(25000, () => reject(new Error('Request timeout')));
    if (postData) req.write(postData);
    req.end();
  });
}

// Chat handler - Gemini API integration
async function handleChat(event) {
  const body = JSON.parse(event.body || '{}');
  const { message } = body;

  if (!message) {
    return {
      statusCode: 400,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Message is required' })
    };
  }

  console.log('Received message:', message);

  // Create the full prompt
  const fullPrompt = `${SYSTEM_PROMPT}\n\nUser: ${message}\nAssistant:`;

  const apiKey = process.env.GEMINI_API_KEY;
  const apiUrl = `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

  const postData = JSON.stringify({
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

  try {
    const response = await httpsRequest(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    }, postData);

    if (response.statusCode !== 200) {
      throw new Error(`Gemini API error: ${JSON.stringify(response.data)}`);
    }

    if (!response.data?.candidates?.[0]?.content?.parts?.[0]?.text) {
      throw new Error('Invalid response from Gemini API');
    }

    const reply = response.data.candidates[0].content.parts[0].text;
    console.log('AI response:', reply);

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ message: reply })
    };

  } catch (error) {
    console.error('Gemini API error:', error.message);
    
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ 
        error: 'Failed to get response',
        message: 'Sorry, I encountered an error. Please try again.',
        details: error.message
      })
    };
  }
}

// Contact form handler
function handleContact(event) {
  const body = JSON.parse(event.body || '{}');
  const { name, email, message } = body;

  console.log('Contact form submission:', { name, email, message });

  return {
    statusCode: 200,
    headers: corsHeaders,
    body: JSON.stringify({ 
      success: true,
      message: 'Thank you for your message! I will get back to you soon.' 
    })
  };
}
