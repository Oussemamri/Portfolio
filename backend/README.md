# Portfolio Backend

Serverless backend deployed as an AWS Lambda function behind API Gateway.

## Architecture

```
Client -> API Gateway (api.oussemaamri.com) -> Lambda (Node.js 20, arm64)
                                                  |-> Groq Chat API
```

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/health` | Health check |
| POST | `/api/chat` | AI chatbot (Groq Llama) |
| POST | `/api/contact` | Contact form submission |

## Lambda Function

All code lives in `lambda/index.js` — zero external runtime dependencies (uses Node.js built-in `https` module).

### Environment Variables

| Variable | Description |
|----------|-------------|
| `GROQ_API_KEY` | Groq API key for chat completions |

### Deploy

```bash
cd lambda
npm ci --omit=dev
zip -r function.zip index.js package.json node_modules
aws lambda update-function-code \
  --function-name portfolio-chatbot-api \
  --zip-file fileb://function.zip
```

Or push to `main` — GitHub Actions handles deployment automatically via `.github/workflows/deploy-aws.yml`.

## Local Testing

```bash
node -e "
const lambda = require('./lambda/index');
lambda.handler({
  requestContext: { http: { method: 'GET', path: '/api/health' } }
}).then(r => console.log(JSON.parse(r.body)));
"
```

## Logs

CloudWatch log group: `/aws/lambda/portfolio-chatbot-api`
4. **Cohere**

Let me know if you need help setting up any of these alternatives!
