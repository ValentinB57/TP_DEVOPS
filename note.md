docker build -t node-app:latest .
docker run -d -p 3000:3000 node-app:latest