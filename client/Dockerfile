# Use an official Node.js LTS (Long Term Support) image for building
FROM node:14.17.5 as builder

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm ci --production

# Copy the rest of the application code
COPY . .

# Build the React app for production
RUN npm run build

# Use a smaller, production-ready base image
FROM node:14.17.5-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the built files from the previous stage
COPY --from=builder /app/dist .

# Expose port 80 for the production server
EXPOSE 80

# Install a simple HTTP server to serve the static files
RUN npm install -g http-server

# Start the production server
CMD ["http-server", "-p", "80"]
