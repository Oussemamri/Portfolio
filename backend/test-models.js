const axios = require('axios');
require('dotenv').config();

const API_KEY = process.env.GEMINI_API_KEY;

async function listModels() {
  try {
    console.log('Checking available models...');
    
    // Try v1 API
    const urlV1 = `https://generativelanguage.googleapis.com/v1/models?key=${API_KEY}`;
    console.log('\n--- V1 API Models ---');
    const responseV1 = await axios.get(urlV1);
    
    if (responseV1.data.models) {
      responseV1.data.models.forEach(model => {
        if (model.supportedGenerationMethods?.includes('generateContent')) {
          console.log(`✓ ${model.name} - ${model.displayName}`);
        }
      });
    }
  } catch (error) {
    console.error('Error listing models:', error.response?.data || error.message);
  }
}

listModels();
