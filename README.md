# Oussema Amri Portfolio

Production portfolio website with an AI assistant and contact form.

- Live site: `https://oussemaamri.com`
- API health: `https://api.oussemaamri.com/api/health`

## Overview

This repository contains:

- A React frontend deployed to S3 and served through CloudFront
- A serverless backend deployed as an AWS Lambda function behind API Gateway
- A GitHub Actions workflow that deploys frontend and backend

## Architecture

```text
oussemaamri.com (CloudFront)
  -> S3 bucket: frontend.portfolio

api.oussemaamri.com (API Gateway HTTP API)
  -> Lambda: portfolio-chatbot-api
```

## Features

- Responsive one-page portfolio (Hero, About, Experience, Projects, Skills, Languages, Contact)
- AI chatbot widget connected to backend API
- Contact form integration via EmailJS
- Smooth-scroll sections and animated reveals
- Automated AWS deployment through GitHub Actions

## Tech Stack

| Layer | Technologies |
|------|------|
| Frontend | React 18, React Router v6, CSS, Axios |
| Backend | AWS Lambda (Node.js 20), API Gateway |
| AI | Groq-compatible chat completion API |
| Infra | S3, CloudFront, Route 53, ACM |
| CI/CD | GitHub Actions |

## Prerequisites

- Node.js 18+
- npm 9+
- AWS account with IAM user for CI/CD deploy

## Local Development

1. Install dependencies:

```bash
npm ci
```

2. Create `.env.local` from `.env.example` and fill values:

```env
REACT_APP_API_URL=https://api.oussemaamri.com/api
REACT_APP_EMAILJS_SERVICE_ID=your_service_id
REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id
REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key
REACT_APP_CONTACT_EMAIL=your-email@example.com
```

3. Start development server:

```bash
npm start
```

4. Run checks and build:

```bash
npm test -- --watchAll=false --passWithNoTests
npm run lint
npm run build
```

## Deployment (GitHub Actions)

Workflow file: `.github/workflows/deploy-aws.yml`

### Trigger

- Push to `main`
- Manual run via `workflow_dispatch`

### Required GitHub Secrets

AWS:

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `CLOUDFRONT_DISTRIBUTION_ID`

Frontend build env:

- `REACT_APP_EMAILJS_SERVICE_ID`
- `REACT_APP_EMAILJS_TEMPLATE_ID`
- `REACT_APP_EMAILJS_PUBLIC_KEY`
- `REACT_APP_CONTACT_EMAIL`

### Current AWS Resource IDs

- AWS account: `811890957426`
- Region: `eu-north-1`
- S3 bucket: `frontend.portfolio`
- CloudFront distribution: `EZNF7L67YTAII`
- Lambda function: `portfolio-chatbot-api`
- API Gateway API ID: `rlry97d9d6`

## IAM Policy Requirements (Deploy User)

The IAM user used by GitHub Actions must allow at least:

- S3: `ListBucket`, `GetBucketLocation`, `GetObject`, `PutObject`, `DeleteObject`
- CloudFront: `CreateInvalidation`
- Lambda: `GetFunction`, `UpdateFunctionCode`, `UpdateFunctionConfiguration`

Use this exact Lambda ARN format in policy resources (note `function:` with colon):

`arn:aws:lambda:eu-north-1:811890957426:function:portfolio-chatbot-api`

## Troubleshooting

`AccessDenied` for CloudFront invalidation:

- Ensure `CLOUDFRONT_DISTRIBUTION_ID` secret is set
- Ensure IAM policy allows `cloudfront:CreateInvalidation`

`AccessDeniedException` for Lambda update:

- Ensure IAM policy allows `lambda:UpdateFunctionCode`
- Ensure policy resource uses correct Lambda ARN format with colon
- Confirm the newest policy version is set as default

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

## Security

- Keep all API keys in environment variables and GitHub Secrets
- Never commit `.env.*`, build artifacts, or deployment zip files
- Rotate leaked credentials immediately and scrub git history when needed

## License

MIT
