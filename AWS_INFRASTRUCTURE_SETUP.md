# 🏗️ AWS Infrastructure Setup - Complete Reference

> **Created:** January 5, 2026  
> **Domain:** oussemaamri.com  
> **Purpose:** Portfolio website with AI chatbot

---

## 📊 Architecture Overview

```
                         oussemaamri.com
                               │
                    ┌──────────┴──────────┐
                    │                     │
                    ▼                     ▼
            ┌──────────────┐      ┌──────────────┐
            │  CloudFront  │      │ API Gateway  │
            │    (CDN)     │      │  (HTTP API)  │
            │              │      │              │
            │ d10juaqsqj5  │      │ rlry97d9d6   │
            │ qvz.cloud    │      │ .execute-api │
            │ front.net    │      │ .eu-north-1  │
            └──────┬───────┘      └──────┬───────┘
                   │                     │
                   ▼                     ▼
            ┌──────────────┐      ┌──────────────┐
            │  S3 Bucket   │      │    Lambda    │
            │              │      │              │
            │  frontend.   │      │ portfolio-   │
            │  portfolio   │      │ chatbot-api  │
            └──────────────┘      └──────────────┘
```

---

## 🔑 AWS Resources Summary

### Account Information
| Item | Value |
|------|-------|
| **AWS Account ID** | `811890957426` |
| **Primary Region** | `eu-north-1` (Stockholm) |
| **Domain** | `oussemaamri.com` (Namecheap) |

---

## 📦 S3 Bucket (Frontend Hosting)

| Setting | Value |
|---------|-------|
| **Bucket Name** | `frontend.portfolio` |
| **Region** | `eu-north-1` |
| **Public Access** | Blocked (accessed via CloudFront) |
| **Static Hosting** | Via CloudFront |

