# Use an official Python runtime as a parent image
FROM python:3.8-slim

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Install Node.js and npm
RUN apt-get update && \
    apt-get install -y nodejs npm && \
    rm -rf /var/lib/apt/lists/*

Run npm install -g ts-node

# Change working directory to the client folder
WORKDIR /app/client

# Install dependencies and build the Vite app for production
RUN npm install
RUN npm run build

WORKDIR /app

EXPOSE 5000


CMD ["gunicorn", "-b", "0.0.0.0:5000", "run:app"]
