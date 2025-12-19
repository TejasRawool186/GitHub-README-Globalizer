# Use Apify's Node.js 20 base image with Playwright for actors
FROM apify/actor-node:20

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --omit=dev --omit=optional

# Copy source files
COPY . ./
