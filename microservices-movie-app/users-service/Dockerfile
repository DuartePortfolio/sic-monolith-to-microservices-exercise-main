FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy root package.json and install deps (build context is project root via docker-compose)
COPY package.json ./

RUN npm install --production
ENV NODE_ENV=production

# Copy this service sources
COPY users-service/ ./

EXPOSE 3001

CMD ["node", "app.js"]
