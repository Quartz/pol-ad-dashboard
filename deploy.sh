npm run build
aws s3 --region us-east-2 rm s3://pol-ad-dashboard
aws s3 --region us-east-2 sync build/ s3://pol-ad-dashboard
