# 🚀 AWS Cost-Efficient Deployment Guide for oussemaamri.com

## 📊 Cost Comparison

| Old Setup | New Setup |
|-----------|-----------|
| EC2 t2.micro: ~€10/month | **S3 + CloudFront + Lambda: ~€0.50-2/month** |
| Always running | Pay-per-request (serverless) |

---

## 🏗️ Architecture Overview

```
                    oussemaamri.com
                          │
                    ┌─────▼─────┐
                    │CloudFront │ (Global CDN + HTTPS + Cache)
                    │ Distribution│
                    └─────┬─────┘
           ┌──────────────┼──────────────┐
           │              │              │
           ▼              │              ▼
    ┌──────────────┐      │      ┌──────────────┐
    │  S3 Bucket   │      │      │ API Gateway  │
    │  (Frontend)  │      │      │   + Lambda   │
    │ Static Files │      │      │  (Backend)   │
    └──────────────┘      │      └──────────────┘
                          │
                    ┌─────▼─────┐
                    │ Route 53  │ (DNS)
                    │   DNS     │
                    └───────────┘
```

---

## 📋 Step-by-Step Deployment

### Phase 1: AWS Account Setup

#### 1.1 Create New AWS Account
1. Go to [aws.amazon.com](https://aws.amazon.com)
2. Click "Create an AWS Account"
3. Use a new email (or your existing one if available)
4. **Enable Free Tier** - Most services have 12 months free

#### 1.2 Set Up Budget Alerts (IMPORTANT!)
```
AWS Console → Billing → Budgets → Create Budget
- Budget Type: Cost Budget
- Amount: €5/month
- Alert: 80% threshold → Email notification
```

---

### Phase 2: Frontend Deployment (S3 + CloudFront)

#### 2.1 Create S3 Bucket

1. **Go to S3 Console** → Create bucket
2. **Bucket name:** `oussemaamri.com` (must be globally unique)
3. **Region:** `eu-west-1` (Ireland) or `eu-central-1` (Frankfurt)
4. **Block Public Access:** Keep ENABLED (CloudFront will access it)
5. **Create bucket**

#### 2.2 Configure S3 for Static Website

```json
// Bucket Policy (add after CloudFront setup)
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "AllowCloudFrontAccess",
            "Effect": "Allow",
            "Principal": {
                "Service": "cloudfront.amazonaws.com"
            },
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::oussemaamri.com/*",
            "Condition": {
                "StringEquals": {
                    "AWS:SourceArn": "arn:aws:cloudfront::YOUR_ACCOUNT_ID:distribution/YOUR_DISTRIBUTION_ID"
                }
            }
        }
    ]
}
```

#### 2.3 Create CloudFront Distribution

1. **Go to CloudFront** → Create Distribution
2. **Origin domain:** Select your S3 bucket
3. **Origin access:** Origin Access Control (OAC) - Recommended
4. **Create new OAC:** `oussemaamri-oac`
5. **Viewer protocol policy:** Redirect HTTP to HTTPS
6. **Default root object:** `index.html`
7. **Alternate domain names (CNAMEs):** 
   - `oussemaamri.com`
   - `www.oussemaamri.com`
8. **Custom SSL certificate:** Request one (see Phase 3)

#### 2.4 Configure Error Pages for SPA

In CloudFront → Error Pages:
| HTTP Error | Response Page | Response Code |
|------------|---------------|---------------|
| 403 | /index.html | 200 |
| 404 | /index.html | 200 |

---

### Phase 3: SSL Certificate (ACM)

#### 3.1 Request Certificate

1. **Go to ACM (Certificate Manager)** → **Region: us-east-1** (Required for CloudFront!)
2. Request public certificate
3. **Domain names:**
   - `oussemaamri.com`
   - `*.oussemaamri.com`
4. **Validation method:** DNS validation
5. **Add CNAME records to your DNS** (Route 53 or domain registrar)

---

### Phase 4: Domain Setup (Route 53)

#### 4.1 Option A: Transfer Domain to Route 53 (Recommended)

1. **Buy domain:** `oussemaamri.com` from your registrar
2. **Create Hosted Zone** in Route 53
3. **Update nameservers** at your registrar to Route 53 NS records

#### 4.2 Create DNS Records

```
Type: A
Name: oussemaamri.com
Alias: Yes
Target: CloudFront distribution

Type: A  
Name: www.oussemaamri.com
Alias: Yes
Target: CloudFront distribution

Type: A
Name: api.oussemaamri.com
Alias: Yes
Target: API Gateway (after Phase 5)
```

---

### Phase 5: Backend API (Lambda + API Gateway)

#### 5.1 Create Lambda Function

1. **Go to Lambda** → Create function
2. **Function name:** `portfolio-chatbot-api`
3. **Runtime:** Node.js 20.x
4. **Architecture:** arm64 (cheaper than x86)

#### 5.2 Lambda Code

Upload the code from `backend/lambda/` folder (we'll create this).

#### 5.3 Environment Variables

Add in Lambda configuration:
```
GEMINI_API_KEY=your_api_key_here
```

#### 5.4 Create API Gateway

1. **Go to API Gateway** → Create API
2. **Type:** HTTP API (cheaper than REST API)
3. **Integrations:** Lambda function `portfolio-chatbot-api`
4. **Routes:**
   - `POST /api/chat`
   - `POST /api/contact`
   - `GET /api/health`
5. **Custom domain:** `api.oussemaamri.com`

---

### Phase 6: GitHub Actions Update

Update `.github/workflows/deploy.yml` for S3 deployment.

---

## 💰 Monthly Cost Breakdown

| Service | Free Tier | After Free Tier |
|---------|-----------|-----------------|
| S3 | 5GB storage | ~€0.02/GB |
| CloudFront | 1TB transfer | ~€0.085/GB |
| Lambda | 1M requests | ~€0.20/1M requests |
| API Gateway | 1M requests | ~€1/1M requests |
| Route 53 | - | €0.50/hosted zone |
| ACM (SSL) | FREE | FREE |

**Estimated Total:** €0.50-2/month for low traffic portfolio

---

## 🔧 Quick Start Commands

### Build Frontend
```bash
npm run build
```

### Upload to S3
```bash
aws s3 sync build/ s3://oussemaamri.com --delete
```

### Invalidate CloudFront Cache
```bash
aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
```

---

## 🔗 Required IAM Permissions for GitHub Actions

Create IAM user `github-actions-deploy` with this policy:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:PutObject",
                "s3:GetObject",
                "s3:DeleteObject",
                "s3:ListBucket"
            ],
            "Resource": [
                "arn:aws:s3:::oussemaamri.com",
                "arn:aws:s3:::oussemaamri.com/*"
            ]
        },
        {
            "Effect": "Allow",
            "Action": [
                "cloudfront:CreateInvalidation"
            ],
            "Resource": "*"
        },
        {
            "Effect": "Allow",
            "Action": [
                "lambda:UpdateFunctionCode"
            ],
            "Resource": "arn:aws:lambda:*:*:function:portfolio-chatbot-api"
        }
    ]
}
```

---

## 🌐 Route 53 DNS Setup (For oussemaamri.com)

### Step 1: Purchase Domain

You mentioned buying `oussemaamri.com` again. You can:
- **Option A:** Buy from Route 53 directly (~$12/year for .com)
- **Option B:** Buy from any registrar (Namecheap, GoDaddy, etc.) and point to Route 53

### Step 2: Create Hosted Zone

1. Go to **Route 53** → **Hosted zones** → **Create hosted zone**
2. **Domain name:** `oussemaamri.com`
3. **Type:** Public hosted zone
4. Note the **4 NS (nameserver) records** created

### Step 3: Update Nameservers (if using external registrar)

At your domain registrar, update nameservers to Route 53's:
```
ns-xxx.awsdns-xx.org
ns-xxx.awsdns-xx.co.uk
ns-xxx.awsdns-xx.com
ns-xxx.awsdns-xx.net
```

### Step 4: Create DNS Records

After CloudFront and API Gateway are set up, add these records:

| Type | Name | Alias | Target |
|------|------|-------|--------|
| A | oussemaamri.com | Yes | CloudFront distribution |
| A | www.oussemaamri.com | Yes | CloudFront distribution |
| A | api.oussemaamri.com | Yes | API Gateway custom domain |
| CNAME | _xxx.oussemaamri.com | No | ACM validation record |

### Step 5: SSL Certificate Validation

For ACM certificate validation, add the CNAME records that AWS provides.

---

## 🔐 GitHub Secrets Configuration

Add these secrets to your GitHub repository:

```
Settings → Secrets and variables → Actions → New repository secret
```

| Secret Name | Description |
|-------------|-------------|
| `AWS_ACCESS_KEY_ID` | IAM user access key |
| `AWS_SECRET_ACCESS_KEY` | IAM user secret key |
| `CLOUDFRONT_DISTRIBUTION_ID` | CloudFront distribution ID (e.g., E1234ABCD) |

---

## ⚡ Alternative: Even Simpler Setup

If you want the **simplest possible setup**, consider:

### Option: S3 + CloudFront (Frontend) + Render (Backend) 

- Frontend: AWS S3 + CloudFront (~€0.50/mo)
- Backend: Render.com Free Tier (FREE, but sleeps after 15min inactivity)

This means you only manage frontend on AWS and get free backend hosting!

---

## 📝 Deployment Checklist

### Pre-Deployment
- [ ] Create new AWS account
- [ ] Set up billing alerts (€5 budget)
- [ ] Purchase/transfer domain `oussemaamri.com`
- [ ] Get Gemini API key from Google AI Studio

### AWS Setup
- [ ] Create S3 bucket: `oussemaamri.com`
- [ ] Request ACM certificate (in us-east-1!)
- [ ] Create CloudFront distribution
- [ ] Update S3 bucket policy with OAC
- [ ] Configure CloudFront error pages (403→200, 404→200)
- [ ] Create Lambda function: `portfolio-chatbot-api`
- [ ] Add GEMINI_API_KEY to Lambda environment
- [ ] Create API Gateway HTTP API
- [ ] Configure API Gateway custom domain
- [ ] Create Route 53 hosted zone
- [ ] Add DNS records

### GitHub Setup
- [ ] Create IAM user for GitHub Actions
- [ ] Add AWS_ACCESS_KEY_ID secret
- [ ] Add AWS_SECRET_ACCESS_KEY secret
- [ ] Add CLOUDFRONT_DISTRIBUTION_ID secret
- [ ] Rename/disable old deploy.yml workflow
- [ ] Push code to trigger new workflow

### Verification
- [ ] Test https://oussemaamri.com loads
- [ ] Test https://api.oussemaamri.com/api/health
- [ ] Test chatbot functionality
- [ ] Test contact form
- [ ] Check CloudWatch logs for any errors

---

## 🆘 Troubleshooting

### CloudFront 403 Error
- Check S3 bucket policy includes CloudFront OAC
- Verify OAC is attached to CloudFront origin

### SSL Certificate Pending
- Make sure you're creating certificate in **us-east-1**
- Add DNS validation records to Route 53

### Lambda Timeout
- Increase timeout to 30 seconds in Lambda configuration
- Check Gemini API key is valid

### CORS Errors
- Verify Lambda returns correct CORS headers
- Check API Gateway CORS configuration

### GitHub Actions Failing
- Verify AWS credentials are correct
- Check IAM user has required permissions
- Ensure bucket name matches in workflow
