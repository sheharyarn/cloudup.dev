FROM python:3.7

#Create Application Source Code Directory
RUN mkdir -p /usr/src/app

# Setting Home Directory for containers
WORKDIR /usr/src/app

# Installing python dependencies
COPY requirements.txt /usr/src/app/
RUN pip install -r requirements.txt

# Copying src code to Container
COPY . /usr/src/app

# Application Environment variables
#ENV APP_ENV development
ENV PORT 8080

# Exposing Ports
EXPOSE $PORT

# Setting Persistent data
VOLUME ["/app-data"]

# Running Python Application for flask and django
CMD gunicorn -b :$PORT -c gunicorn.conf.py main:app