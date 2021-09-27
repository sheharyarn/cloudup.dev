# Use the official Alpine Python base image
FROM python:@{PYTHON_VERSION}-alpine


# Set the app directory
WORKDIR /app


# Install dependencies
COPY @{REQUIREMENTS_FILE} @{REQUIREMENTS_FILE}
RUN pip3 install -r @{REQUIREMENTS_FILE}


# Copy app source
COPY . .


# Start app
CMD ["python3", "./@{ENTRYPOINT}"]
