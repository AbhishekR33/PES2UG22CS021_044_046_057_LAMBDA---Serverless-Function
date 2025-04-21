# Base Python function image
FROM python:3.10-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the function code into the container
COPY ../functions/python/hellopy.py /app/function.py

# Default command to execute the function
CMD ["python", "function.py"]