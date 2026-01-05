# Lambda Deployment for Portfolio Backend

## Overview
This Lambda function handles the portfolio's API endpoints:
- `POST /api/chat` - AI chatbot powered by Gemini
- `POST /api/contact` - Contact form submissions
- `GET /api/health` - Health check

## Deployment Steps

### 1. Install Dependencies
```bash
cd backend/lambda
npm install
```

### 2. Create ZIP Package
```bash
# Windows (PowerShell)
Compress-Archive -Path index.js, package.json, node_modules -DestinationPath function.zip -Force

# Linux/Mac
zip -r function.zip index.js package.json node_modules/
```

### 3. Create Lambda Function (First Time)

Via AWS Console:
1. Go to Lambda → Create function
2. Function name: `portfolio-chatbot-api`
3. Runtime: Node.js 20.x
4. Architecture: arm64 (cost-effective)
5. Upload the function.zip

Or via AWS CLI:
```bash
aws lambda create-function \
  --function-name portfolio-chatbot-api \
  --runtime nodejs20.x \
  --architecture arm64 \
  --role arn:aws:iam::YOUR_ACCOUNT_ID:role/lambda-execution-role \
  --handler index.handler \
  --zip-file fileb://function.zip \
  --timeout 30 \
  --memory-size 256
```

### 4. Configure Environment Variables
```bash
aws lambda update-function-configuration \
  --function-name portfolio-chatbot-api \
  --environment "Variables={GEMINI_API_KEY=your_api_key_here}"
```

### 5. Update Function Code
```bash
aws lambda update-function-code \
  --function-name portfolio-chatbot-api \
  --zip-file fileb://function.zip
```

## API Gateway Setup

### Create HTTP API

1. Go to API Gateway → Create API → HTTP API
2. Add integration: Lambda → `portfolio-chatbot-api`
3. Configure routes:
   - `GET /api/health` → Lambda
   - `POST /api/chat` → Lambda
   - `POST /api/contact` → Lambda
   - `OPTIONS /{proxy+}` → Lambda (for CORS)

### Configure CORS in API Gateway
```
Access-Control-Allow-Origin: *
Access-Control-Allow-Headers: Content-Type
Access-Control-Allow-Methods: GET, POST, OPTIONS
```

### Custom Domain (Optional)
1. Go to API Gateway → Custom domain names
2. Create: `api.oussemaamri.com`
3. Configure: ACM certificate (from us-east-1)
4. Add API mapping: API → Stage → Path (empty)

## Environment Variables

| Variable | Description |
|----------|-------------|
| `GEMINI_API_KEY` | Google Gemini API key |

## Testing

### Test Locally
```bash
# In the lambda folder
node -e "
const lambda = require('./index');
lambda.handler({
  requestContext: { http: { method: 'GET', path: '/api/health' } }
}).then(console.log);
"
```

### Test via AWS CLI
```bash
aws lambda invoke \
  --function-name portfolio-chatbot-api \
  --payload '{"requestContext":{"http":{"method":"GET","path":"/api/health"}}}' \
  response.json

cat response.json
```

## Cost Optimization

- **Architecture:** arm64 (20% cheaper than x86)
- **Memory:** 256MB (sufficient for this use case)
- **Timeout:** 30s (allows for Gemini API response time)
- **Free Tier:** 1M requests/month FREE

## Logs

View logs in CloudWatch:
```
/aws/lambda/portfolio-chatbot-api
```

Or via CLI:
```bash
aws logs tail /aws/lambda/portfolio-chatbot-api --follow
```
