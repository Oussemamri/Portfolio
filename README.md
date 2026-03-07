# Oussema Amri Portfolio

Production portfolio website with an AI assistant and contact form.

- Live site: `https://oussemaamri.com`
- API health: `https://api.oussemaamri.com/api/health`

## Features

- Responsive one-page portfolio (Hero, About, Experience, Projects, Skills, Languages, Contact)
- AI chatbot widget connected to backend API
- Contact form integration via EmailJS
- Smooth-scroll sections and animated reveals
- Cloud deployment on AWS (S3 + CloudFront + Lambda + API Gateway + Route 53)

## Tech Stack

| Layer | Technologies |
|------|------|
| Frontend | React 17, React Router, CSS, Axios |
| Backend | AWS Lambda (Node.js 20), API Gateway |
| AI | Groq-compatible chat completion API |
| Infra | S3, CloudFront, Route 53, ACM |
| CI/CD | GitHub Actions |

## Local Development

### 1. Prerequisites

- Node.js 18+
- npm 9+

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment

Copy `.env.example` to `.env.local` and fill values:

```env
REACT_APP_API_URL=https://api.oussemaamri.com/api
REACT_APP_EMAILJS_SERVICE_ID=your_service_id
REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id
REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key
REACT_APP_CONTACT_EMAIL=your-email@example.com
```

### 4. Start development server

```bash
npm start
```

### 5. Create production build

```bash
npm run build
```

## Deployment

- Frontend is deployed to S3 and invalidated through CloudFront.
- Backend is deployed as an AWS Lambda function.
- CI/CD workflow: `.github/workflows/deploy-aws.yml`
- Infrastructure reference: `AWS_INFRASTRUCTURE_SETUP.md`

## Project Structure

```text
src/
  components/
  hooks/
  pages/
  services/
  utils/
backend/
  lambda/
.github/workflows/
```

## Security Notes

- Keep all API keys in environment variables.
- Never commit `.env.*`, build artifacts, or deployment zip files.

## License

MIT
