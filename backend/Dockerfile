# Use an official Python runtime as a parent image
FROM python:3.11-slim

# Set the working directory in the container
WORKDIR /app

# Install system dependencies, including ffmpeg for pydub
RUN apt-get update && apt-get install -y \
    ffmpeg \
    && rm -rf /var/lib/apt/lists/*

# Copy the requirements file into the container
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# NOW that nltk is installed, download the necessary data
RUN python -c "import nltk; nltk.download('vader_lexicon'); nltk.download('punkt')"

# Copy the rest of the application code into the container
COPY . .

# Create necessary directories for logs and data
RUN mkdir -p logs data

# Expose the port the app runs on
EXPOSE 8000

# The command to run the application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]

#docker-compose up --build