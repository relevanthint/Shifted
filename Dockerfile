# Base image
FROM python:3.9-slim

# Set the working directory
WORKDIR /app

# Copy the requirements file
COPY requirements.txt .

# Install the requirements
RUN pip install --no-cache-dir -r requirements.txt

# Copy the project files to the container
COPY . .

# Install the uvicorn server
RUN pip install uvicorn

# Set the default command to start the API
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]
