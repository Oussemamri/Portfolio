@echo off
echo Building React app...
call npm run build

echo.
echo Deploying to S3...
aws s3 sync build/ s3://frontend.portfolio --delete

echo.
echo Invalidating CloudFront cache...
set /p DIST_ID="Enter CloudFront Distribution ID: "
aws cloudfront create-invalidation --distribution-id %DIST_ID% --paths "/*"

echo.
echo Deployment complete!
pause
