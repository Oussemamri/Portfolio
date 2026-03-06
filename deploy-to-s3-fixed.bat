@echo off
echo ================================
echo  S3 Deployment Script (Fixed)
echo ================================
echo.
echo This will:
echo 1. Delete all files from S3 bucket
echo 2. Upload fresh build files
echo 3. Invalidate CloudFront cache (if you have it)
echo.
set /p bucket="Enter your S3 bucket name (e.g., oussemaamri.com): "
if "%bucket%"=="" (
    echo Error: Bucket name is required
    pause
    exit /b 1
)

echo.
echo Step 1: Cleaning S3 bucket...
aws s3 rm s3://%bucket% --recursive
if errorlevel 1 (
    echo Error: Failed to clean S3 bucket. Check AWS credentials.
    pause
    exit /b 1
)

echo.
echo Step 2: Uploading build files...
cd build
aws s3 sync . s3://%bucket% --delete --exclude "*.map"
if errorlevel 1 (
    echo Error: Failed to upload to S3
    pause
    exit /b 1
)
cd ..

echo.
echo Step 3: Setting content types for better performance...
aws s3 cp s3://%bucket%/index.html s3://%bucket%/index.html --metadata-directive REPLACE --content-type "text/html; charset=utf-8"
aws s3 cp s3://%bucket%/static/ s3://%bucket%/static/ --recursive --metadata-directive REPLACE --content-type "text/css" --exclude "*" --include "*.css"
aws s3 cp s3://%bucket%/static/ s3://%bucket%/static/ --recursive --metadata-directive REPLACE --content-type "application/javascript" --exclude "*" --include "*.js"

echo.
echo ✅ Upload completed successfully!
echo.
set /p cloudfront="Do you have CloudFront? Enter distribution ID (or press Enter to skip): "
if not "%cloudfront%"=="" (
    echo Invalidating CloudFront cache...
    aws cloudfront create-invalidation --distribution-id %cloudfront% --paths "/*"
    echo ✅ CloudFront cache invalidated!
)

echo.
echo 🚀 Your website should now work at: https://%bucket%
echo.
pause