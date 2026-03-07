const https = require('https');
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
        error: 'Internal Server Error'
      })
    };
  }
};

function safeParseBody(rawBody) {
  try {
    return JSON.parse(rawBody || '{}');
  } catch (error) {
    return null;
  }
}

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

// Chat handler - Groq API integration
async function handleChat(event) {
  const body = safeParseBody(event.body);

  if (!body) {
    return {
      statusCode: 400,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Invalid JSON body' })
    };
  }

  const { message } = body;

  if (!message) {
    return {
      statusCode: 400,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Message is required' })
    };
  }

  console.log('Received message:', message);

  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    console.error('Missing GROQ_API_KEY environment variable');
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({
        message: 'Service is temporarily unavailable. Please try again later.'
      })
    };
  }

  const postData = JSON.stringify({
    model: 'llama-3.3-70b-versatile',
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: message }
    ],
    temperature: 0.7,
    max_tokens: 200
  });

  try {
    const response = await httpsRequest('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    }, postData);

    // Handle rate limit errors (429)
    if (response.statusCode === 429) {
      console.error('Rate limit exceeded:', response.data);
      return {
        statusCode: 200,
        headers: corsHeaders,
        body: JSON.stringify({
          message: "I'm currently experiencing high demand. Please try again in a few moments, or feel free to contact Oussema directly via the contact form below!"
        })
      };
    }

    // Handle other API errors
    if (response.statusCode !== 200) {
      console.error('Groq API error:', response.statusCode, response.data);
      return {
        statusCode: 200,
        headers: corsHeaders,
        body: JSON.stringify({
          message: "I'm having a bit of trouble right now. You can reach Oussema directly through the contact form, or try asking me again in a moment!"
        })
      };
    }

    if (!response.data?.choices?.[0]?.message?.content) {
      console.error('Invalid response structure:', response.data);
      return {
        statusCode: 200,
        headers: corsHeaders,
        body: JSON.stringify({
          message: "I couldn't generate a response. Please try rephrasing your question, or contact Oussema directly!"
        })
      };
    }

    const reply = response.data.choices[0].message.content;
    console.log('AI response:', reply);

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ message: reply })
    };

  } catch (error) {
    console.error('Groq API error:', error.message);

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({
        message: "I'm temporarily unavailable. Please try again later, or use the contact form to reach Oussema directly!"
      })
    };
  }
}

// Contact form handler
function handleContact(event) {
  const body = safeParseBody(event.body);

  if (!body) {
    return {
      statusCode: 400,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Invalid JSON body' })
    };
  }

  const { name, email, message } = body;

  if (!name || !email || !message) {
    return {
      statusCode: 400,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Name, email, and message are required' })
    };
  }

  if (!EMAIL_PATTERN.test(String(email).trim())) {
    return {
      statusCode: 400,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'A valid email address is required' })
    };
  }

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
