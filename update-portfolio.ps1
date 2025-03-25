# Build the React app
npm run build

# Remove old build files on EC2
ssh -i "C:\Users\ousse\Downloads\portfolio-website-key.pem" ec2-user@35.159.24.89 "rm -rf ~/Portfolio/build/*"

# Upload new build files
scp -i "C:\Users\ousse\Downloads\portfolio-website-key.pem" -r build/* ec2-user@35.159.24.89:~/Portfolio/build/

# Run update script on server
ssh -i "C:\Users\ousse\Downloads\portfolio-website-key.pem" ec2-user@35.159.24.89 "~/update-website.sh"

Write-Host "Portfolio website updated successfully!" -ForegroundColor Green