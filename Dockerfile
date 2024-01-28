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

# Change working directory to the client folder
WORKDIR /app/client

# Install dependencies and build the Vite app for production
RUN npm install
RUN npm run build

# Change back to the /app directory
WORKDIR /app

# Run Flask-Migrate commands to upgrade the database
#RUN flask db upgrade

# Make port 5000 available to the world outside this container
EXPOSE 5000

# Run the Python app when the container launches
#CMD ["python", "run.py"]

CMD ["gunicorn", "-b", "0.0.0.0:5000", "run:app"]
