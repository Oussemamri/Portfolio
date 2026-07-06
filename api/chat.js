const https = require('https');

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

const ALLOWED_ORIGINS = [
  'https://oussemaamri.com',
  'https://www.oussemaamri.com',
  'http://localhost:3000'
];

module.exports = async (req, res) => {
  // CORS: only allow the portfolio's own origins
  const origin = ALLOWED_ORIGINS.includes(req.headers.origin)
    ? req.headers.origin
    : ALLOWED_ORIGINS[0];
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS preflight request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(455).json({ error: 'Method Not Allowed' });
    return;
  }

  const { message } = req.body || {};

  if (!message || typeof message !== 'string') {
    res.status(400).json({ error: 'Message is required' });
    return;
  }

  if (message.length > 500) {
    res.status(400).json({ error: 'Message is too long (max 500 characters)' });
    return;
  }

  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    console.error('Missing GROQ_API_KEY environment variable');
    res.status(500).json({
      message: 'Service is temporarily unavailable. Please try again later.'
    });
    return;
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

    if (response.statusCode === 429) {
      res.status(200).json({
        message: "I'm currently experiencing high demand. Please try again in a few moments, or feel free to contact Oussema directly via the contact form below!"
      });
      return;
    }

    if (response.statusCode !== 200) {
      console.error('Groq API error:', response.statusCode, response.data);
      res.status(200).json({
        message: "I'm having a bit of trouble right now. You can reach Oussema directly through the contact form, or try asking me again in a moment!"
      });
      return;
    }

    const reply = response.data.choices?.[0]?.message?.content;
    if (!reply) {
      res.status(200).json({
        message: "I couldn't generate a response. Please try rephrasing your question, or contact Oussema directly!"
      });
      return;
    }

    res.status(200).json({ message: reply });

  } catch (error) {
    console.error('Groq API integration error:', error.message);
    res.status(200).json({
      message: "I'm temporarily unavailable. Please try again later, or use the contact form to reach Oussema directly!"
    });
  }
};