### Bucket Policy
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "AllowCloudFrontServicePrincipal",
            "Effect": "Allow",
            "Principal": {
                "Service": "cloudfront.amazonaws.com"
            },
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::frontend.portfolio/*",
            "Condition": {
                "StringEquals": {
                    "AWS:SourceArn": "arn:aws:cloudfront::811890957426:distribution/EZNF7L67YTAII"
                }
            }
        }
    ]
}
```

---

## 🌐 CloudFront Distribution (CDN)

| Setting | Value |
|---------|-------|
| **Distribution ID** | `EZNF7L67YTAII` |
| **Distribution Domain** | `d10juaqsqj5qvz.cloudfront.net` |
| **Alternate Domains** | `oussemaamri.com`, `www.oussemaamri.com` |
| **Origin** | S3: `frontend.portfolio` |
| **SSL Certificate** | ACM (us-east-1) |
| **Default Root Object** | `index.html` |
| **Price Class** | All edge locations |

### Error Pages Configuration
| HTTP Error | Response Page | Response Code |
|------------|---------------|---------------|
| 403 | /index.html | 200 |
| 404 | /index.html | 200 |

---

## 🔐 SSL Certificates (ACM)

### Certificate 1: CloudFront (us-east-1)
| Setting | Value |
|---------|-------|
| **Domain** | `oussemaamri.com`, `*.oussemaamri.com` |
| **Region** | `us-east-1` (Required for CloudFront) |
| **Status** | Issued |
| **Used By** | CloudFront distribution |

### Certificate 2: API Gateway (eu-north-1)
| Setting | Value |
|---------|-------|
| **Domain** | `api.oussemaamri.com` |
| **Region** | `eu-north-1` (Same as API Gateway) |
| **Certificate ID** | `0034a088-1a7e-4e9e-9134-1c5523e6dd45` |
| **Status** | Issued |
| **Used By** | API Gateway custom domain |

---

## ⚡ Lambda Function (Backend API)

| Setting | Value |
|---------|-------|
| **Function Name** | `portfolio-chatbot-api` |
| **Runtime** | Node.js 20.x |
| **Architecture** | arm64 |
| **Memory** | 256 MB |
| **Timeout** | 30 seconds |
| **Region** | `eu-north-1` |

### Environment Variables
| Key | Value |
|-----|-------|
| `GROQ_API_KEY` | (Your Groq API key) |

### Endpoints Handled
| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/health` | Health check |
| POST | `/api/chat` | AI chatbot (Gemini) |
| POST | `/api/contact` | Contact form |

### Lambda Code Location
- Local: `backend/lambda/index.js`
- Uses built-in Node.js `https` module (no npm dependencies)

---

## 🔗 API Gateway (HTTP API)

| Setting | Value |
|---------|-------|
| **API Name** | `portfolio-api` |
| **API ID** | `rlry97d9d6` |
| **Protocol** | HTTP |
| **Region** | `eu-north-1` |
| **Default Endpoint** | `https://rlry97d9d6.execute-api.eu-north-1.amazonaws.com` |
| **Stage** | `$default` (auto-deploy enabled) |

### Custom Domain
| Setting | Value |
|---------|-------|
| **Domain Name** | `api.oussemaamri.com` |
| **API Mapping** | `portfolio-api` → `$default` stage |

### Routes
| Method | Path | Integration |
|--------|------|-------------|
| GET | `/api/health` | Lambda: portfolio-chatbot-api |
| POST | `/api/chat` | Lambda: portfolio-chatbot-api |
| POST | `/api/contact` | Lambda: portfolio-chatbot-api |
| OPTIONS | `/{proxy+}` | Lambda: portfolio-chatbot-api |

---

## 🌍 Route 53 DNS

### Hosted Zone
| Setting | Value |
|---------|-------|
| **Domain** | `oussemaamri.com` |
| **Type** | Public hosted zone |

### Nameservers (Set in Namecheap)
```
ns-1087.awsdns-07.org
ns-655.awsdns-17.net
ns-461.awsdns-57.com
ns-1648.awsdns-14.co.uk
```

### DNS Records
| Name | Type | Alias | Target |
|------|------|-------|--------|
| `oussemaamri.com` | A | Yes | CloudFront: d10juaqsqj5qvz.cloudfront.net |
| `www.oussemaamri.com` | A | Yes | CloudFront: d10juaqsqj5qvz.cloudfront.net |
| `api.oussemaamri.com` | A | Yes | API Gateway (eu-north-1) |
| (ACM validation records) | CNAME | No | (Auto-generated) |

---

## 🔄 Deployment Process

### Frontend Deployment (Manual)
1. Build the React app:
   ```cmd
   npm run build
   ```

2. Upload to S3:
   - Go to S3 → `frontend.portfolio`
   - Delete all existing files
   - Upload all contents from `build/` folder

3. Invalidate CloudFront cache:
   - Go to CloudFront → Distribution → Invalidations
   - Create invalidation: `/*`

### Backend Deployment (Manual)
1. Update Lambda code:
   - Go to Lambda → `portfolio-chatbot-api`
   - Code tab → Edit `index.js`
   - Click Deploy

### Future: GitHub Actions (Automated)
- Workflow file: `.github/workflows/deploy-aws.yml`
- Requires secrets:
  - `AWS_ACCESS_KEY_ID`
  - `AWS_SECRET_ACCESS_KEY`
  - `CLOUDFRONT_DISTRIBUTION_ID`: `EZNF7L67YTAII`

---

## 📁 Key Project Files

### Environment Configuration
- `.env.production` - Production API URL
  ```
  REACT_APP_API_URL=https://api.oussemaamri.com
  ```

### GitHub Actions
- `.github/workflows/deploy-aws.yml` - Auto-deployment workflow

### Lambda Code
- `backend/lambda/index.js` - Backend API code (no dependencies)
- `backend/lambda/package.json` - Lambda package config

### Frontend Build
- `package.json` - Build script with OpenSSL legacy provider fix:
  ```json
  "build": "set NODE_OPTIONS=--openssl-legacy-provider && react-scripts build"
  ```

---

## 🐛 Known Issues & Fixes

### Issue 1: OpenSSL Error During Build
**Error:** `error:0308010C:digital envelope routines::unsupported`
**Fix:** Added `--openssl-legacy-provider` to build script in package.json

### Issue 2: Missing Hero Background Image
**Error:** `Can't resolve '../../images/hero-bg.png'`
**Fix:** Updated `hero.css` to use `Background.jpg` instead

### Issue 3: CloudFront 403 Access Denied
**Cause:** Missing bucket policy or wrong account ID
**Fix:** Added correct bucket policy with CloudFront OAC

### Issue 4: Domain Not Resolving
**Cause:** Nameservers not updated in Namecheap
**Fix:** Changed Namecheap nameservers to Route 53 NS records

---

## 💰 Estimated Monthly Cost

| Service | Free Tier | Estimated Cost |
|---------|-----------|----------------|
| S3 | 5GB storage | ~$0.02 |
| CloudFront | 1TB transfer | ~$0.00-0.50 |
| Lambda | 1M requests | ~$0.00 |
| API Gateway | 1M requests | ~$0.00-1.00 |
| Route 53 | - | $0.50/zone |
| ACM | - | FREE |
| **Total** | - | **~$0.50-2/month** |

---

## ✅ Deployment Checklist

### Initial Setup (Completed)
- [x] Create AWS account
- [x] Set up billing alerts
- [x] Domain registered (Namecheap)
- [x] Nameservers pointing to Route 53

### Frontend (Completed)
- [x] S3 bucket created: `frontend.portfolio`
- [x] CloudFront distribution: `EZNF7L67YTAII`
- [x] SSL certificate (us-east-1)
- [x] Route 53 A records for domain
- [x] Frontend deployed and accessible

### Backend (Completed)
- [x] Lambda function: `portfolio-chatbot-api`
- [x] API Gateway: `portfolio-api`
- [x] SSL certificate (eu-north-1) for API
- [x] Custom domain: `api.oussemaamri.com`
- [x] Route 53 A record for API
- [x] GROQ_API_KEY configured

### URLs
- [x] https://oussemaamri.com ✅
- [x] https://www.oussemaamri.com ✅
- [x] https://api.oussemaamri.com/api/health ✅

---

## 🔧 Maintenance Commands

### Rebuild & Deploy Frontend
```cmd
cd C:\Users\oussema.amri\Desktop\cv\Portfolio
npm run build
# Then upload build/ contents to S3 manually
# Then create CloudFront invalidation: /*
```

### Test API Health
```
https://api.oussemaamri.com/api/health
```

### View Lambda Logs
- CloudWatch → Log groups → `/aws/lambda/portfolio-chatbot-api`

---

## 📞 Support Resources

- **AWS Console:** https://console.aws.amazon.com
- **Google AI Studio (Gemini Key):** https://aistudio.google.com/app/apikey
- **Namecheap:** https://www.namecheap.com
- **CloudFront Dashboard:** https://console.aws.amazon.com/cloudfront
- **Lambda Console:** https://console.aws.amazon.com/lambda

---

## 🔮 Future Improvements

1. **Set up GitHub Actions** for automated deployments
2. **Add SES** for contact form email notifications
3. **Add DynamoDB** to store contact form submissions
4. **Set up CloudWatch alarms** for monitoring
5. **Enable CloudFront logging** for analytics
