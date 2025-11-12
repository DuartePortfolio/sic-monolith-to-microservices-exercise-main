FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy root package.json and install deps (build context is project root via docker-compose)
COPY package.json ./

RUN npm install --production

# Copy this service sources
COPY movies-service/ ./

EXPOSE 3002

CMD ["node", "app.js"]
